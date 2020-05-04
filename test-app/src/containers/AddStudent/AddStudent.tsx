import React, { Component, Fragment } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { IAddStudentState } from "./AddStudent.type";
import "./AddStudent.style.css";

import { isRussianLanguage } from "../../utils/addStudentValidations";
import { Link } from "react-router-dom";

class AddStudent extends Component<{}, IAddStudentState> {
  constructor(props: any) {
    super(props);

    this.state = {
      groupNumbers: [],
      surname: { value: "", error: "" },
      name: { value: "", error: "" },
      patronymic: { value: "", error: "" },
      dateOfBirth: { value: "", error: "" },
      gender: { value: "", error: "" },
      directionCode: { value: "", error: "" },
      dateOfIssueOfStudentTicket: { value: "", error: "" },
      numberOfStudentTicket: { value: "", error: "" },
      groupNumber: { value: "Все группы", error: "" },
      isAHeadOfGroup: { value: "", error: "" },
    };

    this.sendStudentData = this.sendStudentData.bind(this);
  }

  sendStudentData = () => {
    console.log(this.state);
    fetch("http://localhost:9000/api/addStudent", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(this.state),
      cache: "reload",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        // window.location.href = "http://localhost:3000/";
      });
  };

  componentDidUpdate() {}

  componentDidMount() {
    fetch("http://localhost:9000/groupNumbers", {
      method: "GET",
      cache: "reload",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ groupNumbers: data });
      });
  }

  render() {
    return (
      <Form>
        <Container>
          <Row>
            <Col>
              <Form.Group controlId="formSurname">
                <Form.Label>Фамилия</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите фамилию"
                  onBlur={(event: any) => {
                    const error = isRussianLanguage(event.target.value);
                    this.setState({ surname: { value: event.target.value } });
                    if (error !== null) {
                    }
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formName">
                <Form.Label>Имя</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите имя"
                  onBlur={(event: any) =>
                    this.setState({ name: { value: event.target.value } })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPatronymic">
                <Form.Label>Отчество</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите отчество"
                  onBlur={(event: any) =>
                    this.setState({ patronymic: { value: event.target.value } })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formDateOfBirth">
                <Form.Label>Дата рождения</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Введите дату рождения"
                  onBlur={(event: any) =>
                    this.setState({
                      dateOfBirth: { value: event.target.value },
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col className="radio-col">
              <Form.Label>Пол</Form.Label>
              {["radio"].map((type) => (
                <div key={`custom-inline-${type}`} className="mb-3">
                  <Form.Check
                    custom
                    inline
                    label="Мужской"
                    type={"radio"}
                    name="gender"
                    value="Мужской"
                    id={`custom-inline-gender-1`}
                    onClick={(event: any) =>
                      this.setState({ gender: { value: event.target.value } })
                    }
                  />
                  <Form.Check
                    custom
                    inline
                    label="Женский"
                    type={"radio"}
                    name="gender"
                    value="Женский"
                    id={`custom-inline-gender-2`}
                    onClick={(event: any) =>
                      this.setState({ gender: { value: event.target.value } })
                    }
                  />
                </div>
              ))}
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formDirectionCode">
                <Form.Label>Код направления</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите код направления"
                  onBlur={(event: any) =>
                    this.setState({
                      directionCode: { value: event.target.value },
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formDateOfIssueOfStudentTicket">
                <Form.Label>Дата выдачи студенческого</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Введите дату выдачи студенческого"
                  onBlur={(event: any) =>
                    this.setState({
                      dateOfIssueOfStudentTicket: { value: event.target.value },
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formNumberOfStudentTicket">
                <Form.Label>Номер студенческого</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите номер студенческого"
                  onBlur={(event: any) =>
                    this.setState({
                      numberOfStudentTicket: { value: event.target.value },
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formGroupNumbers">
                <Form.Label>Номер группы</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  onChange={(event: any) =>
                    this.setState({
                      groupNumber: { value: event.target.value },
                    })
                  }
                >
                  {this.state.groupNumbers?.map((group, index) => {
                    const fullGroupNumber = `${group.Course_number}${group.Group_number}`;
                    if (index === 0) {
                      return (
                        <option
                          key={`${group.Course_number}$#!@!${group.Group_number}`}
                          value={`${group.Course_number}${group.Group_number}`}
                        >
                          {fullGroupNumber}
                        </option>
                      );
                    }
                    if (index !== 0) {
                      return (
                        <option
                          key={`${group.Course_number}$#!@!${group.Group_number}`}
                          value={`${group.Course_number}${group.Group_number}`}
                        >
                          {fullGroupNumber}
                        </option>
                      );
                    }
                  })}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col className="radio-col">
              <Form.Label>Староста</Form.Label>
              {["radio"].map((type) => (
                <div key={`custom-inline-${type}`} className="mb-3">
                  <Form.Check
                    custom
                    inline
                    label="Да"
                    type={"radio"}
                    name="headOfGroup"
                    value={1}
                    id={`custom-inline-headOfGroup-1`}
                    onClick={(event: any) =>
                      this.setState({
                        isAHeadOfGroup: { value: event.target.value },
                      })
                    }
                  />
                  <Form.Check
                    custom
                    inline
                    label="Нет"
                    type={"radio"}
                    name="headOfGroup"
                    value={0}
                    id={`custom-inline-headOfGroup-2`}
                    onClick={(event: any) =>
                      this.setState({
                        isAHeadOfGroup: { value: event.target.value },
                      })
                    }
                  />
                </div>
              ))}
            </Col>
          </Row>
          <Link to="/">
            <Button variant="secondary" block onClick={this.sendStudentData}>
              Добавить студента
            </Button>
          </Link>
        </Container>
      </Form>
    );
  }
}

const AddStudentWrap = () => {
  return (
    <>
      <h2 className="form-header">Введите данные о студенте</h2>
      <AddStudent />
    </>
  );
};

export default AddStudentWrap;
