export interface IStudentProps {
  allStudents: TStudent[] | undefined;
}
export interface IStudentState {}

export type TStudent = {
  Date_of_birth: string;
  Date_of_issue_of_student_ticket: string;
  Direction_code: string;
  Gender: string;
  Group_number: string;
  Id: number;
  Is_a_head_of_group: number;
  Name: string;
  Number_of_student_ticket: number;
  Patronymic: string;
  Surname: string;
};
