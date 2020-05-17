export const calculateCourse = (dateOfIssue: string, dateOfExam: string) => {
  if (new Date(dateOfExam).getMonth() === 11) {
    return (
      new Date(dateOfExam).getFullYear() -
      new Date(dateOfIssue).getFullYear() +
      1
    );
  }
  return (
    new Date(dateOfExam).getFullYear() - new Date(dateOfIssue).getFullYear()
  );
};
