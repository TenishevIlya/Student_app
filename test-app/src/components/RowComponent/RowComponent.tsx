import React, { Component } from "react";
import { IRowComponentProps, IRowComponentState } from "./RowComponent.type";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "./RowComponent.style.css";
import { Link } from "react-router-dom";
import store from "../../store/store";
import { CURRENT_USER_INFO } from "../../store/actions";

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
            <Dropdown.Item>Удалить</Dropdown.Item>
          </DropdownButton>
        </td>
      </tr>
    );
  }
}

export default RowComponent;
