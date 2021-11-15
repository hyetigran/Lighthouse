export const ADD_TO_ADDRESS_SUCCESS = "ADD_TO_ADDRESS_SUCCESS";
export const ADD_PRIVATE_KEY_SUCCESS = "ADD_PRIVATE_KEY_SUCCESS";

export interface Send {
  [key: string]: any;
  sendData: SendData;
  name: string;
  symbol: string;
  balance: number;
}
export interface SendData {
  utxo: {
    txId: string;
    outputIndex?: number | null;
    address: string;
    script: string;
    satoshis: number;
  };
  to: {
    address: string;
    satoshis: number;
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

export type SendActionTypes = addToAddressAction | addPrivateKeyAction;
