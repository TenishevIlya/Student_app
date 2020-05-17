export interface IExamsResultsProps {}

export interface IExamsResultsState {
  allExamsInfo: TExamInfo[];
}

export type TExamInfo = {
  Date: string;
  Points: number;
  Mark: string;
  Name: string;
  Student_id: number;
  Subject_id: number;
};
