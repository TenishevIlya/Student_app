import { createStore, combineReducers } from "redux";
import { dataReducer, locationReducer, setCurrentUser } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  data: dataReducer,
  prevLocation: locationReducer,
  currentUser: setCurrentUser,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
