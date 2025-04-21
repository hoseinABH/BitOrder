// Common components
import { OrdersTable } from '@/components/orders-table';
import { SwipeTabs } from '@/components/swipe-tabs';
import { TransactionsTable } from '@/components/transactions-table';
// Hooks
import { useMarket } from '@/hooks/market';
import { useMarketStore } from '@/store/market';
import { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// Types
import type { OrderType } from '@/types/market';

type ActiveTab = OrderType | 'transactions';

export default function MarketDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getMarketDetails } = useMarket();
  const { marketData } = useMarketStore();
  const activeTab = (searchParams.get('activeTab') || 'buy') as ActiveTab;

  const handleChangeTab = useCallback(
    (activeTab: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (activeTab) {
        params.set('activeTab', activeTab);
      }
      navigate(`?${params.toString()}`);
    },
    [navigate, searchParams],
  );

  useEffect(() => {
    getMarketDetails();
    const interval = setInterval(getMarketDetails, 3000);
    return () => clearInterval(interval);
  }, [getMarketDetails]);

  return (
    <div className="w-full pt-4 md:pt-0">
      <SwipeTabs
        tabListClassName="grid w-full grid-cols-3 md:w-1/2 lg:w-1/3 mb-6"
        value={activeTab}
        onValueChange={handleChangeTab}
        items={[
          {
            label: 'سفارشات خرید',
            value: 'buy',
            content: <OrdersTable orders={marketData.buyOrders} orderType="buy" />,
          },
          {
            label: 'سفارشات فروش',
            value: 'sell',
            content: <OrdersTable orders={marketData.sellOrders} orderType="sell" />,
          },
          {
            label: 'معاملات',
            value: 'transactions',
            content: <TransactionsTable transactions={marketData.transactions} />,
          },
        ]}
      />
    </div>
  );
}
