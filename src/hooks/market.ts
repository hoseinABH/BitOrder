// Services
import { getCoinList, getOrders, getTransactions } from '@/services/market';
// Utilities
import { normalizeMarketCoins, normalizeMarketData } from '@/lib/utils';
// Hooks
import { useMarketStore } from '@/store/market';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
// Types
import type { LoadingKeys, MarketData } from '@/types/market';

export function useMarket() {
  const { setLoading, setCoins, setMarketData } = useMarketStore();
  const params = useParams<{ id: string }>();

  const handleError = useCallback(
    (key: LoadingKeys, error: unknown) => {
      setLoading(false, key);
      console.error(`[${key} error]:`, error);
    },
    [setLoading],
  );

  const getCoins = useCallback(async () => {
    const loadingKey = 'getAllCoins';
    try {
      setLoading(true, loadingKey);
      const response = await getCoinList();
      const normalizedCoins = normalizeMarketCoins(response.results);
      setCoins(normalizedCoins);
    } catch (error) {
      handleError(loadingKey, error);
    } finally {
      setLoading(false, loadingKey);
    }
  }, [setLoading, setCoins, handleError]);

  const getMarketDetails = useCallback(async () => {
    const loadingKey = 'getMarketDetails';
    const marketId = params?.id;
    if (!marketId) return;
    try {
      setLoading(true, loadingKey);
      const [buyOrders, sellOrders, transactions] = await Promise.all([
        getOrders(marketId, 'buy'),
        getOrders(marketId, 'sell'),
        getTransactions(marketId),
      ]);

      const marketData: MarketData = {
        buyOrders: normalizeMarketData(buyOrders.orders),
        sellOrders: normalizeMarketData(sellOrders.orders),
        transactions: normalizeMarketData(transactions),
      };
      setMarketData(marketData);
    } catch (error) {
      handleError(loadingKey, error);
    } finally {
      setLoading(false, loadingKey);
    }
  }, [setLoading, params.id, setMarketData, handleError]);

  return { getCoins, getMarketDetails };
}
