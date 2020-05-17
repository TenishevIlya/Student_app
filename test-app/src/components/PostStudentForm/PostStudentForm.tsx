import React, { Component } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { setAllBachelorGroups } from "../../utils/setAllBachelorGroups";
import { backFormateDate } from "../../utils/formatDate";
import store from "../../store/store";
import { CHANGE_GROUP, CHANGE_LOCATION } from "../../store/actions";
import {
  IPostStudentFormProps,
  IPostStudentFormState,
  IPostStudentFormWrap,
} from "./PostStudentForm.type";

class PostStudentForm extends Component<
  IPostStudentFormProps,
  IPostStudentFormState
> {
  constructor(props: any) {
    super(props);

    if (this.props.history.pathname === "/addStudent") {
      this.state = {
        groupNumbers: [],
        surname: { value: "", error: "" },
        name: { value: "", error: "" },
        patronymic: { value: "", error: "" },
        dateOfBirth: { value: "", error: "" },
        gender: "",
        directionCode: { value: "", error: "" },
        dateOfIssueOfStudentTicket: { value: "", error: "" },
        numberOfStudentTicket: { value: "", error: "" },
        groupNumber: { value: "101", error: "" },
        isAHeadOfGroup: null,
        ableToRedirect: false,
      };
    } else {
      this.state = {
        groupNumbers: [],
        id: store.getState().currentUser.id,
        surname: { value: store.getState().currentUser.surname, error: "" },
        name: { value: store.getState().currentUser.name, error: "" },
        patronymic: {
          value: store.getState().currentUser.patronymic,
          error: "",
        },
        dateOfBirth: {
          value: backFormateDate(store.getState().currentUser.dateOfBirth),
          error: "",
        },
        gender: store.getState().currentUser.gender,
        directionCode: {
          value: store.getState().currentUser.directionCode,
          error: "",
        },
        dateOfIssueOfStudentTicket: {
          value: backFormateDate(
            store.getState().currentUser.dateOfIssueOfStudentTicket
          ),
          error: "",
        },
        numberOfStudentTicket: {
          value: store.getState().currentUser.numberOfStudentTicket,
          error: "",
        },
        groupNumber: {
          value: store.getState().currentUser.groupNumber,
          error: "",
        },
        isAHeadOfGroup: store.getState().currentUser.isAHeadOfGroup,
        ableToRedirect: false,
      };
    }

    this.sendStudentData = this.sendStudentData.bind(this);
  }

  sendStudentData = () => {
    const url = `http://localhost:9000/api${this.props.history.pathname}`;
    const currentMethod =
      this.props.history.pathname === "/editStudent" ? "PUT" : "POST";
    fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: currentMethod,
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

  componentDidMount() {
    fetch("http://localhost:9000/groupNumbers", {
      method: "GET",
      cache: "reload",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let groups: string[] = [];
        setAllBachelorGroups(data, groups);
        this.setState({ groupNumbers: groups.sort() });
      });
  }

  render() {
    console.log(store.getState().currentUser);
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
                    this.setState({ surname: { value: event.target.value } });
                  }}
                  defaultValue={
                    this.props.history.pathname === "/editStudent"
                      ? `${store.getState().currentUser.surname}`
                      : ""
                  }
                ></Form.Control>
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
                  defaultValue={
                    this.props.history.pathname === "/editStudent"
                      ? `${store.getState().currentUser.name}`
                      : ""
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
                  defaultValue={
                    this.props.history.pathname === "/editStudent"
                      ? `${store.getState().currentUser.patronymic}`
                      : ""
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
                  defaultValue={
                    this.props.history.pathname === "/editStudent"
                      ? `${backFormateDate(
                          store.getState().currentUser.dateOfBirth
                        )}`
                      : ""
                  }
                />
              </Form.Group>
            </Col>
            <Col className="radio-col">
              <Form.Label>Пол</Form.Label>
              {["radio"].map((type) => (
                <div key={`custom-inline-${type}`} className="mb-3">
                  {this.props.history.pathname === "/editStudent" &&
                  store.getState().currentUser.gender === "Мужской" &&
                  (this.state.gender === "" ||
                    this.state.gender === "Мужской") ? (
                    <Form.Check
                      custom
                      inline
                      label="Мужской"
                      type={"radio"}
                      name="gender"
                      value="Мужской"
                      checked
                      id={`custom-inline-gender-1`}
                      onClick={(event: any) =>
                        this.setState({ gender: event.target.value })
                      }
                    />
                  ) : (
                    <Form.Check
                      custom
                      inline
                      label="Мужской"
                      type={"radio"}
                      name="gender"
                      value="Мужской"
                      id={`custom-inline-gender-1`}
                      onClick={(event: any) =>
                        this.setState({ gender: event.target.value })
                      }
                    />
                  )}
                  {this.props.history.pathname === "/editStudent" &&
                  store.getState().currentUser.gender === "Женский" &&
                  (this.state.gender === "" ||
                    this.state.gender === "Женский") ? (
                    <Form.Check
                      custom
                      inline
                      label="Женский"
                      type={"radio"}
                      name="gender"
                      value="Женский"
                      checked
                      id={`custom-inline-gender-2`}
                      onClick={(event: any) =>
                        this.setState({ gender: event.target.value })
                      }
                    />
                  ) : (
                    <Form.Check
                      custom
                      inline
                      label="Женский"
                      type={"radio"}
                      name="gender"
                      value="Женский"
                      id={`custom-inline-gender-2`}
                      onClick={(event: any) =>
                        this.setState({ gender: event.target.value })
                      }
                    />
                  )}
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
                  defaultValue={
                    this.props.history.pathname === "/editStudent"
                      ? `${store.getState().currentUser.directionCode}`
                      : ""
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
                  defaultValue={
                    this.props.history.pathname === "/editStudent"
                      ? `${backFormateDate(
                          store.getState().currentUser
                            .dateOfIssueOfStudentTicket
                        )}`
                      : ""
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
                  defaultValue={
                    this.props.history.pathname === "/editStudent"
                      ? `${store.getState().currentUser.numberOfStudentTicket}`
                      : ""
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
                    if (
                      this.props.history.pathname === "/editStudent" &&
                      group === store.getState().currentUser.groupNumber
                    ) {
                      return (
                        <option
                          key={`${group}$#!@!`}
                          value={`${group}`}
                          selected
                        >
                          {group}
                        </option>
                      );
                    }
                    if (index === 0) {
                      return (
                        <option key={`${group}$#!@!`} value={`${group}`}>
                          {group}
                        </option>
                      );
                    }
                    if (index !== 0) {
                      return (
                        <option key={`${group}$#!@!`} value={`${group}`}>
                          {group}
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
                  {this.props.history.pathname === "/editStudent" &&
                  store.getState().currentUser.isAHeadOfGroup === 1 &&
                  (this.state.isAHeadOfGroup === null ||
                    this.state.isAHeadOfGroup === 1) ? (
                    <Form.Check
                      custom
                      inline
                      label="Да"
                      type={"radio"}
                      name="headOfGroup"
                      value={1}
                      checked
                      id={`custom-inline-headOfGroup-1`}
                      onClick={(event: any) =>
                        this.setState({
                          isAHeadOfGroup: event.target.value,
                        })
                      }
                    />
                  ) : (
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
                          isAHeadOfGroup: event.target.value,
                        })
                      }
                    />
                  )}
                  {this.props.history.pathname === "/editStudent" &&
                  store.getState().currentUser.isAHeadOfGroup === 0 &&
                  (this.state.isAHeadOfGroup === null ||
                    this.state.isAHeadOfGroup === 0) ? (
                    <Form.Check
                      custom
                      inline
                      label="Нет"
                      type={"radio"}
                      name="headOfGroup"
                      value={0}
                      checked
                      id={`custom-inline-headOfGroup-2`}
                      onClick={(event: any) =>
                        this.setState({
                          isAHeadOfGroup: event.target.value,
                        })
                      }
                    />
                  ) : (
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
                          isAHeadOfGroup: event.target.value,
                        })
                      }
                    />
                  )}
                </div>
              ))}
            </Col>
          </Row>
          <Link to="/">
            <Button variant="secondary" block onClick={this.sendStudentData}>
              {this.props.submitBtnTitle}
            </Button>
          </Link>
        </Container>
      </Form>
    );
  }
}

const PostStudentFormWrap: React.FC<
  RouteComponentProps<{}> & IPostStudentFormWrap
> = (props: any) => {
  const { location, formTitle, submitBtnTitle } = props;
  return (
    <>
      <h2 className="form-header">{formTitle}</h2>
      <PostStudentForm history={location} submitBtnTitle={submitBtnTitle} />
    </>
  );
};

export default withRouter(PostStudentFormWrap);
