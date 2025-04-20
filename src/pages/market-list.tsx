// Common components
import { CoinList } from '@/components/coin-list';
import { Pagination } from '@/components/pagination';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
// Hooks
import { useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// Types
import type { BasePrice } from '@/types/market';

const mockCoins = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Coin ${i + 1}`,
  symbol: `C${i + 1}`,
  priceUSDT: Math.random() * 10000,
  priceIRT: Math.random() * 10000 * 580000,
  changePercentage: Math.random() * 20 - 10,
}));

export function MarketList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const baseParam = searchParams.get('currency') || 'usdt';
  const pageParam = searchParams.get('page') || '1';

  const currentPage = Number.parseInt(pageParam, 10);
  const basePrice = baseParam.toUpperCase() as BasePrice;

  const updateUrlParams = useCallback(
    (newBase?: string, newPage?: number) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newBase) {
        params.set('currency', newBase);
      }

      if (newPage) {
        params.set('page', newPage.toString());
      }
      navigate(`?${params.toString()}`);
    },
    [navigate, searchParams],
  );

  // Handle base price change
  const handleBaseChange = useCallback(
    (value: string) => {
      updateUrlParams(value, undefined);
    },
    [updateUrlParams],
  );

  // Handle page change
  const handlePageChange = useCallback(
    (page: number) => {
      updateUrlParams(undefined, page);
    },
    [updateUrlParams],
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(mockCoins.length / itemsPerPage);

  const currentCoins = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return mockCoins.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage]);

  return (
    <div className="w-full">
      <h1 className="text-3xl md:text-4xl lg:text-5xl">قیمت ارز های دیجیتال</h1>
      <Tabs defaultValue={basePrice} onValueChange={handleBaseChange} className="mt-12 mb-6">
        <TabsList className="grid w-[200px] grid-cols-2">
          <TabsTrigger value="USDT">پایه تتر</TabsTrigger>
          <TabsTrigger value="IRT">پایه تومان</TabsTrigger>
        </TabsList>
      </Tabs>
      <CoinList coins={currentCoins} basePrice={basePrice} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
