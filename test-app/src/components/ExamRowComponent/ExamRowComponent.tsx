import React, { useState } from "react";
import { IExamRowComponentProps } from "./ExamRowComponent.type";
import { DropdownButton, Dropdown, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CURRENT_EXAM_INFO, CURRENT_STUDENT_EXAMS } from "../../store/actions";
import store from "../../store/store";

const Delete = () => {
  const [show, setShow] = useState(false);

  const deleteExam = () => {
    let deleteIndex = null;

    let dbSubjectDeleteIndex = 0;
    let dbStudentDeleteIndex = 0;

    let beforeDeleteExams = store.getState().studentExams;
    store.getState().studentExams.map((exam: any, index: number) => {
      if (exam.Subject_id === store.getState().currentExam.subjectId) {
        deleteIndex = index;
        dbSubjectDeleteIndex = store.getState().currentExam.subjectId;
        dbStudentDeleteIndex = store.getState().currentExam.studentId;
      }
    });
    if (deleteIndex !== null) {
      beforeDeleteExams.splice(deleteIndex, 1);
      store.dispatch(CURRENT_EXAM_INFO({}));
      store.dispatch(CURRENT_STUDENT_EXAMS(beforeDeleteExams));
      fetch("http://localhost:9000/api/deleteExamInfo", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        cache: "reload",
        body: JSON.stringify({
          deleteSubjectId: dbSubjectDeleteIndex,
          deleteStudentId: dbStudentDeleteIndex,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {});
    }
    setShow(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Dropdown.Item onClick={handleShow}>Удалить</Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Удаление данных об экзамене</Modal.Title>
        </Modal.Header>
        <Modal.Body>Удалить информацию об этом экзамене?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
          <Delete />
        </DropdownButton>
      </td>
    </tr>
  );
};

export default ExamRowComponent;
