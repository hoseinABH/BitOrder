import { CoinItem, MarketCoin } from '@/types/market';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
    const key = coin.currency1.code;
    if (!map.has(key)) {
      map.set(key, {
        id: coin.id,
        image: coin.currency1.image ?? '',
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

    if (coin.currency2.code === 'IRT') {
      current.irt = {
        price: safeParse(coin.price),
        name: coin.title,
        name_fa: coin.title_fa,
        changePercentage: coin.order_book_info.change,
      };
    }

    if (coin.currency2.code === 'USDT') {
      current.usdt = {
        price: safeParse(coin.price),
        name: coin.title,
        name_fa: coin.title_fa,
        changePercentage: coin.order_book_info.change,
      };
    }
  }

  return Array.from(map.values());
}
