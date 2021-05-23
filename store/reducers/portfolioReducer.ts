import {
  CREATE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_SUCCESS,
  FETCH_PORTFOLIO_SUCCESS,
  UPDATE_TRANSACTION_SUCCESS,
  PortfolioActionTypes,
  PortfolioCoin
} from "../types/portfolioTypes";


export const portfolioReducer = (
  state: PortfolioCoin[] | never[] = [],
  action: PortfolioActionTypes
) => {
  switch (action.type) {
    case FETCH_PORTFOLIO_SUCCESS:
      return [...action.payload];
    case CREATE_TRANSACTION_SUCCESS:
      return state;
    case UPDATE_TRANSACTION_SUCCESS:
      return state;
    case DELETE_TRANSACTION_SUCCESS:
      return state;
    default:
      return state;
  }
};
