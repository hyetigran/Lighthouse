export const ADD_TO_ADDRESS_SUCCESS = "ADD_TO_ADDRESS_SUCCESS";
export const ADD_PRIVATE_KEY_SUCCESS = "ADD_PRIVATE_KEY_SUCCESS";
export const ADD_UTXO_SUCCESS = "ADD_UTXO_SUCCESS";
export const BROADCAST_TRANSACTION_SUCCESS = "BROADCAST_TRANSACTION_SUCCESS";
export const ADD_RAW_SEND_SUCCESS = "ADD_RAW_SEND_SUCCESS";
export const RESET_TRANSACTION_SUCCESS = "RESET_TRANSACTION_SUCCESS";

export interface Send {
  [key: string]: any;
  sendData: SendData;
  name: string;
  symbol: string;
  balance: number;
  logo: string;
}
// export interface utxoData {
//   txId: string;
//   outputIndex?: number | null;
//   address: string;
//   script: string;
//   satoshis: number;
//   inspect: string;
//   toObject: string;
// }
export interface SendData {
  utxos: any[];
  to: {
    address: string;
    satoshis: number;
  };
  from: {
    address: string;
  };
  privateKey: any;
  fee: number;
  rawTransaction: string;
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
  payload: any[];
}

interface broadcastTransactionAction {
  type: typeof BROADCAST_TRANSACTION_SUCCESS;
  payload: string;
}

interface addRawTransactionAction {
  type: typeof ADD_RAW_SEND_SUCCESS;
  payload: SendData;
}

interface resetTransactionAction {
  type: typeof RESET_TRANSACTION_SUCCESS;
  payload: string;
}
export type SendActionTypes =
  | addToAddressAction
  | addPrivateKeyAction
  | addUTXOAction
  | broadcastTransactionAction
  | addRawTransactionAction
  | resetTransactionAction;
