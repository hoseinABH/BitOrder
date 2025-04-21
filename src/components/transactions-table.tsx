// Common components
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { buttonVariants } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
// Utilities
import { cn, formatNumber, formatTime } from '@/lib/utils';
// Constants
import * as Routes from '@/constants/routes';
// Types
import type { Transaction } from '@/types/market';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <Fragment>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="size-2 animate-pulse rounded-full bg-green-600"></span>
          <p className="text-lg font-medium">معاملات</p>
        </div>
        <Link to={Routes.CoinList} className={buttonVariants({ variant: 'link' })}>
          لیست رمزارزها <ArrowLeft />
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">قیمت</TableHead>
            <TableHead className="w-1/3 text-center">مقدار</TableHead>
            <TableHead className="w-1/3 text-left">زمان</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.match_id}>
              <TableCell
                className={cn('w-1/3', {
                  ['text-red-500 dark:text-red-300']: transaction.type === 'sell',
                  ['text-green-600 dark:text-green-300']: transaction.type === 'buy',
                })}
              >
                {formatNumber(transaction.price)}
              </TableCell>
              <TableCell className="w-1/3 text-center">{transaction.match_amount}</TableCell>
              <TableCell className="w-1/3 text-left">
                {formatTime(new Date(transaction.time * 1000).toISOString())}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}
