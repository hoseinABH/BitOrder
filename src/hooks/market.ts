// Services
import { getCoinList, getOrders, getTransactions } from '@/services/market';
// Utilities
import { normalizeMarketCoins, normalizeMarketData } from '@/lib/utils';
// Hooks
import { useMarketStore } from '@/store/market';
import { useParams } from 'react-router-dom';
// Types
import type { MarketData } from '@/types/market';

export function useMarket() {
  const { setLoading, setCoins, setMarketData } = useMarketStore();
  const params = useParams() as { id: string };
  async function getCoins() {
    try {
      setLoading(true, 'getAllCoins');
      const response = await getCoinList();
      setLoading(false, 'getAllCoins');
      const normalizedCoins = normalizeMarketCoins(response.results);
      setCoins(normalizedCoins);
    } catch (error) {
      setLoading(false, 'getAllCoins');
      console.log(error);
    }
  }

  async function getMarketDetails() {
    try {
      setLoading(true, 'getMarketDetails');
      const marketId = params.id;
      const [buyOrders, sellOrders, transactions] = await Promise.all([
        getOrders(marketId, 'buy'),
        getOrders(marketId, 'sell'),
        getTransactions(marketId),
      ]);
      setLoading(false, 'getMarketDetails');
      const marketData: MarketData = {
        buyOrders: normalizeMarketData(buyOrders.orders),
        sellOrders: normalizeMarketData(sellOrders.orders),
        transactions: normalizeMarketData(transactions),
      };
      setMarketData(marketData);
    } catch (error) {
      setLoading(false, 'getMarketDetails');
      console.log(error);
    }
  }

  return { getCoins, getMarketDetails };
}
