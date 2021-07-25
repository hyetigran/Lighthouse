import axios from "axios";
import { Action } from "redux";
// @ts-ignore
import { MARKETS_API_KEY, PORTFOLIO_API_URL } from "@env";
import { ThunkAction } from "redux-thunk";

import { RootState } from "../index";
import {
  FETCH_PORTFOLIO_SUCCESS,
  CREATE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_SUCCESS,
  Portfolio,
  PortfolioCoin,
  Transaction,
} from "../types/portfolioTypes";
import { axiosWithAuth } from "../../helpers/axiosWithAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchCoinDataCMC = async (params: string) => {
  return await axios.get(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`,
    {
      headers: { "X-CMC_PRO_API_KEY": MARKETS_API_KEY },
      params: { id: params },
    }
  );
}
const calcGainAbs = (newPrice: number, oldPrice: number, coins: number) => {
  return (newPrice - oldPrice) * coins
}

const calcGainPercent = (newPrice: number, oldPrice: number) => {
  return ((newPrice - oldPrice) / oldPrice) * 100
}

const calcAvgPrice = (txns: Transaction[]) => {
  const totalAsset = txns.reduce((acc, cur) => acc += cur.coinAmount, 0)
  return txns.reduce((acc, cur) => acc += ((cur.coinAmount / totalAsset) * cur.purchasePrice), 0)
}

export const thunkFetchPortfolio =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
    async (dispatch) => {
      try {
        // GET PORTFOLIO COINS - API
        // TODO - hardcode 'Main' portfolio
        const token = await AsyncStorage.getItem("token");
        if (typeof token === "string") {
          const {
            data: { portfolio },
          }: any = await axiosWithAuth(token).get(
            `${PORTFOLIO_API_URL}/portfolio/Main`
          );
          // CONSTRUCT PORTFOLIO
          let portfolioData: Portfolio = {
            portfolioName: portfolio.portfolio_name,
            portfolioId: portfolio.id,
            portfolioCoins: [],
          };

          // GET COINS INFO - CMC
          const coinIds = Object.keys(portfolio.transactions
            .reduce((acc: any, cur: any) => {
              if (!acc[cur.coin_id]) {
                acc[cur.coin_id] = 1;
              }
              return acc;
            }, {})).join(",")

          if (coinIds !== "") {
            const result: any = await fetchCoinDataCMC(coinIds)

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
            const mapCoinIdToIndex: { [coin_id: string]: number } = {};

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
                  is_buy,
                } = txn;
                const { name, symbol, price, logo } = coinData[coin_id];
                const sign = is_buy ? 1 : -1;

                const gainLossAbs = calcGainAbs(price, spot_price, coin_amount)
                const gainLossPercent = calcGainPercent(price, spot_price)

                const transactionMapped = {
                  txId: id,
                  purchaseDate: purchase_date,
                  coinAmount: coin_amount,
                  purchasePrice: spot_price,
                  isBuy: is_buy,
                  exchange: exchange,
                  marketValue: coin_amount * price,
                  costBasis: coin_amount * spot_price,
                  gainLossAbs,
                  gainLossPercent,
                  fiat,
                };

                if (!mapCoinIdToIndex.hasOwnProperty(coin_id)) {
                  const portfolioCoin = {
                    coinId: coin_id,
                    name: name,
                    symbol: symbol,
                    spotPrice: price,
                    logo: logo,
                    cryptoTotal: coin_amount * sign,
                    marketValue: coin_amount * sign * price,
                    costBasis: coin_amount * spot_price,
                    avgBuyPrice: 0,
                    avgSellPrice: 0,
                    transactions: [transactionMapped],
                    historicalPrice: [0],
                  };
                  let index = acc.length;
                  mapCoinIdToIndex[coin_id] = index;
                  acc[index] = portfolioCoin;
                } else {
                  let index = mapCoinIdToIndex[coin_id];
                  acc[index].cryptoTotal += coin_amount * sign;
                  acc[index].marketValue = acc[index].cryptoTotal * price;
                  acc[index].costBasis += transactionMapped.costBasis;
                  acc[index].transactions = [
                    ...acc[index].transactions,
                    transactionMapped,
                  ];
                }
                return acc;
              },
              []
            );
            const portCoinsWithAvgs = portfolioCoins.map((coin: PortfolioCoin) => {
              const buyTxns = coin.transactions.filter(txn => txn.isBuy)
              const sellTxns = coin.transactions.filter(txn => !txn.isBuy)
              coin.avgBuyPrice = calcAvgPrice(buyTxns)
              coin.avgSellPrice = calcAvgPrice(sellTxns)
              return coin;
            })
            portfolioData.portfolioCoins = portCoinsWithAvgs;
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
        const token = await AsyncStorage.getItem("token");
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

export const thunkCreateTransaction =
  (data: {
    purchase_date: number;
    coin_amount: string;
    spot_price: number;
    exchange: string;
    fiat: string;
    coin_id: number;
    portfolio_id: string;
    is_buy: boolean;
  }): ThunkAction<void, RootState, unknown, Action<string>> =>
    async (dispatch, getState) => {
      try {
        // SEND NETWORK REQUEST
        const token = await AsyncStorage.getItem("token");
        const result = await axiosWithAuth(token!).post(
          `${PORTFOLIO_API_URL}/transaction-create`,
          data
        );
        // MAP RESULT TO 'Transaction' TYPE
        const {
          id,
          is_buy,
          coin_id,
          exchange,
          fiat,
          coin_amount,
          purchase_date,
          spot_price,
        } = result.data.data;

        const coinResult: any = await fetchCoinDataCMC(coin_id.toString())

        const { name, symbol, quote: { USD: { price } } } = coinResult.data.data[coin_id];

        const gainLossAbs = calcGainAbs(price, spot_price, coin_amount)
        const gainLossPercent = calcGainPercent(price, spot_price)

        const transaction = {
          txId: id,
          purchaseDate: purchase_date,
          purchasePrice: spot_price,
          coinAmount: coin_amount,
          marketValue: coin_amount * price,
          costBasis: coin_amount * spot_price,
          isBuy: is_buy,
          exchange,
          fiat,
          gainLossAbs,
          gainLossPercent
        };

        const sign = transaction.isBuy ? 1 : -1;
        const { portfolio }: { portfolio: Portfolio } = getState()
        let updatedCoins: PortfolioCoin[] = [...portfolio.portfolioCoins]
        // FIRST COIN TRANSACTION
        const isFirstCoinTxn = portfolio.portfolioCoins.findIndex(coin => coin.coinId === coin_id)
        if (isFirstCoinTxn === -1) {

          const newPortfolioCoin = {
            coinId: coin_id,
            name: name,
            symbol: symbol,
            spotPrice: price,
            logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin_id}.png`,
            cryptoTotal: coin_amount * sign,
            marketValue: coin_amount * sign * price,
            costBasis: coin_amount * spot_price,
            avgBuyPrice: transaction.isBuy ? coin_amount * spot_price : 0,
            avgSellPrice: transaction.isBuy ? 0 : coin_amount * spot_price,
            transactions: [transaction],
            historicalPrice: [0],
          };
          updatedCoins.push(newPortfolioCoin);
        } else {
          // ADD TRANSACTION TO EXISTING COIN
          updatedCoins = updatedCoins.map(coin => {
            if (coin.coinId === coin_id) {
              const newCryptoTotal = coin.cryptoTotal + (transaction.coinAmount * sign)
              const buyTxns = coin.transactions.filter(txn => txn.isBuy)
              const sellTxns = coin.transactions.filter(txn => !txn.isBuy)
              const avgBuyPrice = calcAvgPrice(buyTxns)
              const avgSellPrice = calcAvgPrice(sellTxns)
              return {
                ...coin,
                cryptoTotal: newCryptoTotal,
                marketValue: newCryptoTotal * coin.spotPrice!,
                avgBuyPrice,
                avgSellPrice,
                transactions: [
                  ...coin.transactions,
                  transaction
                ]
              }
            }
            return coin;
          })
        }

        // SAVE COIN TO PORTFOLIO STATE
        dispatch(createTransaction(updatedCoins));
      } catch (error) {
        console.log(error);
      }
    };
export const createTransaction = (payload: PortfolioCoin[]) => {
  return {
    type: CREATE_TRANSACTION_SUCCESS,
    payload,
  };
};


export const thunkDeleteTransaction =
  ({ txId, coinId }: { txId: string, coinId: number }): ThunkAction<void, RootState, unknown, Action<string>> =>
    async (dispatch, getState) => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (typeof token === "string") {
          const data: any = await axiosWithAuth(token).delete(
            `${PORTFOLIO_API_URL}/transaction/${txId}`
          );
          // TODO - USE message FROM data RESPONSE IN TOAST
          // RE-CALIBRATE PORTFOLIO
          const { portfolio }: { portfolio: Portfolio } = getState()
          let updatedPortfolioCoins: PortfolioCoin[] = []
          const selectedCoin = portfolio.portfolioCoins.find(coin => coin.coinId === coinId)!
          const filteredPortfolio = portfolio.portfolioCoins.filter(coin => coin.coinId !== coinId)
          if (selectedCoin.transactions.length > 1) {
            // HANDLE MORE THAN 1 TRANSACTION FOR COIN

            const filteredTransactions = selectedCoin.transactions.filter(txn => txn.txId !== txId)
            const filteredTransactionsBuy = filteredTransactions.filter(txn => txn.isBuy)
            const filteredTransactionsSell = filteredTransactions.filter(txn => !txn.isBuy)

            const { cryptoTotal, marketValue, costBasis } = filteredTransactions.reduce((acc, cur) => {
              const sign = cur.isBuy ? 1 : -1
              acc.cryptoTotal += cur.coinAmount * sign
              acc.costBasis += cur.costBasis
              acc.marketValue += cur.marketValue
              return acc
            }, {
              cryptoTotal: 0,
              marketValue: 0,
              costBasis: 0,
            })
            updatedPortfolioCoins = [
              ...filteredPortfolio,
              {
                ...selectedCoin,
                transactions: filteredTransactions,
                cryptoTotal,
                marketValue,
                costBasis,
                avgBuyPrice: calcAvgPrice(filteredTransactionsBuy),
                avgSellPrice: calcAvgPrice(filteredTransactionsSell),
              }
            ];
          } else {
            // HANDLE ONLY 1 TRANSACTION FOR COIN
            updatedPortfolioCoins = filteredPortfolio

          }
          dispatch(deleteTransaction(updatedPortfolioCoins));
        }
      } catch (error) {
        console.log(error);
      }
    };

export const deleteTransaction = (payload: PortfolioCoin[]) => {

  return {
    type: DELETE_TRANSACTION_SUCCESS,
    payload,
  }
}