export const ADD_TO_ADDRESS_SUCCESS = "ADD_TO_ADDRESS_SUCCESS";
export const ADD_PRIVATE_KEY_SUCCESS = "ADD_PRIVATE_KEY_SUCCESS";
export const ADD_UTXO_SUCESS = "ADD_UTXO_SUCESS";
export const BROADCAST_TRANSACTION_SUCCESS = "BROADCAST_TRANSACTION_SUCCESS";

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
  type: typeof ADD_UTXO_SUCESS;
  payload: utxoData[];
}

interface broadcastTransactionAction {
  type: typeof BROADCAST_TRANSACTION_SUCCESS;
  payload: string;
}

export type SendActionTypes =
  | addToAddressAction
  | addPrivateKeyAction
  | addUTXOAction
  | broadcastTransactionAction;