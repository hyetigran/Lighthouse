import {
  CREATE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_SUCCESS,
  FETCH_PORTFOLIO_SUCCESS,
  UPDATE_TRANSACTION_SUCCESS,
  PortfolioActionTypes,
} from "../types/portfolioTypes";

const initialState = {
  transactions: [
    {
      name: "Bitcoin",
      symbol: "BTC",
      amount: 1.007,
    },
  ],
};

export const marketReducer = (
  state = initialState,
  action: PortfolioActionTypes
) => {
  switch (action.type) {
    case FETCH_PORTFOLIO_SUCCESS:
      return state;
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
