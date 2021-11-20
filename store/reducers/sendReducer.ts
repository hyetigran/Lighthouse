import {
  Send,
  SendActionTypes,
  ADD_TO_ADDRESS_SUCCESS,
  ADD_PRIVATE_KEY_SUCCESS,
  ADD_UTXO_SUCESS,
  BROADCAST_TRANSACTION_SUCCESS,
} from "../types/sendTypes";

const initialState: Send = {
  name: "",
  symbol: "",
  balance: 0,
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
    case ADD_UTXO_SUCESS:
      return {
        ...state,
        sendData: {
          ...state.sendData,
          utxos: action.payload,
        },
      };
    case BROADCAST_TRANSACTION_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
