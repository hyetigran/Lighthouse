export const FETCH_PORTFOLIO_SUCCESS = "FETCH_PORTFOLIO_SUCCESS";
export const CREATE_TRANSACTION_SUCCESS = "CREATE_TRANSACTION_SUCCESS";
export const UPDATE_TRANSACTION_SUCCESS = "UPDATE_TRANSACTION_SUCCESS";
export const DELETE_TRANSACTION_SUCCESS = "DELETE_TRANSACTION_SUCCESS";

interface Transaction {
  txId: number,
  datePurchased: string,
  cryptoAmount: number,
  spotPrice: number
}

export interface PortfolioCoin {
  id: number,
  rank: number,
  logo: string,
  name: string,
  symbol: string,
  spotPrice: number,
  cryptoTotal: number,
  fiatTotal: number,
  transactions: Transaction[]
  historicalPrice: number[]
}


interface getPortfolioAction {
  type: typeof FETCH_PORTFOLIO_SUCCESS;
  payload: PortfolioCoin[];
}

interface createTransactionAction {
  type: typeof CREATE_TRANSACTION_SUCCESS;
  payload: string;
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
