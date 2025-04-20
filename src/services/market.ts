// Utilities
import { client } from '@/lib/client';
// Types
import type {
  GetCoinListResponse,
  GetOrdersResponse,
  OrderType,
  Transaction,
} from '@/types/market';

async function getCoinList() {
  const endpoint = `v1/mkt/markets/`;
  const response = await client<GetCoinListResponse>({ endpoint });
  return response;
}

async function getOrders(marketId: string, type: OrderType) {
  const endpoint = `v2/mth/actives/${marketId}/?type=${type}`;
  const response = await client<GetOrdersResponse>({ endpoint });
  return response;
}

async function getTransactions(marketId: string) {
  const endpoint = `v1/mth/matches/${marketId}/`;
  const response = await client<Transaction[]>({ endpoint });
  return response;
}

export { getCoinList, getOrders, getTransactions };
