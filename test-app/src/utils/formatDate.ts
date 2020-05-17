export const formatDate = (value: string) => {
  const initialDate = new Date(value);
  return `${addZeroOrNot(initialDate.getDate())}.${addZeroOrNot(
    initialDate.getMonth() + 1
  )}.${initialDate.getFullYear()}`;
};

export const backFormateDate = (value: string) => {
  const allPartsOfDate = value.split(".");
  return `${allPartsOfDate[2]}-${allPartsOfDate[1]}-${allPartsOfDate[0]}`;
};

export const addZeroOrNot = (value: number) => {
  return value < 10 ? `0${value}` : `${value}`;
};
