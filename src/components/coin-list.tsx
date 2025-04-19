// Common components
import { Fragment } from 'react/jsx-runtime';
import { CoinCard } from './coin-card';
// Types
import type { BasePrice } from '@/types/market';

interface CoinListProps {
  coins: any[];
  basePrice: BasePrice;
}

export function CoinList({ coins, basePrice }: CoinListProps) {
  return (
    <Fragment>
      <div className="bg-background sticky top-0 grid grid-cols-3 rounded-t-md p-4 text-sm font-medium md:text-lg">
        <p>نام رمزارز</p>
        <p>آخرین قیمت</p>
        <p>تغییر ۲۴ ساعت</p>
      </div>
      {coins.map((coin) => (
        <CoinCard key={coin.id} coin={coin} basePrice={basePrice} />
      ))}
    </Fragment>
  );
}
