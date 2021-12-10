import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import axios from "axios";
import bitcore from "bitcore-lib-cash";
//@ts-ignore
import { BCH_FULLSTACK_API_URL } from "@env";

import { RootState } from "../index";
import {
  ADD_PRIVATE_KEY_SUCCESS,
  ADD_TO_ADDRESS_SUCCESS,
  ADD_UTXO_SUCCESS,
  BROADCAST_TRANSACTION_SUCCESS,
  ADD_RAW_SEND_SUCCESS,
  Send,
  SendActionTypes,
  SendData,
  RESET_TRANSACTION_SUCCESS,
} from "../types/sendTypes";
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
            logo: wall.logo,
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
        logo: selectedWallet.logo,
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
      const { data } = await axios.get(
        `${BCH_FULLSTACK_API_URL}/address/utxo/${address}`
      );

      const modifiedUTXOs = data.utxos.map((utxo: any) => {
        return {
          ...utxo,
          txId: utxo.txid,
          scriptPubKey: data.scriptPubKey,
        };
      });

      dispatch(getUTXO(modifiedUTXOs));
    } catch (error) {
      console.log(error);
    }
  };

const getUTXO = (utxos: any[]) => {
  return {
    type: ADD_UTXO_SUCCESS,
    payload: utxos,
  };
};

export const thunkCreateSend =
  (coin: number): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch, getState) => {
    try {
      const {
        send: { sendData },
      } = getState();
      const { utxos, to, privateKey, from } = sendData;

      const balance: number = utxos.reduce(
        (acc, cur) => (acc += cur.satoshis),
        0
      );
      const fee1 = estimateTransactionBytes(utxos.length, 1); // 1 * sat / bytes
      const fee2 = estimateTransactionBytes(utxos.length, 2); // 1 * sat / bytes

      if (coin < BCH_DUST_LIMIT) {
        throw new Error("Output amount below dust limit.");
      }

      if (balance - coin < fee1) {
        throw new Error("Insufficient balance.");
      }

      let transaction = new bitcore.Transaction();

      transaction = transaction.from(utxos);
      let fee;
      if (balance - coin - fee2 < BCH_DUST_LIMIT) {
        // SENDING MAX AMOUNT
        transaction = transaction.to(to.address, coin);
        // AMOUNT LEFT
        fee = balance - coin;
      } else {
        if (to.address === from.address) {
          // SENDING AMOUNT BACK TO SAME ADDRESS
          transaction = transaction.to(to.address, balance - fee1);
          fee = fee1;
        } else {
          // SENDING TO CHANGE BACK
          transaction = transaction.to(to.address, coin);
          transaction = transaction.to(from.address, balance - coin - fee2);
          fee = fee2;
        }
      }
      transaction = transaction.sign(privateKey);

      // opts allows to skip certain tests
      const rawTransaction = transaction.checkedSerialize({});
      const payload = {
        ...sendData,
        to: {
          ...sendData.to,
          satoshis: coin,
        },
        rawTransaction,
        fee,
      };
      dispatch(createSend(payload));
    } catch (error) {
      console.log("error", error);
    }
  };

const createSend = (payload: SendData): SendActionTypes => {
  return {
    type: ADD_RAW_SEND_SUCCESS,
    payload,
  };
};

export const thunkBroadcastTransaction =
  (navigate: any): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch, getState) => {
    try {
      const {
        send: {
          sendData: { rawTransaction },
        },
      } = getState();

      const { data, status }: any = await axios.get(
        `${BCH_FULLSTACK_API_URL}/rawtransactions/sendRawTransaction/${rawTransaction}`
      );

      if (data.match(/^"[0-9a-fA-F]{64"$/) === null) {
        throw new Error(
          "Broadcasting transaction failed with error: " + status
        );
      }
      // TODO - RESULT TXID URL TO BLOCKCHAIN
      dispatch(broadcastTransaction());
      navigate("SuccessTransactionScreen");
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

// NOT CURRENTLY INVOKED
// export const addSendCrypto = (coin: number): SendActionTypes => {
//   return {
//     type: ADD_TO_COIN_SUCCESS,
//     payload: coin,
//   };
// };

export const resetTransaction = () => {
  return {
    type: RESET_TRANSACTION_SUCCESS,
    payload: "",
  };
};
