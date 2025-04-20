// Services
import { getCoinList } from '@/services/market';
// Utilities
import { normalizeMarketCoins } from '@/lib/utils';
// Hooks
import { useMarketStore } from '@/store/market';

export function useMarket() {
  const { setLoading, setCoins } = useMarketStore();
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

  return { getCoins };
}
