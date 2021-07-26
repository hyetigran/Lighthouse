export const FETCH_PORTFOLIO_SUCCESS = "FETCH_PORTFOLIO_SUCCESS";
export const CREATE_PORTFOLIO_SUCCESS = "CREATE_PORTFOLIO_SUCCESS";
export const CREATE_TRANSACTION_SUCCESS = "CREATE_TRANSACTION_SUCCESS";
export const UPDATE_TRANSACTION_SUCCESS = "UPDATE_TRANSACTION_SUCCESS";
export const DELETE_TRANSACTION_SUCCESS = "DELETE_TRANSACTION_SUCCESS";

export interface Transaction {
  txId: string,
  purchaseDate: string,
  purchasePrice: number,
  exchange: string,
  coinAmount: number,
  fiat: string,
  isBuy: boolean,
  marketValue: number,
  costBasis: number,
  gainLossAbs: number,
  gainLossPercent: number,
  priceType: number
}

export interface PortfolioCoin {
  coinId: number,
  name: string,
  symbol: string,
  logo: string,
  spotPrice: number,
  cryptoTotal: number,
  marketValue: number,
  costBasis: number,
  avgBuyPrice: number,
  avgSellPrice: number,
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

interface createPortfolioAction {
  type: typeof CREATE_PORTFOLIO_SUCCESS;
  payload: Portfolio;
}

interface createTransactionAction {
  type: typeof CREATE_TRANSACTION_SUCCESS;
  payload: PortfolioCoin[];
}

interface updateTransactionAction {
  type: typeof UPDATE_TRANSACTION_SUCCESS;
  payload: PortfolioCoin[];
}

interface deleteTransactionAction {
  type: typeof DELETE_TRANSACTION_SUCCESS;
  payload: PortfolioCoin[];
}

export type PortfolioActionTypes =
  | getPortfolioAction
  | createPortfolioAction
  | createTransactionAction
  | updateTransactionAction
  | deleteTransactionAction;
