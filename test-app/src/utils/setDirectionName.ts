export type TDirection = {
  Name: string;
  Code_of_direction: string;
};

export const setDirectionName = (code: string, allDirections: TDirection[]) => {
  for (let i = 0; i < allDirections.length; i++) {
    if (code === allDirections[i].Code_of_direction) {
      return allDirections[i].Name;
    }
  }
};
