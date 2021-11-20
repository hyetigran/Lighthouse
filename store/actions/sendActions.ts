import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import bitcore from "bitcore-lib-cash";
//@ts-ignore
import { BCH_FULLSTACK_API_URL } from "@env";

import { RootState } from "../index";
import {
  ADD_PRIVATE_KEY_SUCCESS,
  ADD_TO_ADDRESS_SUCCESS,
  ADD_UTXO_SUCESS,
  BROADCAST_TRANSACTION_SUCCESS,
  Send,
  SendActionTypes,
  utxoData,
} from "../types/sendTypes";
import axios from "axios";
import { BCH_DUST_LIMIT } from "../../constants/Variables";
import { estimateTransactionBytes } from "../../helpers/utilities";

export const updateToAddress = (value: string): SendActionTypes => {
  return {
    type: ADD_TO_ADDRESS_SUCCESS,
    payload: value,
  };
};

export const thunkAttachPrivateKey =
  (pkWIF: string): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch, getState) => {
    try {
      const { send, wallet } = getState();
      // Find selected Wallet
      let selectedWallet: any;
      for (let i = 0; i < wallet.length; i++) {
        let wall = wallet[i];
        let filteredWall = wall.walletsData.filter(
          (w) => w.privateKeyWIF === pkWIF
        );
        if (filteredWall.length) {
          selectedWallet = {
            name: wall.name,
            symbol: wall.symbol,
            address: filteredWall[0].addressString,
            privateKey: filteredWall[0].privateKey,
            balance: filteredWall[0].balance,
          };
        }
      }
      // Attach PK object, Name, Symbol, from Address
      let updateSendState = {
        ...send,
        name: selectedWallet.name,
        symbol: selectedWallet.symbol,
        balance: selectedWallet.balance,
        sendData: {
          ...send.sendData,
          from: { address: selectedWallet.address },
          privateKey: selectedWallet.privateKey,
        },
      };
      dispatch(attachPrivateKey(updateSendState));
      dispatch(thunkGetUTXO(updateSendState.sendData.from.address));
    } catch (error) {
      console.log("Err", error);
    }
  };

const attachPrivateKey = (sendState: Send): SendActionTypes => {
  return {
    type: ADD_PRIVATE_KEY_SUCCESS,
    payload: sendState,
  };
};

export const thunkGetUTXO =
  (address: string): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      const utxos: utxoData = await axios.get(
        `${BCH_FULLSTACK_API_URL}/electrumx/unconfirmed/${address}`
      );
      dispatch(getUTXO(utxos));
    } catch (error) {
      console.log(error);
    }
  };

const getUTXO = (utxos: utxoData) => {
  return {
    type: ADD_UTXO_SUCESS,
    payload: utxos,
  };
};

export const thunkBroadcastTransaction =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch, getState) => {
    try {
      const {
        send: {
          sendData: { utxos, to, privateKey, from },
        },
      } = getState();
      const balance = utxos.reduce((acc, cur) => (acc += cur.satoshis), 0);
      const fee1 = estimateTransactionBytes(utxos.length, 1); // 1 * sat / bytes
      const fee2 = estimateTransactionBytes(utxos.length, 2); // 1 * sat / bytes

      if (to.satoshis < BCH_DUST_LIMIT) {
        throw new Error("Output amount below dust limit.");
      }

      if (balance - to.satoshis - fee1 < BCH_DUST_LIMIT) {
        throw new Error("Insufficient balance.");
      }

      let transaction = new bitcore.Transaction();
      //@ts-ignore
      transaction = transaction.from(utxos);

      if (balance - to.satoshis - fee2 < BCH_DUST_LIMIT) {
        transaction = transaction.to(to.address, to.satoshis);
      } else {
        if (to.address === from.address) {
          transaction = transaction.to(to.address, balance - fee1);
        } else {
          transaction = transaction.to(to.address, to.satoshis);
          transaction = transaction.to(
            from.address,
            balance - to.satoshis - fee1
          );
        }
      }
      transaction = transaction.sign(privateKey);

      // opts allows to skip certain tests
      const rawTransaction = transaction.checkedSerialize({});

      const result: string = await axios.post(
        `${BCH_FULLSTACK_API_URL}/electrumx/tx/broadcast`,
        { txHex: rawTransaction }
      );
      if (result.match(/^"[0-9a-fA-F]{64"$/) === null) {
        throw new Error(
          "Broadcasting transaction failed with error: " + result
        );
      }
      dispatch(broadcastTransaction());
    } catch (error) {
      console.log(error);
    }
  };

const broadcastTransaction = () => {
  return {
    type: BROADCAST_TRANSACTION_SUCCESS,
    payload: "",
  };
};
