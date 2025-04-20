// Common components
import { CoinList } from '@/components/coin-list';
import { Pagination } from '@/components/pagination';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
// Hooks
import { useMarket } from '@/hooks/market';
import { useMarketStore } from '@/store/market';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

type CoinBase = 'irt' | 'usdt';

export function MarketList() {
  const navigate = useNavigate();
  const { getCoins } = useMarket();
  const { coins } = useMarketStore();
  const [searchParams] = useSearchParams();
  const minSwipeDistance = 50;

  const currency = (searchParams.get('currency') || 'usdt') as CoinBase;
  const page = searchParams.get('page') || '1';

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const currentPage = Number.parseInt(page, 10);

  const updateUrlParams = useCallback(
    (newCurrency?: string, newPage?: number) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newCurrency) {
        params.set('currency', newCurrency);
      }

      if (newPage) {
        params.set('page', newPage.toString());
      }
      navigate(`?${params.toString()}`);
    },
    [navigate, searchParams],
  );

  const handleCurrencyChange = useCallback(
    (value: string) => {
      updateUrlParams(value, undefined);
    },
    [updateUrlParams],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateUrlParams(undefined, page);
    },
    [updateUrlParams],
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(coins.length / itemsPerPage);

  const currentCoins = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return coins.slice(startIndex, startIndex + itemsPerPage);
  }, [coins, currentPage]);

  function handleSwipe() {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currency === 'irt') {
      handleCurrencyChange('usdt');
    }

    if (isRightSwipe && currency === 'usdt') {
      handleCurrencyChange('irt');
    }
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
    getCoins();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-3xl md:text-4xl lg:text-5xl">قیمت ارز های دیجیتال</h1>
      <Tabs
        value={currency}
        onValueChange={handleCurrencyChange}
        className="mt-12 mb-6 items-center md:items-start"
      >
        <TabsList className="grid w-full grid-cols-2 md:w-[200px]">
          <TabsTrigger value="usdt">پایه تتر</TabsTrigger>
          <TabsTrigger value="irt">پایه تومان</TabsTrigger>
        </TabsList>
      </Tabs>
      <CoinList
        coins={currentCoins}
        currency={currency}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
