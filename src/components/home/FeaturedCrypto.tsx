import FeaturedCryptoChart, {
  type FeaturedCryptoData,
  type HistoPoint,
  type Ticker,
  type TickerPrice,
} from './FeaturedCryptoChart';

const TICKERS: Ticker[] = ['BTC', 'XRP', 'SOL'];
const COINDESK_BASE_URL = 'https://data-api.coindesk.com';

interface CoinDeskHistoPoint {
  TIMESTAMP: number;
  OPEN: number;
  HIGH: number;
  LOW: number;
  CLOSE: number;
  VOLUME: number;
  QUOTE_VOLUME: number;
  UNIT: 'DAY';
}

interface HistoResponse {
  Data: CoinDeskHistoPoint[];
  Err: Record<string, unknown>;
}

interface TickerSnapshot {
  INSTRUMENT: string;
  VALUE: number;
  MOVING_24_HOUR_CHANGE: number;
  MOVING_24_HOUR_CHANGE_PERCENTAGE: number;
  MOVING_24_HOUR_HIGH: number;
  MOVING_24_HOUR_LOW: number;
  MOVING_24_HOUR_OPEN: number;
  MOVING_24_HOUR_VOLUME: number;
  VALUE_LAST_UPDATE_TS: number;
}

interface PriceMultiResponse {
  Data: Record<string, TickerSnapshot>;
  Err: Record<string, unknown>;
}

const usdFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const pctFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function authHeaders(): HeadersInit {
  const key = process.env.COINDESK_API_KEY;
  return key ? { Authorization: `Apikey ${key}` } : {};
}

function hasError(err: Record<string, unknown> | undefined): boolean {
  return !!err && Object.keys(err).length > 0;
}

async function fetchHistory(ticker: Ticker): Promise<HistoPoint[]> {
  try {
    const url = `${COINDESK_BASE_URL}/index/cc/v1/historical/days?market=cadli&instrument=${ticker}-USD&limit=30&aggregate=1&groups=OHLC,VOLUME`;
    const res = await fetch(url, {
      headers: authHeaders(),
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as HistoResponse;
    if (hasError(json.Err) || !Array.isArray(json.Data)) return [];
    return json.Data.map((point) => ({
      time: point.TIMESTAMP,
      open: point.OPEN,
      high: point.HIGH,
      low: point.LOW,
      close: point.CLOSE,
    }));
  } catch {
    return [];
  }
}

async function fetchPrices(): Promise<Record<Ticker, TickerPrice | null>> {
  const empty: Record<Ticker, TickerPrice | null> = { BTC: null, XRP: null, SOL: null };
  try {
    const instruments = TICKERS.map((t) => `${t}-USD`).join(',');
    const url = `${COINDESK_BASE_URL}/index/cc/v1/latest/tick?market=cadli&instruments=${instruments}&groups=VALUE,MOVING_24_HOUR`;
    const res = await fetch(url, {
      headers: authHeaders(),
      next: { revalidate: 60 },
    });
    if (!res.ok) return empty;
    const json = (await res.json()) as PriceMultiResponse;
    if (hasError(json.Err) || !json.Data) return empty;
    const out = { ...empty };
    for (const ticker of TICKERS) {
      const snap = json.Data[`${ticker}-USD`];
      if (!snap) continue;
      const changePercent = snap.MOVING_24_HOUR_CHANGE_PERCENTAGE;
      out[ticker] = {
        price: snap.VALUE,
        changePercent,
        displayPrice: usdFormatter.format(snap.VALUE),
        displayChangePercent: pctFormatter.format(changePercent / 100),
      };
    }
    return out;
  } catch {
    return empty;
  }
}

interface Props {
  showFeatures?: boolean;
}

export default async function HomeFeaturedCrypto({ showFeatures = true }: Props) {
  const [btc, xrp, sol, prices] = await Promise.all([
    fetchHistory('BTC'),
    fetchHistory('XRP'),
    fetchHistory('SOL'),
    fetchPrices(),
  ]);

  const data: FeaturedCryptoData = {
    history: { BTC: btc, XRP: xrp, SOL: sol },
    prices,
  };

  return <FeaturedCryptoChart data={data} showFeatures={showFeatures} />;
}
