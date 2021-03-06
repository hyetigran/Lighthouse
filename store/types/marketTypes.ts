export const FETCH_CURRENCIES_SUCCESS = "FETCH_CURRENCIES_SUCCESS";
export const TOGGLE_FAVORITE_COIN = "TOGGLE_FAVORITE_COIN";
export const FETCH_FAV_CURRENCIES_SUCCESS = "FETCH_FAV_CURRENCIES_SUCCESS";

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
  market: {
    [key: number]: Currency[];
    0: Currency[];
    1: Currency[];
  };
}
interface getCurrenciesAction {
  type: typeof FETCH_CURRENCIES_SUCCESS;
  payload: Currency[];
}

interface getFavCurrenciesAction {
  type: typeof FETCH_FAV_CURRENCIES_SUCCESS;
  payload: Currency[];
}

interface toggleFavoriteAction {
  type: typeof TOGGLE_FAVORITE_COIN;
  payload: string;
}
export type MarketActionTypes =
  | getCurrenciesAction
  | toggleFavoriteAction
  | getFavCurrenciesAction;
