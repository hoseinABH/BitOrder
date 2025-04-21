import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
// Types
import type { CoinItem, MarketCoin } from '@/types/market';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function safeParse(value: string | number | null | undefined): number {
  const num = typeof value === 'string' ? parseFloat(value) : Number(value);
  return isNaN(num) ? 0 : num;
}

export function normalizeMarketCoins(coinList: CoinItem[]): MarketCoin[] {
  const map = new Map<string, MarketCoin>();

  for (const coin of coinList) {
    const { currency1, currency2, id, price, title, title_fa, order_book_info } = coin;
    const key = currency1.code;

    if (!map.has(key)) {
      map.set(key, {
        id,
        image: currency1.image ?? '',
        irt: {
          name: '',
          name_fa: '',
          price: 0,
          changePercentage: 0,
        },
        usdt: {
          name: '',
          name_fa: '',
          price: 0,
          changePercentage: 0,
        },
      });
    }

    const current = map.get(key)!;
    const target = currency2.code.toLowerCase() as 'irt' | 'usdt';

    if (target === 'irt' || target === 'usdt') {
      current[target] = {
        name: title,
        name_fa: title_fa,
        price: safeParse(price),
        changePercentage: order_book_info?.change ?? 0,
      };
    }
  }
  return Array.from(map.values());
}

export function normalizeMarketData<T>(data: T[]): T[] {
  return data.slice(0, 10);
}

export function formatNumber(input: string | number, isUsdt = false): string {
  const number = safeParse(input);
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    useGrouping: true,
    minimumFractionDigits: isUsdt ? 2 : 0,
    maximumFractionDigits: isUsdt ? 2 : 0,
  }).format(number);
}

export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
