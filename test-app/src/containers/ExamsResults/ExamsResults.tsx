import React, { Component, useEffect, useState } from "react";
import store from "../../store/store";
import { Table } from "react-bootstrap";
import ExamRowComponent from "../../components/ExamRowComponent/ExamRowComponent";
import { IExamsResultsProps, IExamsResultsState } from "./ExamsResults.type";
import { connect } from "react-redux";

import { formatDate } from "../../utils/formatDate";
import { calculateCourse } from "../../utils/calculateCourse";
import { CURRENT_USER_INFO, CURRENT_STUDENT_EXAMS } from "../../store/actions";

const ExamsResults: React.FC<{}> = () => {
  const [allExamsInfo, setAllExamsInfo] = useState([]);

  useEffect(() => {
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
        store.dispatch(CURRENT_STUDENT_EXAMS(data));
        setAllExamsInfo(data);
      });
  });

  useEffect(() => {
    store.subscribe(() => {
      setAllExamsInfo(store.getState().studentExams);
    });
  });

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
        {allExamsInfo !== undefined
          ? allExamsInfo.map((exam: any) => {
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
};

export default ExamsResults;
