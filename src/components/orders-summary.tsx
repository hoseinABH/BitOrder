// Utilities
import { cn, formatPrice, safeParse } from '@/lib/utils';
// Hooks
import { useMemo } from 'react';
// Types
import type { Order } from '@/types/market';

interface OrdersSummaryProps {
  className?: string;
  orders: Order[];
}
export function OrdersSummary({ className, orders }: OrdersSummaryProps) {
  const summaryData = useMemo(() => {
    const totalRemain = orders.reduce((sum, order) => sum + safeParse(order.remain), 0);
    const totalValue = orders.reduce((sum, order) => sum + safeParse(order.value), 0);
    const weightedAvgPrice = totalRemain > 0 ? totalValue / totalRemain : 0;
    return [
      {
        key: 'totalRemain',
        value: totalRemain,
        label: 'مجموع سفارشات باقی مانده',
      },
      {
        key: 'totalValue',
        value: totalValue,
        label: 'ارزش کل',
      },
      {
        key: 'totalRemain',
        value: formatPrice(weightedAvgPrice),
        label: 'میانگین وزنی قیمت',
      },
    ];
  }, [orders]);
  return (
    <div className={cn('grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3', className)}>
      {summaryData.map((summary) => (
        <div
          key={summary.key}
          className="bg-card flex flex-col items-center justify-center gap-4 rounded-md border border-dashed p-6"
        >
          <p className="text-foreground text-sm font-normal">{summary.label}</p>
          <span className="text-muted-foreground text-lg font-bold md:text-xl">
            {summary.value}
          </span>
        </div>
      ))}
    </div>
  );
}
