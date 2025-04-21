// Common components
import { CoinCard, CoinCardSkeleton } from './coin-card';
// Utilities
import { cn } from '@/lib/utils';
// Hooks
import { useMarketStore } from '@/store/market';
// Types
import type { MarketCoin } from '@/types/market';

interface CoinListProps {
  coins: MarketCoin[];
  currency: 'irt' | 'usdt';
  className?: string;
}

export function CoinList({ coins, currency, className }: CoinListProps) {
  const { loading } = useMarketStore();
  return (
    <div className={cn('', className)}>
      <div className="bg-background sticky top-0 z-20 grid grid-cols-3 rounded-t-md p-4 text-sm font-medium md:grid-cols-4 md:text-lg">
        <p>نام رمزارز</p>
        <p className="text-left md:text-right">آخرین قیمت</p>
        <p className="text-left md:text-right">تغییر ۲۴ ساعت</p>
      </div>
      {loading.getAllCoins
        ? Array.from(Array(10)).map((_, index) => <CoinCardSkeleton key={index} />)
        : coins.map((coin) => <CoinCard key={coin.id} coin={coin} currency={currency} />)}
    </div>
  );
}
