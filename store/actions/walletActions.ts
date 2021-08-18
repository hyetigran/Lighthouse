import axios from "axios";
// import bitcore from "bitcore-lib-cash";
import { Action } from "redux";
import { RootState } from "../index";
import { ThunkAction } from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CREATE_WALLET_SUCCESS,
  FETCH_WALLETS_SUCCESS,
  Wallet,
  WalletActionTypes,
  Wallets,
} from "../types/walletTypes";

export const thunkGetAllWallets =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      //   const wallets = await AsyncStorage.getItem("wallets");
      //   let loadedWallets: Wallets[] = [];
      //   if (wallets === null) {
      //     // CREATE DEFAULT WALLET
      //     const privateKey = new bitcore.PrivateKey("testnet");
      //     const privateKeyWIF = privateKey.toWIF();
      //     const newWallet = {
      //       walletsData: [
      //         {
      //           privateKeyWIF,
      //           isBacked: false,
      //           name: "Personal Wallet",
      //         },
      //       ],
      //       name: "Bitcoin Cash (BCH)",
      //       logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png",
      //       symbol: "BCH",
      //       coinId: 1831,
      //     };
      //     loadedWallets.push(newWallet);
      //     // SAVE WALLETS w/ PrivateKey WIF only
      //     await AsyncStorage.setItem("wallets", JSON.stringify(loadedWallets));
      //     // ADD PRIVATE KEY TO STATE
      //     loadedWallets[0].walletsData[0].privateKey = privateKey;
      //   } else {
      //     // ADD PRIVATE KEY OBJECT TO WALLETS
      //     loadedWallets = JSON.parse(wallets).map((wallets: Wallets) => {
      //       return {
      //         ...wallets,
      //         walletsData: wallets.walletsData.map((w: Wallet) => {
      //           return {
      //             ...w,
      //             privateKey: bitcore.PrivateKey.fromWIF(w.privateKeyWIF),
      //           };
      //         }),
      //       };
      //     });
      //   }
      //   dispatch(fetchAllWallets(loadedWallets));
    } catch (error) {
      console.log("err", error);
    }
  };

const fetchAllWallets = (allWallets: Wallets[]): WalletActionTypes => {
  return {
    type: FETCH_WALLETS_SUCCESS,
    payload: allWallets,
  };
};

export const thunkCreateWallet =
  (
    coin: string,
    name: string
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch, getState) => {
    try {
      // GET WALLET STATE
      const wallets = getState().wallet;

      // CHECK COIN EXISTS
      const coinExists = wallets.find((wallet) => wallet.symbol === coin);

      // CREATE WALLET
      if (coinExists === undefined) {
        //     ENSURE PROPER LIBRARY IS USED
        //     const privateKey = new bitcore.PrivateKey("testnet");
        //     const privateKeyWIF = privateKey.toWIF();
        //     const newWallet = {
        //       walletsData: [
        //         {
        //           privateKeyWIF,
        //           isBacked: false,
        //           name: name,
        //         },
        //       ],
        //       name: "Bitcoin Cash (BCH)",
        //       logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png",
        //       symbol: coin,
        //       coinId: 1831,
        //     };
      } else {
        // ADD to walletsData of existing WALLET
      }
      // PERSIST TO LOCAL STORAGE
      // DISPATCH
      dispatch(createWallet(updatedWallets));
    } catch (error) {
      console.log(error);
    }
  };

const createWallet = (updatedWallets) => {
  return {
    type: CREATE_WALLET_SUCCESS,
    payload: updatedWallets,
  };
};
