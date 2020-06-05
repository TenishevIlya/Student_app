export interface IAddExamState {
  allCourses: TCourse[];
  allGroups: TGroup[];
  allSurnames: TSurname[];
  currentCourse: number;
  currentGroup: string;
  ableToContinue: boolean;
  currentSurname: string;
  allGroupsDirectionsCodes: TDirectionsCodes[];
  currentGroupDirectionCode: string;
  examNames: TExamNames[];
  isAMark: boolean;
  dateOfExam: string;
  subjectId: number;
  studentSurname: string;
  points: string;
  mark: string;
  error: string;
  success: boolean;
  pointsError: string;
  examsCourseList: any;
  examsCourse: any;
}

export type TCourse = {
  Course_number: number;
};

export type TGroup = {
  Group_number: string;
};

export type TSurname = {
  Surname: string;
  Name: string;
};

export type TExamNames = {
  Name: string;
  Id: number;
  Number_of_course: string | number;
};

export type TDirectionsCodes = {
  Direction_code: string;
  Group_number: string;
};

export type TExamData = {
  date: string;
  subjectId: number;
  studentSurname: string;
  points: string;
  mark: string;
};
