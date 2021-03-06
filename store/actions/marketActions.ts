import axios from "axios";
import { Action } from "redux";
import { RootState } from "../index";
import { ThunkAction } from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
import { MARKETS_API_KEY } from "@env";
import {
  FETCH_CURRENCIES_SUCCESS,
  FETCH_FAV_CURRENCIES_SUCCESS,
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
      {
        headers: { "X-CMC_PRO_API_KEY": MARKETS_API_KEY },
      }
    );

    // FETCH FAVORITES FROM LOCAL STORAGE
    let favCoinResult = await AsyncStorage.getItem("favoriteCoins");
    let favCoins: string[] =
      favCoinResult != null ? JSON.parse(favCoinResult) : [];

    const currencyData = result.data.data.map((coin: any) => {
      let isFaved = favCoins.includes(coin.symbol) ? true : false;

      if (isFaved) {
        // Remove from list
        favCoins.splice(favCoins.indexOf(coin.symbol), 1);
      }

      return {
        id: coin.id,
        rank: coin.cmc_rank,
        name: coin.name,
        price: coin.quote.USD.price,
        symbol: coin.symbol,
        marketCap: coin.quote.USD.market_cap,
        percentChange24h: coin.quote.USD.percent_change_24h,
        isFav: isFaved,
        logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`,
      };
    });
    dispatch(fetchAllCurrencies(currencyData));
  } catch (error) {
    console.log("err", error);
  }
};

export const thunkGetFavoriteCurrencies = (
  favSymbols: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
    try {
      const currencyData: Currency[] = [];
      // FETCH FAVORITE COINS
      if (favSymbols) {
        const result: any = await axios.get(
          `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`,
          {
            headers: { "X-CMC_PRO_API_KEY": MARKETS_API_KEY },
            params: { symbol: favSymbols },
          }
        );

        for (let idx in result.data.data) {
          let coin = result.data.data[idx];
          currencyData.push({
            id: coin.id,
            rank: coin.cmc_rank,
            name: coin.name,
            price: coin.quote.USD.price,
            symbol: coin.symbol,
            marketCap: coin.quote.USD.market_cap,
            percentChange24h: coin.quote.USD.percent_change_24h,
            isFav: true, // true by default
            logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`,
          });
        }
      }

      dispatch(fetchFavoriteCurrencies(currencyData));
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

const fetchFavoriteCurrencies = (
  favCurrencies: Currency[]
): MarketActionTypes => {
  return {
    type: FETCH_FAV_CURRENCIES_SUCCESS,
    payload: favCurrencies,
  };
};

export const thunkToggleFavorite = (
  isFav: boolean,
  symbol: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
    try {
      let result = await AsyncStorage.getItem("favoriteCoins");
      let favCoins: string[] = result != null ? JSON.parse(result) : [];

      if (isFav) {
        // Handle coin unfavorited
        let updateFavCoins = favCoins!.filter((coin) => coin !== symbol);
        await AsyncStorage.setItem(
          "favoriteCoins",
          JSON.stringify(updateFavCoins)
        );
      } else if (!isFav) {
        // Handle coin favorited
        let updateFavCoins = [...favCoins, symbol];
        await AsyncStorage.setItem(
          "favoriteCoins",
          JSON.stringify(updateFavCoins)
        );
      }
      dispatch(toggleFavorite(symbol));
    } catch (error) {
      console.log(error);
    }
  };

const toggleFavorite = (symbol: string): MarketActionTypes => {
  return {
    type: TOGGLE_FAVORITE_COIN,
    payload: symbol,
  };
};
