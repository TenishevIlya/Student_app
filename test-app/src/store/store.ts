import { createStore, combineReducers } from "redux";
import { dataReducer, locationReducer } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  data: dataReducer,
  prevLocation: locationReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
