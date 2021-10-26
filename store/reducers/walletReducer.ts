import {
  FETCH_WALLETS_SUCCESS,
  CREATE_WALLET_SUCCESS,
  WalletActionTypes,
  Wallets,
} from "../types/walletTypes";

const initialState: Wallets[] = [];

export const walletReducer = (
  state = initialState,
  action: WalletActionTypes
): Wallets[] => {
  switch (action.type) {
    case FETCH_WALLETS_SUCCESS:
      return action.payload;
    case CREATE_WALLET_SUCCESS:
      // TODO...
      return [action.payload];

    default:
      return state;
  }
};
