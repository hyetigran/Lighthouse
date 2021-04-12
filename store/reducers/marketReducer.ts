import {
  FETCH_CURRENCIES_SUCCESS,
  MarketActionTypes,
} from "../types/marketTypes";

export const marketReducer = (state = [], action: MarketActionTypes) => {
  switch (action.type) {
    case FETCH_CURRENCIES_SUCCESS:
      return [...action.payload];
    default:
      return state;
  }
};
