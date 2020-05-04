export const validatePoints = (value: string) => {
  if (Number(value) > 100 || Number(value) < 0) {
    return "Баллы должны быть в диапазоне от 0 до 100";
  } else {
    return "";
  }
};
