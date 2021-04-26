export const FETCH_PORTFOLIO_SUCCESS = "FETCH_PORTFOLIO_SUCCESS";
export const CREATE_TRANSACTION_SUCCESS = "CREATE_TRANSACTION_SUCCESS";
export const UPDATE_TRANSACTION_SUCCESS = "UPDATE_TRANSACTION_SUCCESS";
export const DELETE_TRANSACTION_SUCCESS = "DELETE_TRANSACTION_SUCCESS";

interface Transaction {
  name: string;
  symbol: string;
  amount: number;
}

interface Portfolio {
  transactions: Transaction[];
}

interface getPortfolioAction {
  type: typeof FETCH_PORTFOLIO_SUCCESS;
  payload: Portfolio;
}

interface createTransactionAction {
  type: typeof CREATE_TRANSACTION_SUCCESS;
  payload: Portfolio;
}

interface updateTransactionAction {
  type: typeof UPDATE_TRANSACTION_SUCCESS;
  payload: Portfolio;
}

interface deleteTransactionAction {
  type: typeof DELETE_TRANSACTION_SUCCESS;
  payload: Portfolio;
}

export type PortfolioActionTypes =
  | getPortfolioAction
  | createTransactionAction
  | updateTransactionAction
  | deleteTransactionAction;
