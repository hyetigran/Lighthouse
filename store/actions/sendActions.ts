import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { RootState } from "../index";
import {
  ADD_PRIVATE_KEY_SUCCESS,
  ADD_TO_ADDRESS_SUCCESS,
  Send,
  SendActionTypes,
} from "../types/sendTypes";

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
          utxo: {
            ...send.sendData.utxo,
            address: selectedWallet.address,
          },
          privateKey: selectedWallet.privateKey,
        },
      };
      dispatch(attachPrivateKey(updateSendState));
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
