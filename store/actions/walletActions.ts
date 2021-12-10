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
  FETCH_WALLET_DETAILS_SUCCESS,
  Transaction,
  Wallet,
  WalletActionTypes,
  Wallets,
} from "../types/walletTypes";
import { delay, roundNumber } from "../../helpers/utilities";

const FULLSTACK_URL = BCH_FULLSTACK_API_URL;
// if (__DEV__) {
//   // example: https://tapi.fullstack.cash/v4/
//   FULLSTACK_URL = BCH_FULLSTACK_API_URL.replace("api", "tapi");
// }

export const thunkGetAllWallets =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      let wallets = await AsyncStorage.getItem("wallets");
      let loadedWallets: Wallets[] = [];
      if (wallets === null) {
        // CREATE DEFAULT WALLET
        const privateKey = new bitcore.PrivateKey();
        const privateKeyWIF = privateKey.toWIF();
        const newWallet = {
          walletsData: [
            {
              privateKeyWIF,
              isBacked: false,
              name: "Personal Wallet",
              addressString: privateKey.toAddress().toString(),
              balance: 0,
              privateKey,
            },
          ],
          name: "Bitcoin Cash (BCH)",
          logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png",
          symbol: "BCH",
          coinId: 1831,
        };
        loadedWallets.push(newWallet);
        // PERSIST WALLETS LOCALLY
        await AsyncStorage.setItem("wallets", JSON.stringify(loadedWallets));
      } else {
        // ADD PRIVATE KEY OBJECT TO WALLETS
        const parsedWallets: Wallets = JSON.parse(wallets);
        for (let wIndex in parsedWallets) {
          let walletsData: Wallet[] = parsedWallets[wIndex].walletsData;
          for (let wdIndex in walletsData) {
            let balance = await fetchBalance(
              walletsData[wdIndex].addressString
            );
            await delay(1000);

            walletsData[wdIndex].balance = balance;
          }
          let loadedWalletGroup = {
            ...parsedWallets[wIndex],
            walletsData,
          };
          loadedWallets.push(loadedWalletGroup);
        }
      }
      dispatch(fetchAllWallets(loadedWallets));
    } catch (error) {
      console.log("err", error);
    }
  };

const fetchBalance = async (addressString: string) => {
  try {
    const {
      data: { balanceSat },
    } = await axios.get(`${FULLSTACK_URL}/address/details/${addressString}`);

    return balanceSat;
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
      const privateKey = new bitcore.PrivateKey();
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
              privateKey,
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
              privateKey,
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

export const thunkGetWalletDetails =
  (
    address: string,
    walletName: string,
    pId: string,
    coinId: number
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch, getState) => {
    try {
      const {
        data: { transactions },
      } = await axios.get(
        `${BCH_FULLSTACK_API_URL}/address/details/${address}`
      );
      // FREE BCH API, actorforth.org, ENFORCES 1 SECOND RATE LIMIT
      await delay(1000);

      const { data } = await axios.post(
        `${BCH_FULLSTACK_API_URL}/transaction/details`,
        { txids: transactions }
      );
      // GET CURRENT PRICE FROM MARKET STATE
      // TODO - refactor dynamic
      // TODO - feed price from detail screen as param
      const { price } = getState().market[0].find((coin) => coin.id === 1831)!;

      const formattedTransactions: Transaction[] = data.map((txn: any) => {
        // DETERMINE SENT or RECEIVED
        // inputs w/o selected 'address' are determined to be received
        // TODO - needs reworked when HD wallets
        const sent: boolean = !!txn.vin.filter(
          (input: any) => input.cashAddress === address
        ).length;

        // DETERMINE VALUE OF TRANSACTION
        const value: number = txn.vout.reduce((acc: number, output: any) => {
          if (sent && output.scriptPubKey.cashAddrs[0] !== address) {
            // Sending transactions - EXCLUDE output with own address
            acc += output.value;
          } else if (!sent && output.scriptPubKey.cashAddrs[0] === address) {
            // Receiving transactions - INCLUDE output with own address
            acc += output.value;
          }
          return acc;
        }, 0);

        return {
          id: txn.txid,
          fee: txn.fees,
          confirmations: txn.confirmations,
          date: txn.time,
          fiatValue: +roundNumber((value * price).toString(), 2),
          value,
          address,
          sent,
        };
      });
      const walletGroup = getState().wallet;

      let updatedWallets = walletGroup;
      for (let wallets of walletGroup) {
        if (wallets.coinId === coinId) {
          for (let wallet of wallets.walletsData) {
            if (wallet.name === walletName && wallet.privateKeyWIF === pId) {
              wallet.transactions = formattedTransactions;
            }
          }
        }
      }
      dispatch(getWalletDetails(updatedWallets));
    } catch (error) {
      console.log("Error", error);
    }
  };

const getWalletDetails = (payload: Wallets[]) => {
  return {
    type: FETCH_WALLET_DETAILS_SUCCESS,
    payload,
  };
};
