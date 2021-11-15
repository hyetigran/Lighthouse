import {
  Send,
  SendActionTypes,
  ADD_TO_ADDRESS_SUCCESS,
  ADD_PRIVATE_KEY_SUCCESS,
} from "../types/sendTypes";

const initialState: Send = {
  name: "",
  symbol: "",
  balance: 0,
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
    case ADD_PRIVATE_KEY_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
