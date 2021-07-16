export const FETCH_PORTFOLIO_SUCCESS = "FETCH_PORTFOLIO_SUCCESS";
export const CREATE_TRANSACTION_SUCCESS = "CREATE_TRANSACTION_SUCCESS";
export const UPDATE_TRANSACTION_SUCCESS = "UPDATE_TRANSACTION_SUCCESS";
export const DELETE_TRANSACTION_SUCCESS = "DELETE_TRANSACTION_SUCCESS";

export interface Transaction {
  txId: number,
  purchaseDate: string,
  purchasePrice: number,
  exchange: string,
  coinAmount: number,
  fiat: string,
  isBuy: boolean
}

export interface PortfolioCoin {
  coinId: number,
  name: string,
  symbol: string,
  logo: string,
  spotPrice?: number,
  cryptoTotal: number,
  fiatTotal?: number,
  transactions: Transaction[]
  historicalPrice?: number[]
}

export interface Portfolio {
  portfolioCoins: PortfolioCoin[],
  portfolioName: string,
  portfolioId: string,
}

interface getPortfolioAction {
  type: typeof FETCH_PORTFOLIO_SUCCESS;
  payload: Portfolio;
}

interface createTransactionAction {
  type: typeof CREATE_TRANSACTION_SUCCESS;
  payload: {
    transaction: Transaction
    coinId: number
  };
}

interface updateTransactionAction {
  type: typeof UPDATE_TRANSACTION_SUCCESS;
  payload: string;
}

interface deleteTransactionAction {
  type: typeof DELETE_TRANSACTION_SUCCESS;
  payload: string;
}

export type PortfolioActionTypes =
  | getPortfolioAction
  | createTransactionAction
  | updateTransactionAction
  | deleteTransactionAction;
