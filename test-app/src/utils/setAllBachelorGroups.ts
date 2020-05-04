export const setAllBachelorGroups = (
  groupNumbers: string[],
  groups: string[]
) => {
  groupNumbers.forEach((group: any) => {
    for (let i = 1; i <= 4; i++) {
      groups.push(`${i}${group.Group_number}`);
    }
  });
};
