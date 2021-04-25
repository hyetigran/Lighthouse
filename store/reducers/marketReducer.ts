import {
  FETCH_CURRENCIES_SUCCESS,
  FETCH_FAV_CURRENCIES_SUCCESS,
  MarketActionTypes,
  TOGGLE_FAVORITE_COIN,
} from "../types/marketTypes";

const initialState = {
  // All currencies
  0: [
    {
      id: 0,
      rank: 0,
      logo: "",
      name: "",
      symbol: "",
      price: 0,
      marketCap: 0,
      percentChange24h: 0,
      isFav: false,
    },
  ],
  // Favorite currencies
  1: [
    {
      id: 0,
      rank: 0,
      logo: "",
      name: "",
      symbol: "",
      price: 0,
      marketCap: 0,
      percentChange24h: 0,
      isFav: false,
    },
  ],
};

export const marketReducer = (
  state = initialState,
  action: MarketActionTypes
) => {
  switch (action.type) {
    case FETCH_CURRENCIES_SUCCESS:
      return { ...state, 0: action.payload };
    case FETCH_FAV_CURRENCIES_SUCCESS:
      let preFetchedFavCoins = state[0].filter((coin) => coin.isFav);
      let allFavCoins = [...preFetchedFavCoins, ...action.payload].sort(
        (a, b) => a.rank - b.rank
      );
      return {
        ...state,
        1: allFavCoins,
      };
    case TOGGLE_FAVORITE_COIN:
      let updateState = state[0].map((coin) => {
        if (coin.symbol === action.payload) {
          coin.isFav = !coin.isFav;
        }
        return coin;
      });
      return { ...state, 0: updateState };
    default:
      return state;
  }
};
