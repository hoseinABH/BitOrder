// Utilities
import { client } from '@/lib/client';
// Types
import type { GetCoinListResponse } from '@/types/market';

async function getCoinList() {
  const endpoint = `v1/mkt/markets/`;
  const response = await client<GetCoinListResponse>({ endpoint });
  return response;
}

export { getCoinList };
