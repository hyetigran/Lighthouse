import {
  Send,
  SendData,
  SendActionTypes,
  ADD_TO_ADDRESS_SUCCESS,
} from "../types/sendTypes";

const initialState: Send = {
  name: "",
  symbol: "",
  sendData: {
    utxo: {
      txId: "",
      outputIndex: null,
      address: "",
      script: "",
      satoshis: 0,
    },
    to: {
      address: "",
      satoshis: 0,
    },
    privateKey: null,
  },
};

export const sendReducer = (
  state = initialState,
  action: SendActionTypes
): Send => {
  switch (action.type) {
    case ADD_TO_ADDRESS_SUCCESS:
      return {
        ...state,
        sendData: {
          ...state.sendData,
          to: {
            ...state.sendData.to,
            address: action.payload,
          },
        },
      };
    default:
      return state;
  }
};
