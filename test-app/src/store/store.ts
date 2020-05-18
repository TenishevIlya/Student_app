import { createStore, combineReducers } from "redux";
import {
  dataReducer,
  locationReducer,
  setCurrentUser,
  currentExamInfo,
  currentStudentExams,
  allStudents,
} from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  students: allStudents,
  data: dataReducer,
  prevLocation: locationReducer,
  currentUser: setCurrentUser,
  currentExam: currentExamInfo,
  studentExams: currentStudentExams,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
