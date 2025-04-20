import { Link } from 'react-router-dom';
// Common components
import { ChevronLeft } from 'lucide-react';
import { LazyImage } from './lazy-image';
import { Skeleton } from './ui/skeleton';
// Utilities
import { cn, formatNumber } from '@/lib/utils';
// Hooks
import { useMemo } from 'react';
// Constants
import * as Routes from '@/constants/routes';
// Types
import type { MarketCoin } from '@/types/market';

interface CoinCardProps {
  coin: MarketCoin;
  currency: 'irt' | 'usdt';
}

export function CoinCard({ coin, currency }: CoinCardProps) {
  const isUSDT = currency === 'usdt';

  const targetCoin = useMemo(() => {
    return coin[currency];
  }, [currency, coin]);

  const formattedPrice = useMemo(() => {
    return formatNumber(targetCoin.price, isUSDT);
  }, [isUSDT, targetCoin.price]);

  const positiveChange = targetCoin.changePercentage >= 0;

  const changeColor = positiveChange ? 'text-green-500' : 'text-red-500';

  return (
    <Link className="group" to={`${Routes.CoinList}/${coin.id}`}>
      <div className="dark:hover:bg-card hover:bg-muted border-accent grid grid-cols-3 items-center gap-1 overflow-hidden border-b px-4 py-6 text-xs transition-colors md:grid-cols-4 md:text-sm">
        <div className="flex w-full items-center gap-2">
          <div className="relative aspect-square size-8 md:size-14">
            <LazyImage
              src={coin.image}
              alt={targetCoin.name}
              className="absolute size-full rounded-full"
            />
          </div>
          <div>
            <p className="text-xs font-medium md:text-sm lg:text-lg">{targetCoin.name}</p>
            <p className="text-muted-foreground text-xs lg:text-sm">{targetCoin.name_fa}</p>
          </div>
        </div>
        <div className="w-full text-left md:text-right">
          <p className="font-sans text-xs font-semibold lg:text-sm">{formattedPrice}</p>
          <p className="text-muted-foreground text-xs lg:text-sm">{currency.toUpperCase()}</p>
        </div>
        <div dir="ltr" className={cn('w-full text-left md:text-right', changeColor)}>
          <span>{positiveChange ? '+' : ''}</span>
          <span className="font-sans text-xs lg:text-sm">
            {targetCoin.changePercentage.toFixed(2)}
          </span>
        </div>
        <div className="text-muted-foreground hidden items-center justify-end gap-2 font-semibold md:flex">
          اطلاعات بیشتر
          <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

export function CoinCardSkeleton() {
  return (
    <div className="dark:hover:bg-card hover:bg-muted border-accent grid grid-cols-3 items-center gap-1 overflow-hidden border-b px-4 py-6 text-xs transition-colors md:grid-cols-4 md:text-sm">
      <div className="flex w-full items-center gap-2">
        <div className="relative aspect-square size-8 md:size-14">
          <Skeleton className="absolute size-full rounded-full" />
        </div>
        <div className="w-full space-y-2">
          <Skeleton className="h-4 w-16 md:h-6 md:w-28" />
          <Skeleton className="h-4 w-14" />
        </div>
      </div>
      <div className="flex flex-col items-end gap-y-2 md:items-start">
        <Skeleton className="h-4 w-16 md:h-6 md:w-28" />
        <Skeleton className="h-2 w-6 md:h-4 md:w-8" />
      </div>
      <div className="flex justify-end md:justify-start">
        <Skeleton className="h-4 w-14 md:h-6 md:w-28" />
      </div>
    </div>
  );
}
