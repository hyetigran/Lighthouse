import axios from "axios";
import { Action } from "redux";
import { RootState } from "../index";
import { ThunkAction } from "redux-thunk";
import { FETCH_PORTFOLIO_SUCCESS } from "../types/portfolioTypes";

export const thunkFetchPortfolio =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
    async (dispatch) => {
      try {
        const result = Promise.resolve(dummyData);
        dispatch(fetchPortfolio(result));
      } catch (error) {
        console.log(error);
      }
    };
export const fetchPortfolio = (payload: any) => {
  return {
    type: FETCH_PORTFOLIO_SUCCESS,
    payload,
  };
};

const dummyData = [
  {
    id: 1,
    rank: 1,
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
    name: "Bitcoin",
    symbol: "BTC",
    spotPrice: 41234.56,
    cryptoTotal: 1.23,
    fiatTotal: 55123.11,
    transactions: [
      {
        txId: 123123123123132,
        datePurchased: "01/22/2017",
        cryptoAmount: 1.0,
        spotPrice: 25000,
      },
      {
        txId: 223123123123132,
        datePurchased: "02/22/2017",
        cryptoAmount: 2,
        spotPrice: 23000,
      },
    ],
    historicalPrice: [60000, 22000, 55000, 12312, 3000],
  },
];
