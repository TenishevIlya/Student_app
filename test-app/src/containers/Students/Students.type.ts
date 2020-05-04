export interface IStudentProps {
  allStudents: any;
  flag: boolean;
  users: any;
  graduated: any;
  graduatedFromCurrentGroup: any;
}
export interface IStudentState {
  students: any;
  currentGroup: number;
  currentGroupUsers: any;
  showCertainGroup: boolean;
  counter: number;
}
