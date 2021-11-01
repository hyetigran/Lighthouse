import axios from "axios";
import bitcore from "bitcore-lib-cash";
import { Action } from "redux";
import { RootState } from "../index";
import { ThunkAction } from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
import { BCH_FULLSTACK_API_URL } from "@env";
import {
  CREATE_WALLET_SUCCESS,
  FETCH_WALLETS_SUCCESS,
  Wallet,
  WalletActionTypes,
  Wallets,
} from "../types/walletTypes";

let FULLSTACK_URL = BCH_FULLSTACK_API_URL;
if (__DEV__) {
  // example: https://tapi.fullstack.cash/v4/
  FULLSTACK_URL = BCH_FULLSTACK_API_URL.replace("api", "tapi");
}

export const thunkGetAllWallets =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      let wallets = await AsyncStorage.getItem("wallets");
      let loadedWallets: Wallets[] = [];

      if (wallets === null) {
        // CREATE DEFAULT WALLET
        const privateKey = new bitcore.PrivateKey("testnet");
        const privateKeyWIF = privateKey.toWIF();
        const newWallet = {
          walletsData: [
            {
              privateKeyWIF,
              isBacked: false,
              name: "Personal Wallet",
              addressString: privateKey.toAddress().toString(),
              balance: 0,
            },
          ],
          name: "Bitcoin Cash (BCH)",
          logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png",
          symbol: "BCH",
          coinId: 1831,
        };
        loadedWallets.push(newWallet);
        // SAVE WALLETS w/ PrivateKey WIF only
        await AsyncStorage.setItem("wallets", JSON.stringify(loadedWallets));
        // ADD PRIVATE KEY TO STATE
        loadedWallets[0].walletsData[0].privateKey = privateKey;
      } else {
        // ADD PRIVATE KEY OBJECT TO WALLETS
        loadedWallets = JSON.parse(wallets).map((wallets: Wallets) => {
          return {
            ...wallets,
            walletsData: wallets.walletsData.map((w: Wallet) => {
              // FETCH BALANCES
              //  const balance = fetchBalance(w.addressString) || 0;
              return {
                ...w,
                // TODO - temporary
                balance: 0,
                privateKey: bitcore.PrivateKey.fromWIF(w.privateKeyWIF),
              };
            }),
          };
        });
      }
      dispatch(fetchAllWallets(loadedWallets));
    } catch (error) {
      console.log("err", error);
    }
  };

const fetchBalance = async (addressString: string) => {
  try {
    // let result = await axios.get(
    //   `${FULLSTACK_URL}electrumx/balance/${addressString}`
    // );
    // TODO - Multiple addresses
    // result = axios.post(`${FULLSTACK_URL}electrumx/balance`, {
    //   addresses: addresses,
    // });
    // TEMP RETURN
    return 0;
  } catch (error) {
    console.log("fetchBalance err", error);
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
      let updatedWallets: Wallets;

      // ENSURE PROPER LIBRARY IS USED
      // BCH BY DEFAULT
      const privateKey = new bitcore.PrivateKey("testnet");
      const privateKeyWIF = privateKey.toWIF();

      // CREATE WALLET
      if (coinExists === undefined) {
        updatedWallets = {
          walletsData: [
            {
              privateKeyWIF,
              isBacked: false,
              name: name,
              addressString: privateKey.toAddress().toString(),
              balance: 0,
            },
          ],
          name: "Bitcoin Cash (BCH)",
          logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png",
          symbol: coin,
          coinId: 1831,
        };
      } else {
        // ADD to walletsData of existing WALLET
        updatedWallets = {
          ...coinExists,
          walletsData: [
            ...coinExists.walletsData,
            {
              privateKeyWIF,
              isBacked: false,
              name: name,
              addressString: privateKey.toAddress().toString(),
              balance: 0,
            },
          ],
        };
      }
      // PERSIST TO LOCAL STORAGE
      const localWallets = await AsyncStorage.getItem("wallets");

      const updatedLocalWallets = JSON.parse(localWallets!).map(
        (wallet: Wallets) => {
          if (wallet.symbol === coin) {
            wallet = updatedWallets;
          }
          return wallet;
        }
      );
      await AsyncStorage.setItem(
        "wallets",
        JSON.stringify(updatedLocalWallets)
      );

      // DISPATCH
      dispatch(createWallet(updatedWallets));
    } catch (error) {
      console.log(error);
    }
  };

const createWallet = (updatedWallets: Wallets) => {
  return {
    type: CREATE_WALLET_SUCCESS,
    payload: updatedWallets,
  };
};
