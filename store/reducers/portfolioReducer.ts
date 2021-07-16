import {
  CREATE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_SUCCESS,
  FETCH_PORTFOLIO_SUCCESS,
  UPDATE_TRANSACTION_SUCCESS,
  PortfolioActionTypes,
  PortfolioCoin,
  Portfolio
} from "../types/portfolioTypes";

const initialState = {
  portfolioCoins: [],
  portfolioName: "",
  portfolioId: "",
}
export const portfolioReducer = (
  state: Portfolio = initialState,
  action: PortfolioActionTypes
) => {
  switch (action.type) {
    case FETCH_PORTFOLIO_SUCCESS:
      return { ...action.payload };
    case CREATE_TRANSACTION_SUCCESS:
      const { transaction, coinId } = action.payload;
      const updatedCoins = state.portfolioCoins.map(coin => {
        if (coin.coinId === coinId) {
          const newCryptoTotal = coin.cryptoTotal + transaction.coinAmount
          return {
            ...coin,
            cryptoTotal: newCryptoTotal,
            fiatTotal: newCryptoTotal * coin.spotPrice!,
            transactions: [
              ...coin.transactions,
              transaction
            ]
          }
        }
        return coin;
      })

      return {
        ...state,
        portoflioCoins: updatedCoins,
      };
    case UPDATE_TRANSACTION_SUCCESS:
      return state;
    case DELETE_TRANSACTION_SUCCESS:
      return state;
    default:
      return state;
  }
};
