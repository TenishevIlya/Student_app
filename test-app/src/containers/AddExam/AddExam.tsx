import React, { Component } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { IAddExamState } from "./AddExam.type";
import { Link } from "react-router-dom";
import { validateExamDate } from "../../utils/validateExamDate";
import { validatePoints } from "../../utils/validatePoints";

class AddExam extends Component<{}, IAddExamState> {
  constructor(props: any) {
    super(props);

    this.state = {
      allCourses: [],
      allGroups: [],
      allSurnames: [],
      currentCourse: 1,
      currentGroup: "01",
      currentSurname: "",
      ableToContinue: false,
      allGroupsDirectionsCodes: [],
      currentGroupDirectionCode: "",
      examNames: [],
      isAMark: false,
      dateOfExam: "",
      subjectId: 0,
      studentSurname: "",
      points: "",
      mark: "",
      error: "",
      success: false,
      pointsError: "",
    };

    this.getForwardFormFields = this.getForwardFormFields.bind(this);
    this.addInfoAboutExam = this.addInfoAboutExam.bind(this);
  }

  componentDidMount() {
    //отдельно подтягиваем данные о курсах
    fetch("http://localhost:9000/getJustCourse", {
      method: "GET",
      cache: "reload",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ allCourses: data });
      });
    //отдельно о группах
    fetch("http://localhost:9000/getJustGroupNumber", {
      method: "GET",
      cache: "reload",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ allGroups: data });
      });
    fetch("http://localhost:9000/getDirectionsCodes", {
      method: "GET",
      cache: "reload",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ allGroupsDirectionsCodes: data });
      });
  }

  getForwardFormFields = () => {
    fetch("http://localhost:9000/currentGroup:surnames", {
      method: "GET",
      cache: "reload",
      headers: {
        course: `${this.state.currentCourse}`,
        group: `${this.state.currentGroup}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          ableToContinue: true,
          allSurnames: data,
          studentSurname: data[0].Surname,
        });
      });
    fetch("http://localhost:9000/availableExams", {
      method: "GET",
      headers: {
        course: `${this.state.currentCourse}`,
        group: `${this.state.currentGroup}`,
        directionCode: `${this.state.currentGroupDirectionCode}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ examNames: data });
        if (data.length !== 0) {
          this.setState({ subjectId: data[0].Id });
        }
      });
  };

  addInfoAboutExam = () => {
    const infoAboutExam = {
      date: this.state.dateOfExam,
      subjectId: this.state.subjectId,
      student: this.state.studentSurname,
      points: this.state.points,
      mark: this.state.mark,
    };
    console.log(infoAboutExam);
    let isAnyError = "";
    let pointEr = "";
    this.state.examNames.map((exam) => {
      if (exam.Id == this.state.subjectId) {
        isAnyError = validateExamDate(
          exam.Number_of_course,
          this.state.currentCourse,
          this.state.dateOfExam
        );
        this.setState({ error: isAnyError });
      }
    });
    pointEr = validatePoints(this.state.points);
    if (pointEr !== "") {
      this.setState({ pointsError: pointEr });
    }
    if (isAnyError === "" && pointEr === "") {
      this.setState({ success: true });
      fetch("http://localhost:9000/api/addExam", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        cache: "reload",
        body: JSON.stringify(infoAboutExam),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data[0].Id);
        });
    }
  };

  render() {
    return (
      <Form>
        <Container>
          {/*Генерируем селект только с номерами курсов*/}
          <Form.Group controlId="formGroupNumbers">
            <Form.Label>Номер курса</Form.Label>
            <Form.Control
              as="select"
              custom
              onChange={(event: any) =>
                this.setState({
                  currentCourse: event.target.value,
                })
              }
            >
              {this.state.allCourses?.map((course) => {
                return (
                  <option
                    key={`${course.Course_number}$#!@!`}
                    value={`${course.Course_number}`}
                  >
                    {`${course.Course_number}`}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          {/*Генерируем селект только с номерами групп*/}
          <Form.Group controlId="formGroupNumbers">
            <Form.Label>Номер группы</Form.Label>
            <Form.Control
              as="select"
              custom
              onChange={(event: any) => {
                this.setState({
                  currentGroup: event.target.value,
                });
                this.state.allGroupsDirectionsCodes.map((code) => {
                  if (code.Group_number === event.target.value) {
                    this.setState({
                      currentGroupDirectionCode: code.Direction_code,
                    });
                  }
                });
              }}
            >
              {this.state.allGroups?.map((group) => {
                //const fullGroupNumber = `${group.Course_number}${group.Group_number}`;
                return (
                  <option
                    key={`${group.Group_number}$#!@!`}
                    value={`${group.Group_number}`}
                  >
                    {`${group.Group_number}`}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Button onClick={this.getForwardFormFields}>Далее</Button>
          {this.state.ableToContinue && this.state.currentCourse !== 0 ? (
            <>
              <Form.Group controlId="formGroupNumbers">
                <Form.Label>Фамилия студента</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  onChange={(event: any) => {
                    this.setState({
                      studentSurname: event.target.value,
                    });
                  }}
                >
                  {this.state.allSurnames?.map((surname, index) => {
                    return (
                      <option
                        key={`${surname.Surname}$#!@!`}
                        value={`${surname.Surname}`}
                      >
                        {`${surname.Surname}`}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formGroupNumbers">
                <Form.Label>Название экзамена</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  onChange={(event: any) => {
                    this.setState({
                      subjectId: event.target.value,
                    });
                  }}
                >
                  <option
                    key={`${this.state.examNames[0]?.Name}$#!@!`}
                    value={`${this.state.examNames[0]?.Name}`}
                  >
                    {`${this.state.examNames[0]?.Name}`}
                  </option>
                  {this.state.examNames?.map((exam, index) => {
                    if (index !== 0) {
                      return (
                        <option key={`${exam.Name}$#!@!`} value={exam.Id}>
                          {`${exam.Name}`}
                        </option>
                      );
                    }
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formPatronymic">
                <Form.Label>Дата экзамена(зачёта)</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Введите дату экзамена в формате ГГГГ-ММ-ДД"
                  onBlur={(event: any) => {
                    this.setState({
                      dateOfExam: event.target.value,
                    });
                  }}
                />
                {this.state.error !== "" ? (
                  <Form.Text className="text-danger">
                    {this.state.error}
                  </Form.Text>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formPatronymic">
                <Form.Label>Количество баллов</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите количество баллов"
                  onChange={() => {
                    console.log("ad");
                  }}
                  onBlur={(event: any) =>
                    this.setState({
                      points: event.target.value,
                    })
                  }
                />
                {this.state.pointsError !== "" ? (
                  <Form.Text className="text-danger">
                    {this.state.pointsError}
                  </Form.Text>
                ) : null}
              </Form.Group>
              <Form.Label>Вид оценивания</Form.Label>
              {["radio"].map((type) => (
                <div key={`custom-inline-${type}`} className="mb-3">
                  <Form.Check
                    custom
                    inline
                    label="Зачёт"
                    type={"radio"}
                    name="mark"
                    value={"Зачёт"}
                    id={`custom-inline-headOfGroup-1`}
                    onClick={(event: any) => {
                      this.setState({
                        isAMark: false,
                      });
                      this.setState({
                        mark: event.target.value,
                      });
                    }}
                  />
                  <Form.Check
                    custom
                    inline
                    label="Оценка"
                    type={"radio"}
                    name="mark"
                    value={"Mark"}
                    id={`custom-inline-headOfGroup-2`}
                    onClick={(event: any) => {
                      this.setState({
                        isAMark: true,
                      });
                    }}
                  />
                </div>
              ))}
              {this.state.isAMark ? (
                <Form.Group controlId="formPatronymic">
                  <Form.Label>Оценка</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Введите оценку"
                    onBlur={(event: any) =>
                      this.setState({
                        mark: event.target.value,
                      })
                    }
                  />
                </Form.Group>
              ) : null}
              {/* <Link to="/">
                <Button block onClick={this.addInfoAboutExam}>
                  Добавить информацию
                </Button>
              </Link> */}
              {this.state.success ? (
                <div style={{ marginBottom: "10px" }}>
                  <h3 style={{ textAlign: "center" }}>Данные добавлены</h3>
                  <Link to="/">
                    <Button block>На главную</Button>
                  </Link>
                </div>
              ) : null}
              <Button block onClick={this.addInfoAboutExam}>
                Добавить информацию
              </Button>
            </>
          ) : null}
        </Container>
      </Form>
    );
  }
}

const AddExamWrap = () => {
  return <AddExam />;
};

export default AddExamWrap;
