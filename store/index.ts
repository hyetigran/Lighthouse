import { combineReducers, applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { marketReducer } from "./reducers/marketReducer";
import { portfolioReducer } from "./reducers/portfolioReducer";
import { walletReducer } from "./reducers/walletReducer";
import { sendReducer } from "./reducers/sendReducer";

const rootReducer = combineReducers({
  market: marketReducer,
  portfolio: portfolioReducer,
  wallet: walletReducer,
  send: sendReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnchancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnchancer)
  );
  return store;
}
