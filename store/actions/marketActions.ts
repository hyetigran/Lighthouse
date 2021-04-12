import axios from "axios";
import { Action } from "redux";
import { RootState } from "../index";
import { ThunkAction } from "redux-thunk";

import { MARKETS_API_KEY } from "@env";
import {
  FETCH_CURRENCIES_SUCCESS,
  MarketActionTypes,
} from "../types/marketTypes";

export const thunkGetAllCurrencies = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    // FETCH COINS
    const result: any = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`,
      { headers: { "X-CMC_PRO_API_KEY": MARKETS_API_KEY } }
    );
    console.log("result cmc", result);
    dispatch(fetchAllCurrencies(result));
  } catch (error) {
    console.log(error);
  }
};

const fetchAllCurrencies = (allCurrencies: any): MarketActionTypes => {
  return {
    type: FETCH_CURRENCIES_SUCCESS,
    payload: allCurrencies,
  };
};
