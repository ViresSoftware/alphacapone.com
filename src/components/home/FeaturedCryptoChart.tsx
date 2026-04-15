'use client';

import { useMemo, useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export type Ticker = 'BTC' | 'XRP' | 'SOL';

export interface HistoPoint {
  time: number;
  high: number;
  low: number;
  open: number;
  close: number;
}

export interface TickerPrice {
  price: number;
  changePercent: number;
  displayPrice: string;
  displayChangePercent: string;
}

export interface FeaturedCryptoData {
  history: Record<Ticker, HistoPoint[]>;
  prices: Record<Ticker, TickerPrice | null>;
}

const tickerNames: Record<Ticker, string> = {
  BTC: 'Bitcoin',
  XRP: 'XRP',
  SOL: 'Solana',
};

const tickerColors: Record<Ticker, string> = {
  BTC: '#f7931a',
  XRP: '#397df3',
  SOL: '#a72add',
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

interface TooltipPayload {
  payload: { date: string; close: number; high: number; low: number };
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
      <p className="text-sm font-semibold mb-2">{data.date}</p>
      <div className="space-y-1 text-xs">
        <p className="text-gray-600 dark:text-gray-400"><span className="font-medium">Close:</span> {formatPrice(data.close)}</p>
        <p className="text-gray-600 dark:text-gray-400"><span className="font-medium">High:</span> {formatPrice(data.high)}</p>
        <p className="text-gray-600 dark:text-gray-400"><span className="font-medium">Low:</span> {formatPrice(data.low)}</p>
      </div>
    </div>
  );
}

interface Props {
  data: FeaturedCryptoData;
  showFeatures?: boolean;
}

export default function FeaturedCryptoChart({ data, showFeatures = true }: Props) {
  const [selectedTicker, setSelectedTicker] = useState<Ticker>('BTC');

  const processedChartData = useMemo(() => {
    const raw = data.history[selectedTicker] ?? [];
    return raw.map((item) => {
      const date = new Date(item.time * 1000);
      const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return {
        date: label,
        dateShort: label,
        price: item.close,
        high: item.high,
        low: item.low,
        open: item.open,
        close: item.close,
      };
    });
  }, [data.history, selectedTicker]);

  const currentPrice = processedChartData.length > 0 ? processedChartData[processedChartData.length - 1].price : 0;
  const currentTickerColor = tickerColors[selectedTicker];

  if (processedChartData.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="text-gray-500">No data available</div>
      </div>
    );
  }

  return (
    <section className="bg-black py-8 lg:py-16">
      <div className="max-w-7xl px-6 mx-auto">
        <div className="w-full space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {tickerNames[selectedTicker]} ({selectedTicker})
              </h2>
              <p className="text-sm">30 Day Price History</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-3xl font-bold text-white">{formatPrice(currentPrice)}</div>
            </div>
          </div>
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={processedChartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <defs>
                  <linearGradient id={`colorPrice-${selectedTicker}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={currentTickerColor} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={currentTickerColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                <XAxis dataKey="dateShort" tick={{ fill: '#6b7280', fontSize: 12 }} tickLine={{ stroke: '#6b7280' }} axisLine={{ stroke: '#6b7280' }} />
                <YAxis
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickLine={{ stroke: '#6b7280' }}
                  axisLine={{ stroke: '#6b7280' }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={currentTickerColor}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#colorPrice-${selectedTicker})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {showFeatures && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
            {(['BTC', 'XRP', 'SOL'] as Ticker[]).map((ticker) => {
              const tickerData = data.prices[ticker];
              const isSelected = selectedTicker === ticker;
              return (
                <Button
                  key={ticker}
                  onClick={() => setSelectedTicker(ticker)}
                  className={`flex items-center bg-black-50 hover:bg-gray-800 text-white border p-8 gap-2 h-12 ${isSelected ? 'border-white' : 'border-gray-900'}`}
                  size="lg"
                >
                  <Image
                    src={`/crypto/${ticker.toLowerCase()}.svg`}
                    alt={ticker}
                    width={24}
                    height={24}
                    className="w-10 h-10"
                  />
                  {tickerData ? (
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-start">
                        <span>{ticker}</span>
                        <span>{tickerData.displayPrice}</span>
                      </div>
                      <span
                        className={`flex items-center gap-1 ${
                          tickerData.changePercent >= 0 ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {tickerData.changePercent >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span>
                          {tickerData.changePercent >= 0 ? '+' : ''}
                          {tickerData.displayChangePercent}%
                        </span>
                      </span>
                    </div>
                  ) : (
                    <span>{ticker}</span>
                  )}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
