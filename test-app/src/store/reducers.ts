export type TAction = {
  type: string;
  payload?: any;
};

const dataReducer = (state: any = [], action: TAction) => {
  switch (action.type) {
    case "CHANGED_DATA":
      return action.payload;
    default:
      return state;
  }
};

export default dataReducer;
