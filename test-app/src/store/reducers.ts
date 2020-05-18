export type TAction = {
  type: string;
  payload?: any;
};

export const dataReducer = (
  state: string = "All students",
  action: TAction
) => {
  switch (action.type) {
    case "CHANGE_GROUP":
      return action.payload;
    default:
      return state;
  }
};

export const locationReducer = (state: string = "/", action: TAction) => {
  switch (action.type) {
    case "CHANGE_LOCATION":
      return action.payload;
    default:
      return state;
  }
};

export const setCurrentUser = (state: any = "", action: TAction) => {
  switch (action.type) {
    case "CURRENT_USER_INFO":
      return action.payload;
    default:
      return state;
  }
};

export const currentExamInfo = (state: any = {}, action: TAction) => {
  switch (action.type) {
    case "CURRENT_EXAM_INFO":
      return action.payload;
    default:
      return state;
  }
};

export const currentStudentExams = (state: any = [], action: TAction) => {
  switch (action.type) {
    case "CURRENT_STUDENT_EXAMS":
      return action.payload;
    default:
      return state;
  }
};

export const allStudents = (state: any = [], action: TAction) => {
  switch (action.type) {
    case "ALL_STUDENTS":
      return action.payload;
    default:
      return state;
  }
};
