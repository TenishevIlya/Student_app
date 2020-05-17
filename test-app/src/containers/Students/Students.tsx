import { Table } from "react-bootstrap";
import React, { Component } from "react";
import { IStudentProps, IStudentState, TStudent } from "./Students.type";
import RowComponent from "../../components/RowComponent/RowComponent";
import { setDirectionName } from "../../utils/setDirectionName";

import { formatDate } from "../../utils/formatDate";

class Students extends Component<IStudentProps, IStudentState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Номер группы</th>
              <th>Направление подготовки</th>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Отчество</th>
              <th>Пол</th>
              <th>Дата рождения</th>
              <th>Номер студенческого</th>
              <th>Дата выдачи студенческого</th>
              <th>Признак старосты</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {this.props.allStudents !== undefined
              ? this.props.allStudents.map((student: TStudent) => {
                  const directionName = setDirectionName(
                    student.Direction_code
                  );
                  const ticketIssueDate = formatDate(
                    student.Date_of_issue_of_student_ticket
                  );
                  const birthDate = formatDate(student.Date_of_birth);
                  const yearDifference =
                    new Date().getFullYear() -
                    Number(student.Date_of_issue_of_student_ticket.slice(0, 4));
                  let fullGroupNumber = "";
                  if (
                    new Date().getMonth() >= 8 &&
                    new Date().getMonth() <= 11
                  ) {
                    fullGroupNumber =
                      yearDifference >= 4
                        ? `4${student.Group_number}`
                        : `${yearDifference + 1}${student.Group_number}`;
                  } else {
                    fullGroupNumber =
                      yearDifference > 4
                        ? `4${student.Group_number}`
                        : `${yearDifference}${student.Group_number}`;
                  }
                  return (
                    <RowComponent
                      key={student.Id}
                      id={student.Id}
                      numberOfGroup={`${fullGroupNumber}`}
                      directionName={directionName}
                      directionCode={student.Direction_code}
                      surname={student.Surname}
                      name={student.Name}
                      patronymic={student.Patronymic}
                      gender={student.Gender}
                      dateOfBirth={birthDate}
                      numberOfStudentTicket={student.Number_of_student_ticket}
                      dateOfIssueOfStudentTicket={ticketIssueDate}
                      isAHeadOfGroup={student.Is_a_head_of_group}
                    />
                  );
                })
              : null}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Students;
