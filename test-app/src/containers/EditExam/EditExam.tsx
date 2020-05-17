import React, { Component } from "react";
import { IEditExamProps, IEditExamState, IEditExamWrap } from "./EditExam.type";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import store from "../../store/store";
import { CHANGE_GROUP, CHANGE_LOCATION } from "../../store/actions";
import { backFormateDate } from "../../utils/formatDate";

class EditExam extends Component<IEditExamProps, IEditExamState> {
  constructor(props: any) {
    super(props);

    this.state = {
      studentId: store.getState().currentExam.studentId,
      subjectId: store.getState().currentExam.subjectId,
      name: store.getState().currentExam.name,
      date: backFormateDate(store.getState().currentExam.date),
      points: store.getState().currentExam.points,
      mark: store.getState().currentExam.mark,
    };

    this.updateExamInfo = this.updateExamInfo.bind(this);
  }

  updateExamInfo = () => {
    fetch("http://localhost:9000/api/editExam", {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(this.state),
      cache: "reload",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        store.dispatch(CHANGE_GROUP("All students"));
        store.dispatch(CHANGE_LOCATION(this.props.history.pathname));
      });
  };

  render() {
    return (
      <div>
        <h2 className="form-header">Редактирование данных об экзамене</h2>
        <Form>
          <Container>
            <Row>
              <Col>
                <Form.Group controlId="examName">
                  <Form.Label>Название предмета</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Название предмета"
                    onBlur={(event: any) => {
                      this.setState({ name: event.target.value });
                    }}
                    defaultValue={store.getState().currentExam.name}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="dateOfExam">
                  <Form.Label>Дата проведения аттестации</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Дата проведения аттестации"
                    onBlur={(event: any) => {
                      this.setState({ date: event.target.value });
                    }}
                    defaultValue={backFormateDate(
                      store.getState().currentExam.date
                    )}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="examPoints">
                  <Form.Label>Количество баллов</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Количество баллов"
                    onBlur={(event: any) => {
                      this.setState({ points: event.target.value });
                    }}
                    defaultValue={store.getState().currentExam.points}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="examMark">
                  <Form.Label>Зачёт/оценка</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Зачёт/оценка"
                    onBlur={(event: any) => {
                      this.setState({ mark: event.target.value });
                    }}
                    defaultValue={store.getState().currentExam.mark}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Link to="/examsResults">
                  <Button variant="secondary" block>
                    К списку экзаменов
                  </Button>
                </Link>
              </Col>
              <Col>
                <Link to="/">
                  <Button
                    variant="secondary"
                    block
                    onClick={this.updateExamInfo}
                  >
                    Изменить данные об экзамене
                  </Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </Form>
      </div>
    );
  }
}

const EditExamWrap: React.FC<RouteComponentProps<{}> & IEditExamWrap> = (
  props: any
) => {
  const { location } = props;
  return (
    <>
      <EditExam history={location} />
    </>
  );
};

export default withRouter(EditExamWrap);
