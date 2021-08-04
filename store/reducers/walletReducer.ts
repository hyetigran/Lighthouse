import {
    FETCH_WALLETS_SUCCESS,
    CREATE_WALLET_SUCCESS,
    WalletActionTypes,
    Wallets
} from "../types/walletTypes";

const initialState = {};

export const walletReducer = (
    state = initialState,
    action: WalletActionTypes
) => {
    switch (action.type) {
        case FETCH_WALLETS_SUCCESS:
            return { ...state, ...action.payload };
        case CREATE_WALLET_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};