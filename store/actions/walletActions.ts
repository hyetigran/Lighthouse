import axios from "axios";
import { Action } from "redux";
import { RootState } from "../index";
import { ThunkAction } from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    FETCH_WALLETS_SUCCESS, WalletActionTypes, Wallets
} from "../types/walletTypes";

export const thunkGetAllWallets = (): ThunkAction<
    void,
    RootState,
    unknown,
    Action<string>
> => async (dispatch) => {
    try {


    } catch (error) {
        console.log("err", error);
    }
};

const fetchAllCurrencies = (allWallets: Wallets): WalletActionTypes => {
    return {
        type: FETCH_WALLETS_SUCCESS,
        payload: allWallets,
    };
};
