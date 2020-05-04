import { createStore, combineReducers } from "redux";
import dataReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  data: dataReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
