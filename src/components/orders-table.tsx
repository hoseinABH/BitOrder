// Common components
import { ArrowLeft } from 'lucide-react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { buttonVariants } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
// Utilities
import { cn, formatNumber } from '@/lib/utils';
// Constants
import * as Routes from '@/constants/routes';
// Types
import type { Order, OrderType } from '@/types/market';
interface OrdersTableProps {
  orderType: OrderType;
  orders: Order[];
}

export function OrdersTable({ orderType, orders }: OrdersTableProps) {
  return (
    <Fragment>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="size-2 animate-pulse rounded-full bg-green-600"></span>
          <p className="text-lg font-medium">سفارشات {orderType === 'buy' ? 'خرید' : 'فروش'}</p>
        </div>
        <Link to={Routes.CoinList} className={buttonVariants({ variant: 'link' })}>
          لیست رمزارزها <ArrowLeft />
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>قیمت</TableHead>
            <TableHead className="text-left">مقدار</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={`${order.value}_${order.amount}`}>
              <TableCell
                className={cn({
                  ['text-red-500 dark:text-red-300']: orderType === 'sell',
                  ['text-green-600 dark:text-green-300']: orderType === 'buy',
                })}
              >
                {formatNumber(order.price)}
              </TableCell>
              <TableCell className="text-left">{order.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}
