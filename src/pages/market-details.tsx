// Common components
import { OrdersTable } from '@/components/orders-table';
import { TransactionsTable } from '@/components/transactions-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// Hooks
import { useMarket } from '@/hooks/market';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// Types
import type { OrderType } from '@/types/market';
import { useMarketStore } from '@/store/market';

type ActiveTab = OrderType | 'transactions';

const minSwipeDistance = 50;

export function MarketDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getMarketDetails } = useMarket();
  const { marketData } = useMarketStore();
  const activeTab = (searchParams.get('activeTab') || 'buy') as ActiveTab;

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

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

  function handleSwipe() {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    let targetTab = '';
    if (isRightSwipe) {
      if (activeTab === 'buy') {
        targetTab = 'sell';
      }
      if (activeTab === 'sell') {
        targetTab = 'transactions';
      }
    }
    if (isLeftSwipe) {
      if (activeTab === 'transactions') {
        targetTab = 'sell';
      }
      if (activeTab === 'sell') {
        targetTab = 'buy';
      }
    }

    handleChangeTab(targetTab);
  }

  function onTouchStart(e: React.TouchEvent) {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }

  function onTouchMove(e: React.TouchEvent) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function onTouchEnd() {
    if (!touchStart || !touchEnd) return;
    handleSwipe();
    setTouchStart(null);
    setTouchEnd(null);
  }

  useEffect(() => {
    getMarketDetails();
    const interval = setInterval(() => {
      getMarketDetails();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full pt-4 md:pt-0">
      <Tabs
        className="w-full items-center md:items-start"
        value={activeTab}
        onValueChange={handleChangeTab}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <TabsList className="mb-6 grid w-full grid-cols-3 md:w-1/2 lg:h-1/3">
          <TabsTrigger value="buy">سفارشات خرید</TabsTrigger>
          <TabsTrigger value="sell">سفارشات فروش</TabsTrigger>
          <TabsTrigger value="transactions">معاملات</TabsTrigger>
        </TabsList>
        <TabsContent value="buy">
          <OrdersTable orders={marketData.buyOrders} orderType="buy" />
        </TabsContent>
        <TabsContent value="sell">
          <OrdersTable orders={marketData.sellOrders} orderType="sell" />
        </TabsContent>
        <TabsContent value="transactions">
          <TransactionsTable transactions={marketData.transactions} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
