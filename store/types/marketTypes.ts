export const FETCH_CURRENCIES_SUCCESS = "FETCH_CURRENCIES_SUCCESS";

export interface Currency {
  id: number;
  logo: string;
  rank: number;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  percentChange24h: number;
  isFav: boolean;
}
export interface MarketState {
  market: Currency[];
}
interface getCurrenciesAction {
  type: typeof FETCH_CURRENCIES_SUCCESS;
  payload: Currency[];
}
export type MarketActionTypes = getCurrenciesAction;
