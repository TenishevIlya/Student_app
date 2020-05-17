import React from "react";
import { IExamRowComponentProps } from "./ExamRowComponent.type";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CURRENT_EXAM_INFO } from "../../store/actions";
import store from "../../store/store";

const ExamRowComponent: React.FC<IExamRowComponentProps> = (props: any) => {
  const examInfo = {
    studentId: props.studentId,
    subjectId: props.subjectId,
    name: props.name,
    date: props.date,
    points: props.points,
    mark: props.mark,
  };
  return (
    <tr>
      <td>{props.course}</td>
      <td>{props.name}</td>
      <td>{props.date}</td>
      <td>{props.points}</td>
      <td>{props.mark}</td>
      <td>
        <DropdownButton
          id="dropdown-basic-button"
          title="Выберите"
          size="sm"
          onClick={() => store.dispatch(CURRENT_EXAM_INFO(examInfo))}
        >
          <Dropdown.Item>
            <Link to="/editExam">Редактировать</Link>
          </Dropdown.Item>
          <Dropdown.Item>Удалить</Dropdown.Item>
        </DropdownButton>
      </td>
    </tr>
  );
};

export default ExamRowComponent;
