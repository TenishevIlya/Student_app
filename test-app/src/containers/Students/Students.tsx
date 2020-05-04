import { Table } from "react-bootstrap";
import React, { Component } from "react";
import { IStudentProps, IStudentState } from "./Students.type";
import RowComponent from "../../components/RowComponent/RowComponent";
import { add4 } from "../../utils/add4";
import { setDirectionName } from "../../utils/setDirectionName";

import { formatDate } from "../../utils/formatDate";
import { useHistory } from "react-router-dom";

class Students extends Component<IStudentProps, IStudentState> {
  constructor(props: any) {
    super(props);

    this.state = {
      students: [],
      currentGroup: 0,
      currentGroupUsers: [],
      showCertainGroup: false,
      counter: 0,
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     students: this.props.allStudents.concat(this.props.graduated),
  //   });
  //   this.setState({ showCertainGroup: this.props.flag });
  //   //document.location.reload(true);
  // }

  // componentDidUpdate() {
  //   console.log(this.props.allStudents);
  // }

  // componentDidUpdate() {
  //   //if (history.location.pathname === "/") {
  //   fetch("http://localhost:9000/api/data")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       //window.location.reload();
  //       //setAllStudents(data);
  //     });
  //   //}
  // }

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
            </tr>
          </thead>
          <tbody>
            {this.props.allStudents !== undefined
              ? this.props.allStudents.map((student: any) => {
                  const directionName = setDirectionName(
                    student.Direction_code
                  );
                  const ticketIssueDate = formatDate(
                    student.Date_of_issue_of_student_ticket
                  );
                  const birthDate = formatDate(student.Date_of_birth);
                  const yearDifference =
                    new Date().getFullYear() -
                    student.Date_of_issue_of_student_ticket.slice(0, 4);
                  const fullGroupNumber =
                    yearDifference > 4
                      ? `4${student.Group_number}`
                      : `${yearDifference}${student.Group_number}`;
                  return (
                    <RowComponent
                      key={student.Id}
                      numberOfGroup={`${fullGroupNumber}`}
                      directionCode={directionName}
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
            {/* {this.props.users !== undefined &&
            this.props.graduatedFromCurrentGroup !== undefined
              ? this.props.users
                  .concat(this.props.graduatedFromCurrentGroup)
                  .map((student: any, index: any) => {
                    //console.log(1);
                    if (student.Course_number === undefined) {
                      student.Course_number = add4(student.Course_number);
                    }
                    if (
                      Number(student.Course_number) !==
                        this.props.users[0].Course_number &&
                      index ===
                        this.props.users.concat(
                          this.props.graduatedFromCurrentGroup
                        ).length -
                          1
                    ) {
                      return null;
                    }
                    student.Course_number = add4(student.Course_number);
                    const birthDate = formatDate(student.Date_of_birth);
                    const ticketIssueDate = formatDate(
                      student.Date_of_issue_of_student_ticket
                    );
                    const directionName = setDirectionName(
                      student.Direction_code
                    );
                    return (
                      <RowComponent
                        key={student.Id}
                        numberOfGroup={`${student.Course_number}${student.Group_number}`}
                        directionCode={directionName}
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
              : this.state.students.map((student: any) => {
                  student.Course_number = add4(student.Course_number);
                  const birthDate = formatDate(student.Date_of_birth);
                  const ticketIssueDate = formatDate(
                    student.Date_of_issue_of_student_ticket
                  );
                  const directionName = setDirectionName(
                    student.Direction_code
                  );
                  return (
                    <RowComponent
                      key={student.Id}
                      numberOfGroup={`${student.Course_number}${student.Group_number}`}
                      directionCode={directionName}
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
                })} */}
          </tbody>
        </Table>
      </div>
    );
  }
}

// const StudentsWrapper = (props: any) => {
//   return <Students {...props} />;
// };

export default Students;
