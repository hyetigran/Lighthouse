export const FETCH_CURRENCIES_SUCCESS = "FETCH_CURRENCIES_SUCCESS";

export interface RootState {
  coin: string;
}

interface getCurrenciesAction {
  type: typeof FETCH_CURRENCIES_SUCCESS;
  payload: RootState;
}
export type MarketActionTypes = getCurrenciesAction;
