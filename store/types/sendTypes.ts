export const ADD_TO_ADDRESS_SUCCESS = "ADD_TO_ADDRESS_SUCCESS";

export interface Send {
  [key: string]: any;
  sendData: SendData;
  name: string;
  symbol: string;
}
export interface SendData {
  [key: string]: any;
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

export type SendActionTypes = addToAddressAction;
