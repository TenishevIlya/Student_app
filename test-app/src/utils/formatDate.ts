export const formatDate = (value: string) => {
  const initialDate = new Date(value);
  return `${addZeroOrNot(initialDate.getDate())}.${addZeroOrNot(
    initialDate.getMonth() + 1
  )}.${initialDate.getFullYear()}`;
};

export const addZeroOrNot = (value: number) => {
  return value < 10 ? `0${value}` : `${value}`;
};
