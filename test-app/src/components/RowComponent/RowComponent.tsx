import React, { Component } from "react";
import { IRowComponentProps, IRowComponentState } from "./RowComponent.type";

class RowComponent extends Component<IRowComponentProps, IRowComponentState> {
  render() {
    return (
      <tr>
        <td>{this.props.numberOfGroup}</td>
        <td>{this.props.directionCode}</td>
        <td>{this.props.surname}</td>
        <td>{this.props.name}</td>
        <td>{this.props.patronymic}</td>
        <td>{this.props.gender}</td>
        <td>{this.props.dateOfBirth}</td>
        <td>{this.props.numberOfStudentTicket}</td>
        <td>{this.props.dateOfIssueOfStudentTicket}</td>
        <td>{this.props.isAHeadOfGroup}</td>
      </tr>
    );
  }
}

export default RowComponent;
