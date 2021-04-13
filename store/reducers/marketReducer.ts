import {
  FETCH_CURRENCIES_SUCCESS,
  MarketActionTypes,
  TOGGLE_FAVORITE_COIN,
} from "../types/marketTypes";

const initialState = [
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
];
export const marketReducer = (
  state = initialState,
  action: MarketActionTypes
) => {
  switch (action.type) {
    case FETCH_CURRENCIES_SUCCESS:
      return [...action.payload];
    case TOGGLE_FAVORITE_COIN:
      let updateState = state.map((coin) => {
        if (coin.symbol === action.payload) {
          coin.isFav = !coin.isFav;
        }
      });
      return updateState;
    default:
      return state;
  }
};
