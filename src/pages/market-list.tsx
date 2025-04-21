// Common components
import { CoinList } from '@/components/coin-list';
import { Pagination } from '@/components/pagination';
import { SwipeTabs } from '@/components/swipe-tabs';
// Hooks
import { useMarket } from '@/hooks/market';
import { useMarketStore } from '@/store/market';
import { Fragment, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

type CoinBase = 'irt' | 'usdt';

export default function MarketList() {
  const navigate = useNavigate();
  const { getCoins } = useMarket();
  const { coins } = useMarketStore();
  const [searchParams] = useSearchParams();

  const currency = useMemo(
    () => (searchParams.get('currency') || 'usdt') as CoinBase,
    [searchParams],
  );
  const page = useMemo(() => Number.parseInt(searchParams.get('page') || '1', 10), [searchParams]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(coins.length / itemsPerPage);

  const currentCoins = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return coins.slice(startIndex, startIndex + itemsPerPage);
  }, [coins, page]);

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

  useEffect(() => {
    getCoins();
  }, [getCoins]);

  return (
    <Fragment>
      <h1 className="text-3xl md:text-4xl lg:text-5xl">قیمت ارز های دیجیتال</h1>
      <SwipeTabs
        className="mt-12"
        tabListClassName="grid w-full grid-cols-2 md:w-[200px] mb-6"
        value={currency}
        onValueChange={handleCurrencyChange}
        items={[
          {
            label: 'پایه تتر',
            value: 'usdt',
            content: <CoinList coins={currentCoins} currency="usdt" />,
          },
          {
            label: 'پایه تومان',
            value: 'irt',
            content: <CoinList coins={currentCoins} currency="irt" />,
          },
        ]}
      />
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </Fragment>
  );
}
