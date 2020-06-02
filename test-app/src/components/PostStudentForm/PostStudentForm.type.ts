//export interface IPostStudentForm {}

export interface IPostStudentFormState {
  id?: number;
  groupNumbers: string[];
  surname: TFormField;
  name: TFormField;
  patronymic: TFormField;
  dateOfBirth: TFormField;
  gender: string;
  directionCode: TFormField;
  dateOfIssueOfStudentTicket: TFormField;
  numberOfStudentTicket: TFormField;
  groupNumber: TFormField;
  isAHeadOfGroup: number | null;
  ableToRedirect: boolean;
  checkHeadOfGroup: string;
}

export type TStudent = {
  key: number;
  surname: TFormField;
  name: TFormField;
  patronymic: TFormField;
  dateOfBirth: TFormField;
  gender: TFormField;
  directionCode: TFormField;
  dateOfIssueOfStudentTicket: TFormField;
  numberOfStudentTicket: TFormField;
  groupNumber: TFormField;
  isAHeadOfGroup: TFormField;
};

export interface IPostStudentFormProps {
  history?: any;
  submitBtnTitle: string;
}

export interface IPostStudentFormWrap {
  formTitle: string;
  submitBtnTitle: string;
  currentUser?: TStudent;
}

export type TTitles = {
  formTitle?: string;
  submitBtnTitle?: string;
};

export type TGroupNumber = {
  Course_number: number;
  Group_number: string;
};

export type TFormField = {
  value: string;
  error?: string;
};
