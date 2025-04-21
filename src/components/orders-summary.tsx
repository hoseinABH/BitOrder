// Common components
import { Input } from './ui/input';
// Utilities
import { cn, formatPrice, safeParse } from '@/lib/utils';
// Hooks
import { Fragment, useMemo, useState } from 'react';
// Types
import type { Order } from '@/types/market';

interface OrdersSummaryProps {
  className?: string;
  orders: Order[];
}
export function OrdersSummary({ className, orders }: OrdersSummaryProps) {
  const [percentage, setPercentage] = useState<number | undefined>(undefined);

  const { summaryArray, totalRemain, weightedAvgPrice } = useMemo(() => {
    const totalRemain = orders.reduce((sum, order) => sum + safeParse(order.remain), 0);
    const totalValue = orders.reduce((sum, order) => sum + safeParse(order.value), 0);
    const weightedAvgPrice = totalRemain > 0 ? totalValue / totalRemain : 0;
    const summaryArray = [
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
        key: 'weightedAvgPrice',
        value: formatPrice(weightedAvgPrice),
        label: 'میانگین وزنی قیمت',
      },
    ];
    return {
      summaryArray,
      totalRemain,
      totalValue,
      weightedAvgPrice,
    };
  }, [orders]);
  const percentageCalculation = useMemo(() => {
    const percentFactor = percentage ? percentage / 100 : 0;
    const calculatedRemain = totalRemain * percentFactor;
    const calculatedPayable = weightedAvgPrice * calculatedRemain;
    return {
      totalRemain: calculatedRemain,
      averagePrice: weightedAvgPrice,
      totalPayable: calculatedPayable,
    };
  }, [percentage, totalRemain, weightedAvgPrice]);
  return (
    <Fragment>
      <div className={cn('grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3', className)}>
        {summaryArray.map((summary) => (
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
      <div className="bg-card mt-6 flex flex-col items-center justify-center gap-12 rounded-md border border-dashed p-6">
        <Input
          type="number"
          defaultValue={undefined}
          min={0}
          max={100}
          value={percentage}
          placeholder="درصد سفارشات باقی مانده (۵۰٪)"
          dir="ltr"
          pattern="[0-9]*"
          aria-label="درصد سفارش"
          inputMode="numeric"
          maxLength={3}
          onChange={(e) => setPercentage(Number(e.target.value))}
          className="w-full max-w-[300px] placeholder:text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <div className="grid w-full grid-cols-1 place-items-start gap-4 md:grid-cols-2 lg:grid-cols-3 lg:place-items-center">
          <div>
            <p className="text-sm font-medium">مجموع قابل دریافت</p>
            <span className="text-lg font-semibold">{percentageCalculation.totalRemain}</span>
          </div>
          <div>
            <p className="text-sm font-medium">میانگین قیمت</p>
            <span className="text-lg font-semibold">
              {formatPrice(percentageCalculation.averagePrice)}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium">مجموع قابل پرداخت</p>
            <span className="text-lg font-semibold">
              {formatPrice(percentageCalculation.totalPayable)}
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
