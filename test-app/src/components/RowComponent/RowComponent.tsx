import React, { Component, useState } from "react";
import { IRowComponentProps, IRowComponentState } from "./RowComponent.type";
import { Dropdown, DropdownButton, Modal, Button } from "react-bootstrap";
import "./RowComponent.style.css";
import { Link } from "react-router-dom";
import store from "../../store/store";
import {
  CURRENT_USER_INFO,
  CHANGE_GROUP,
  ALL_STUDENTS,
} from "../../store/actions";

const Delete = () => {
  const [show, setShow] = useState(false);

  const deleteExam = () => {
    let deleteIndex = null;

    let dbSubjectDeleteIndex = 0;
    let dbStudentDeleteIndex = 0;

    store.dispatch(CHANGE_GROUP("All students"));
    console.log(store.getState().currentUser.id);
    fetch("http://localhost:9000/api/deleteStudent", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      cache: "reload",
      body: JSON.stringify({
        id: store.getState().currentUser.id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {});
    fetch("http://localhost:9000/api/deleteExamsForCurrentStudent", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      cache: "reload",
      body: JSON.stringify({
        id: store.getState().currentUser.id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {});
    window.location.reload();
    setShow(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Dropdown.Item onClick={handleShow}>Удалить</Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Удаление данных о студенте?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Удалить информацию об этом студенте?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={deleteExam}>
            Назад
          </Button>
          <Button variant="primary" onClick={deleteExam}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

class RowComponent extends Component<IRowComponentProps, IRowComponentState> {
  render() {
    const currentUserInfo = {
      id: this.props.id,
      groupNumber: this.props.numberOfGroup,
      directionCode: this.props.directionCode,
      surname: this.props.surname,
      name: this.props.name,
      patronymic: this.props.patronymic,
      gender: this.props.gender,
      dateOfBirth: this.props.dateOfBirth,
      numberOfStudentTicket: this.props.numberOfStudentTicket,
      dateOfIssueOfStudentTicket: this.props.dateOfIssueOfStudentTicket,
      isAHeadOfGroup: this.props.isAHeadOfGroup,
    };
    return (
      <tr>
        <td>{this.props.numberOfGroup}</td>
        <td>{this.props.directionName}</td>
        <td>{this.props.surname}</td>
        <td>{this.props.name}</td>
        <td>{this.props.patronymic}</td>
        <td>{this.props.gender}</td>
        <td>{this.props.dateOfBirth}</td>
        <td>{this.props.numberOfStudentTicket}</td>
        <td>{this.props.dateOfIssueOfStudentTicket}</td>
        <td>{this.props.isAHeadOfGroup}</td>
        <td>
          <DropdownButton
            id="dropdown-basic-button"
            title="Выберите"
            size="sm"
            onClick={() => store.dispatch(CURRENT_USER_INFO(currentUserInfo))}
          >
            <Dropdown.Item>
              <Link to="/editStudent">Редактировать</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/examsResults">Экзамены</Link>
            </Dropdown.Item>
            <Delete />
            {/* <Dropdown.Item>Удалить</Dropdown.Item> */}
          </DropdownButton>
        </td>
      </tr>
    );
  }
}

export default RowComponent;
