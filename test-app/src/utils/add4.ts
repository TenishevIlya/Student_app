export const add4 = (value: undefined | null | string) => {
  return value === undefined || value === null ? (value = "4") : value;
};
