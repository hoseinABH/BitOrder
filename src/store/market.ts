import { create } from 'zustand';
// Types
import type { MarketLoading, MarketCoin, LoadingKeys, MarketData } from '@/types/market';

export interface MarketValues {
  loading: MarketLoading;
  coins: MarketCoin[];
  marketData: MarketData;
}

export interface MarketAction {
  setLoading: (status: boolean, key: LoadingKeys) => void;
  setCoins: (coins: MarketCoin[]) => void;
  setMarketData: (date: MarketData) => void;
}

export type MarketState = MarketValues & MarketAction;

const initialValues: MarketValues = {
  loading: {
    getAllCoins: false,
    getMarketDetails: false,
  },
  coins: [],
  marketData: {
    buyOrders: [],
    sellOrders: [],
    transactions: [],
  },
};

export const useMarketStore = create<MarketState>((set) => ({
  ...initialValues,
  setCoins: (coins) => set({ coins }),
  setMarketData: (marketData) => set({ marketData }),
  setLoading: (status, key) => set((state) => ({ loading: { ...state.loading, [key]: status } })),
}));
