import { combineReducers, applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { marketReducer } from "./reducers/marketReducer";
import { portfolioReducer } from "./reducers/portfolioReducer";

const rootReducer = combineReducers({
  market: marketReducer,
  portfolio: portfolioReducer
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
