// Utilities
import { cn } from '@/lib/utils';
// Hooks
import { useMemo } from 'react';
// Types
import type { BasePrice } from '@/types/market';

interface CoinCardProps {
  coin: any;
  basePrice: BasePrice;
}

export function CoinCard({ coin, basePrice }: CoinCardProps) {
  const isUSDT = basePrice === 'USDT';
  const price = isUSDT ? coin.priceUSDT : coin.priceIRT;
  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: isUSDT ? 2 : 0,
      maximumFractionDigits: isUSDT ? 2 : 0,
    }).format(price);
  }, [price, basePrice]);
  const changeColor = coin.changePercentage >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div className="dark:hover:bg-card hover:bg-muted border-accent overflow-hidden border-b p-4 text-xs transition-colors md:text-sm">
      <div className="grid grid-cols-3 items-center">
        <div className="flex items-center gap-2">
          <div className="from-primary/20 to-primary/40 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold">
            {coin.symbol}
          </div>
          <div>
            <h3 className="font-medium">{coin.name}</h3>
            <p className="text-muted-foreground text-xs">{coin.symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-sans font-semibold">{formattedPrice}</p>
          <p className="text-muted-foreground text-xs">{basePrice.toUpperCase()}</p>
        </div>
        <div dir="ltr" className={cn('text-right', changeColor)}>
          <span>{coin.changePercentage >= 0 ? '+' : ''}</span>
          <span className="font-sans">{coin.changePercentage.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
