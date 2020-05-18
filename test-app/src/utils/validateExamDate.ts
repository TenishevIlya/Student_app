export const validateExamDate = (
  subjectCourse: number | string,
  studentCourse: number,
  date: any
) => {
  const difference = Number(studentCourse) - Number(subjectCourse);
  const currentYear = new Date().getFullYear();
  const startDate = new Date(`${currentYear - difference - 1}-12-15`);
  const endDate = new Date(`${currentYear - difference}-06-07`);
  if (new Date(date) <= endDate && new Date(date) >= startDate) {
    return "";
  } else {
    return `Дата экзамена должна находиться в диапазоне между ${startDate.getDate()}.0${
      startDate.getMonth() + 1
    }.${startDate.getFullYear()} and ${endDate.getDate()}.0${
      endDate.getMonth() + 2
    }.${endDate.getFullYear()}. Введите дату заново и повторите попытку.`;
  }
};
