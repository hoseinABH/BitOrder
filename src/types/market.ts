import type { Nullable } from './common';

export interface Currency<TCode extends string = string> {
  id: number;
  title: string;
  title_fa: string;
  code: TCode;
  tradable: boolean;
  for_test: boolean;
  image: string;
  decimal: number;
  decimal_amount: number;
  decimal_irt: number;
  color: string;
  high_risk: boolean;
  show_high_risk: boolean;
  withdraw_commission: string;
  tags: Tag[];
  etf: boolean;
  for_binvest: boolean;
  for_loan: boolean;
  for_stake: boolean;
  recommend_for_deposit_weight: number;
}

export interface Tag {
  id: number;
  name: string;
  name_en: string;
  has_chart: boolean;
}

export interface PriceInfo {
  created_at: number;
  price: string;
  change: number;
  min: string;
  max: string;
  time: Nullable<string>;
  mean: Nullable<string>;
  value: Nullable<string>;
  amount: Nullable<string>;
}

export type BasePrice = 'IRT' | 'USDT';

export interface CoinItem {
  id: number;
  currency1: Currency;
  currency2: Currency<BasePrice>;
  tradable: boolean;
  otc_tradable: boolean;
  coming_soon: boolean;
  for_test: boolean;
  otc_sell_percent: string;
  otc_buy_percent: string;
  otc_max_buy_amount: string;
  otc_max_sell_amount: string;
  order_book_info: {
    created_at: Nullable<number>;
    price: string;
    change: number;
    min: string;
    max: string;
    time: string;
    mean: string;
    value: string;
    amount: string;
  };
  internal_price_info: PriceInfo;
  price_info: PriceInfo;
  price: string;
  title: string;
  code: string;
  title_fa: string;
  trading_view_source: string;
  trading_view_symbol: string;
  otc_market: boolean;
  text: string;
  volume_24h: string;
  market_cap: string;
  circulating_supply: string;
  all_time_high: string;
  popularity_weight: number;
  freshness_weight: number;
  price_increment: Nullable<number>;
}

export interface GetCoinListResponse {
  count: number;
  next: Nullable<string>;
  previous: Nullable<string>;
  results: CoinItem[];
}
export type LoadingKeys = 'getAllCoins' | 'getMarketDetails';

export type MarketLoading = Record<LoadingKeys, boolean>;

export interface CoinInfo {
  id: number;
  name: string;
  name_fa: string;
  price: number;
  changePercentage: number;
}
export interface MarketCoin {
  image: string;
  code: string;
  usdt: CoinInfo;
  irt: CoinInfo;
}

export type OrderType = 'buy' | 'sell';

export interface Order {
  amount: string;
  remain: string;
  price: string;
  value: string;
}

export interface GetOrdersResponse {
  orders: Order[];
  volume: string;
}

export interface Transaction {
  time: number;
  price: string;
  value: string;
  match_amount: string;
  type: OrderType;
  match_id: string;
}

export interface MarketData {
  buyOrders: Order[];
  sellOrders: Order[];
  transactions: Transaction[];
}
