import axios from "axios";
import { Action } from "redux";
// @ts-ignore
import { MARKETS_API_KEY, PORTFOLIO_API_URL } from "@env";
import { ThunkAction } from "redux-thunk";

import { RootState } from "../index";
import {
  FETCH_PORTFOLIO_SUCCESS,
  Portfolio,
  PortfolioCoin,
} from "../types/portfolioTypes";
import { axiosWithAuth } from "../../helpers/axiosWithAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const thunkFetchPortfolio =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
    async (dispatch) => {
      try {
        // GET PORTFOLIO COINS - API
        // TODO - hardcode 'Main' portfolio
        const token = await AsyncStorage.getItem("token")
        if (typeof token === "string") {
          const { data: { portfolio } }: any = await axiosWithAuth(token).get(
            `${PORTFOLIO_API_URL}/portfolio/Main`
          );
          // CONSTRUCT PORTFOLIO
          let portfolioData: Portfolio = {
            portfolioName: portfolio.portfolio_name,
            portfolioId: portfolio.id,
            portfolioCoins: [],
          };

          // GET COINS INFO - CMC
          const coinIds = portfolio.transactions.reduce((acc: any, cur: any) => {
            if (!acc[cur.coin_id]) {
              return (acc += `,${cur.coin_id}`);
            }
            return acc;
          }, "");

          if (coinIds !== "") {
            const result: any = await axios.get(
              `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`,
              {
                headers: { "X-CMC_PRO_API_KEY": MARKETS_API_KEY },
                params: { symbol: coinIds },
              }
            );

            let coinData: any = {};
            for (let idx in result.data.data) {
              let coin = result.data.data[idx];
              coinData[coin.id] = {
                id: coin.id,
                name: coin.name,
                price: coin.quote.USD.price,
                symbol: coin.symbol,
                logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`,
              };
            }
            const mapCoinIdToIndex: { [coin_id: string]: number } = {}

            const portfolioCoins = portfolio.transactions?.reduce(
              (acc: PortfolioCoin[], txn: any) => {
                const {
                  id,
                  coin_id,
                  fiat,
                  spot_price,
                  purchase_date,
                  coin_amount,
                  exchange,
                } = txn;

                const transactionMapped = {
                  txId: id,
                  purchaseDate: purchase_date,
                  coinAmount: coin_amount,
                  purchasePrice: spot_price,
                  exchange: exchange,
                  fiat,
                };
                let { name, symbol, price, logo } = coinData[coin_id];
                if (!mapCoinIdToIndex[coin_id]) {
                  const portfolioCoin = {
                    coinId: coin_id,
                    name: name,
                    symbol: symbol,
                    spotPrice: price,
                    logo: logo,
                    cryptoTotal: coin_amount,
                    fiatTotal: coin_amount * price,
                    transactions: [transactionMapped],
                    historicalPrice: [0],
                  };
                  let index = acc.length
                  mapCoinIdToIndex[coin_id] = index;
                  acc[index] = portfolioCoin;
                } else {
                  let index = mapCoinIdToIndex[coin_id]
                  acc[index].cryptoTotal += coin_amount;
                  acc[index].fiatTotal = acc[index].cryptoTotal * price;
                  acc[index].transactions = [
                    ...acc[index].transactions,
                    transactionMapped,
                  ];
                }
                return acc;
              },
              []
            );

            portfolioData.portfolioCoins = portfolioCoins;

          }






          // CALCULATE GAIN 1H, 1D, 1M, 1Y, All
          dispatch(fetchPortfolio(portfolioData));
        }
      } catch (error) {
        console.log(error);
      }
    };

export const fetchPortfolio = (payload: Portfolio) => {
  return {
    type: FETCH_PORTFOLIO_SUCCESS,
    payload,
  };
};

export const thunkCreatePortfolio =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
    async (dispatch) => {
      try {
        // GET PORTFOLIO COINS - API
        // TODO - hardcode 'Main' portfolio
        const token = await AsyncStorage.getItem("token")
        if (typeof token === "string") {
          const { portfolio }: any = await axiosWithAuth(token).post(
            `${PORTFOLIO_API_URL}/portfolio/Main`
          );

          // CONSTRUCT PORTFOLIO
          let portfolioData: Portfolio = {
            portfolioName: portfolio.portfolio_name,
            portfolioId: portfolio.id,
            portfolioCoins: [],
          };

          // CALCULATE GAIN 1H, 1D, 1M, 1Y, All
          dispatch(createPortfolio(portfolioData));
        }
      } catch (error) {
        console.log(error);
      }
    };
export const createPortfolio = (payload: Portfolio) => {
  return {
    type: FETCH_PORTFOLIO_SUCCESS,
    payload,
  };
};