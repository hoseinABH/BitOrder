import { create } from 'zustand';
// Types
import type { MarketLoading, MarketCoin, LoadingKeys } from '@/types/market';

export interface MarketValues {
  loading: MarketLoading;
  coins: MarketCoin[];
}

export interface MarketAction {
  setLoading: (status: boolean, key: LoadingKeys) => void;
  setCoins: (coins: MarketCoin[]) => void;
}

export type MarketState = MarketValues & MarketAction;

const initialValues: MarketValues = {
  loading: {
    getAllCoins: false,
  },
  coins: [],
};

const useMarketStore = create<MarketState>((set) => ({
  ...initialValues,
  setCoins: (coins) => set({ coins }),
  setLoading: (status, key) => set((state) => ({ loading: { ...state.loading, [key]: status } })),
}));

export default useMarketStore;
