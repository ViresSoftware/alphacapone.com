import FeaturedCryptoChart, {
  type FeaturedCryptoData,
  type HistoPoint,
  type Ticker,
  type TickerPrice,
} from './FeaturedCryptoChart';

const TICKERS: Ticker[] = ['BTC', 'XRP', 'SOL'];

interface HistoResponse {
  Data?: { Data?: HistoPoint[] } | HistoPoint[];
}

interface PriceMultiResponse {
  RAW?: Record<string, { USD?: { PRICE?: number; CHANGEPCT24HOUR?: number } }>;
  DISPLAY?: Record<string, { USD?: { PRICE?: string; CHANGEPCT24HOUR?: string } }>;
}

async function fetchHistory(ticker: Ticker): Promise<HistoPoint[]> {
  try {
    const res = await fetch(
      `https://min-api.cryptocompare.com/data/histoday?fsym=${ticker}&tsym=USD&limit=30&aggregate=1`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) return [];
    const json = (await res.json()) as HistoResponse;
    const data = Array.isArray(json.Data) ? json.Data : json.Data?.Data;
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function fetchPrices(): Promise<Record<Ticker, TickerPrice | null>> {
  const empty: Record<Ticker, TickerPrice | null> = { BTC: null, XRP: null, SOL: null };
  try {
    const res = await fetch(
      'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,XRP,SOL&tsyms=USD',
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return empty;
    const json = (await res.json()) as PriceMultiResponse;
    const out = { ...empty };
    for (const ticker of TICKERS) {
      const raw = json.RAW?.[ticker]?.USD;
      const display = json.DISPLAY?.[ticker]?.USD;
      if (!raw || !display) continue;
      out[ticker] = {
        price: raw.PRICE ?? 0,
        changePercent: raw.CHANGEPCT24HOUR ?? 0,
        displayPrice: display.PRICE ?? '$0.00',
        displayChangePercent: display.CHANGEPCT24HOUR ?? '0.00',
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
