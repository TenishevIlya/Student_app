import React, { Component } from "react";
import store from "../../store/store";
import { Table } from "react-bootstrap";
import ExamRowComponent from "../../components/ExamRowComponent/ExamRowComponent";
import { IExamsResultsProps, IExamsResultsState } from "./ExamsResults.type";

import { formatDate } from "../../utils/formatDate";
import { calculateCourse } from "../../utils/calculateCourse";
import { CURRENT_USER_INFO } from "../../store/actions";

class ExamsResults extends Component<IExamsResultsProps, IExamsResultsState> {
  constructor(props: any) {
    super(props);

    this.state = {
      allExamsInfo: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:9000/getCurrentStudentExams", {
      method: "GET",
      headers: {
        id: `${store.getState().currentUser.id}`,
      },
      cache: "reload",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ allExamsInfo: data });
      });
  }

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Номер курса</th>
            <th>Название предмета</th>
            <th>Дата проведения экзамена</th>
            <th>Количество баллов</th>
            <th>Зачет/оценка</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {this.state.allExamsInfo !== undefined
            ? this.state.allExamsInfo.map((exam) => {
                const course = calculateCourse(
                  store.getState().currentUser.dateOfIssueOfStudentTicket,
                  exam.Date
                );
                return (
                  <ExamRowComponent
                    key={`${exam.Date}${exam.Name}`}
                    course={course}
                    name={exam.Name}
                    date={formatDate(exam.Date)}
                    points={exam.Points}
                    mark={exam.Mark}
                    studentId={exam.Student_id}
                    subjectId={exam.Subject_id}
                  />
                );
              })
            : null}
        </tbody>
      </Table>
    );
  }
}

export default ExamsResults;
