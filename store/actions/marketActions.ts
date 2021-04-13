import axios from "axios";
import { Action } from "redux";
import { RootState } from "../index";
import { ThunkAction } from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MARKETS_API_KEY } from "@env";
import {
  FETCH_CURRENCIES_SUCCESS,
  TOGGLE_FAVORITE_COIN,
  Currency,
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

    const currencyData = result.data.data.map((coin: any) => {
      return {
        id: coin.id,
        rank: coin.cmc_rank,
        name: coin.name,
        price: coin.quote.USD.price,
        symbol: coin.symbol,
        marketCap: coin.quote.USD.market_cap,
        percentChange24h: coin.quote.USD.percent_change_24h,
        isFav: false, // false by default
        logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`,
      };
    });
    console.log("fetched");
    dispatch(fetchAllCurrencies(currencyData));
  } catch (error) {
    console.log("err", error);
  }
};

const fetchAllCurrencies = (allCurrencies: Currency[]): MarketActionTypes => {
  return {
    type: FETCH_CURRENCIES_SUCCESS,
    payload: allCurrencies,
  };
};

export const toggleFavorite = async (isFav: boolean, symbol: string) => {
  let result = await AsyncStorage.getItem("favoriteCoins");
  let favCoins: string[] = result != null ? JSON.parse(result) : [];
  if (isFav) {
    let updateFavCoins = favCoins!.filter((coin) => coin !== symbol);
    await AsyncStorage.setItem("favoriteCoins", JSON.stringify(updateFavCoins));
    return {
      type: TOGGLE_FAVORITE_COIN,
      payload: symbol,
    };
  }
};
