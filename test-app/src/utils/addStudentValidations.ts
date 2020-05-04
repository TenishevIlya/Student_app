export const isRussianLanguage = (value: string) => {
  let errors = 0;
  let convertToArray = Array.from(value);
  convertToArray.map((letter: string) => {
    if (letter.charCodeAt(0) < 1072 || letter.charCodeAt(0) > 1103) {
      errors++;
    }
  });
  return errors !== 0 ? `Поле должно состоять только из русских букв` : null;
};
