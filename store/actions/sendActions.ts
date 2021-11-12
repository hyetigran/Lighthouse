import { ADD_TO_ADDRESS_SUCCESS, SendActionTypes } from "../types/sendTypes";

export const updateToAddress = (value: string): SendActionTypes => {
  return {
    type: ADD_TO_ADDRESS_SUCCESS,
    payload: value,
  };
};
