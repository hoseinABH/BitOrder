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
    const { currency1, currency2, id, price, title, title_fa, order_book_info, code } = coin;
    const key = currency1.code;

    if (!map.has(key)) {
      map.set(key, {
        image: currency1.image ?? '',
        code,
        irt: {
          id: 0,
          name: '',
          name_fa: '',
          price: 0,
          changePercentage: 0,
        },
        usdt: {
          id: 0,
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
        id,
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

export function formatPrice(input: string | number): string {
  const price = safeParse(input);
  if (price === 0) return '0';

  if (price < 1) {
    return parseFloat(price.toFixed(8)).toString();
  }

  if (price >= 1_000_000) {
    if (price % 1 === 0) {
      return price.toLocaleString('en-US', {
        maximumFractionDigits: 0,
      });
    }
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
