// Utilities
import { client } from '@/lib/client';
// Types
import type { GetMarketsResponse } from '@/types/market';

async function getMarketList() {
  const endpoint = `v1/mkt/markets`;
  const response = await client<GetMarketsResponse>({ endpoint });
  return response;
}

export { getMarketList };
