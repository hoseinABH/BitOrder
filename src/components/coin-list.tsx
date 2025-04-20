// Common components
import { Fragment } from 'react/jsx-runtime';
import { CoinCard, CoinCardSkeleton } from './coin-card';
// Types
import type { BasePrice, MarketCoin } from '@/types/market';
import useMarketStore from '@/store/market';

interface CoinListProps {
  coins: MarketCoin[];
  basePrice: BasePrice;
}

export function CoinList({ coins, basePrice }: CoinListProps) {
  const { loading } = useMarketStore();
  return (
    <Fragment>
      <div className="bg-background sticky top-0 z-20 grid grid-cols-3 rounded-t-md p-4 text-sm font-medium md:grid-cols-4 md:text-lg">
        <p>نام رمزارز</p>
        <p className="text-left md:text-right">آخرین قیمت</p>
        <p className="text-left md:text-right">تغییر ۲۴ ساعت</p>
      </div>
      {loading.getAllCoins
        ? Array.from(Array(10)).map((_, index) => <CoinCardSkeleton key={index} />)
        : coins.map((coin) => <CoinCard key={coin.id} coin={coin} basePrice={basePrice} />)}
    </Fragment>
  );
}
