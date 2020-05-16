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

//export default { dataReducer, groupReducer };
