import {
  CREATE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_SUCCESS,
  FETCH_PORTFOLIO_SUCCESS,
  UPDATE_TRANSACTION_SUCCESS,
  PortfolioActionTypes,
  Portfolio
} from "../types/portfolioTypes";

const initialState: Portfolio = {
  portfolioCoins: [],
  portfolioName: "",
  portfolioId: "",
}
export const portfolioReducer = (
  state = initialState,
  action: PortfolioActionTypes
): Portfolio => {
  switch (action.type) {
    case FETCH_PORTFOLIO_SUCCESS:
      return { ...action.payload };
    case CREATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        portfolioCoins: action.payload,
      };
    case UPDATE_TRANSACTION_SUCCESS:
      return state;
    case DELETE_TRANSACTION_SUCCESS:
      return {
        ...state,
        portfolioCoins: action.payload
      };
    default:
      return state;
  }
};
