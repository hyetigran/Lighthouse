export const ADD_TO_ADDRESS_SUCCESS = "ADD_TO_ADDRESS_SUCCESS";
export const ADD_PRIVATE_KEY_SUCCESS = "ADD_PRIVATE_KEY_SUCCESS";
export const ADD_UTXO_SUCCESS = "ADD_UTXO_SUCCESS";
export const BROADCAST_TRANSACTION_SUCCESS = "BROADCAST_TRANSACTION_SUCCESS";
export const ADD_TO_COIN_SUCCESS = "ADD_TO_COIN_SUCCESS";

export interface Send {
  [key: string]: any;
  sendData: SendData;
  name: string;
  symbol: string;
  balance: number;
}
export interface utxoData {
  txId: string;
  outputIndex?: number | null;
  address: string;
  script: string;
  satoshis: number;
  inspect: string;
  toObject: string;
}
export interface SendData {
  utxos: utxoData[];
  to: {
    address: string;
    satoshis: number;
  };
  from: {
    address: string;
  };
  privateKey: any;
  fee: number;
}

interface addToAddressAction {
  type: typeof ADD_TO_ADDRESS_SUCCESS;
  payload: string;
}

interface addPrivateKeyAction {
  type: typeof ADD_PRIVATE_KEY_SUCCESS;
  payload: Send;
}

interface addUTXOAction {
  type: typeof ADD_UTXO_SUCCESS;
  payload: utxoData[];
}

interface broadcastTransactionAction {
  type: typeof BROADCAST_TRANSACTION_SUCCESS;
  payload: string;
}

interface addToCoinAction {
  type: typeof ADD_TO_COIN_SUCCESS;
  payload: number;
}

export type SendActionTypes =
  | addToAddressAction
  | addPrivateKeyAction
  | addUTXOAction
  | broadcastTransactionAction
  | addToCoinAction;
