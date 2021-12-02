import {
  Send,
  SendActionTypes,
  ADD_TO_ADDRESS_SUCCESS,
  ADD_PRIVATE_KEY_SUCCESS,
  ADD_UTXO_SUCCESS,
  BROADCAST_TRANSACTION_SUCCESS,
  ADD_RAW_SEND_SUCCESS,
} from "../types/sendTypes";

const initialState: Send = {
  name: "",
  symbol: "",
  balance: 0,
  logo: "",
  sendData: {
    utxos: [],
    to: {
      address: "",
      satoshis: 0,
    },
    from: {
      address: "",
    },
    privateKey: null,
    fee: 0,
    rawTransaction: "",
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
    case ADD_UTXO_SUCCESS:
      return {
        ...state,
        sendData: {
          ...state.sendData,
          utxos: action.payload,
        },
      };
    case ADD_RAW_SEND_SUCCESS:
      console.log("reducer", action.payload);
      return {
        ...state,
        sendData: action.payload,
      };
    case BROADCAST_TRANSACTION_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
