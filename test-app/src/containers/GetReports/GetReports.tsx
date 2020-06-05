import React, { useEffect, useState } from "react";
import { IGetReportsProps } from "./GetReports.type";
import { Form, Col, Container, Row, Button } from "react-bootstrap";
import { setAllBachelorGroups } from "../../utils/setAllBachelorGroups";

const GetReports: React.FC<IGetReportsProps> = () => {
  const [goodMarksFileFormat, setGoodMarksFileFormat] = useState("");
  const [genderFileFormat, setGenderFileFormat] = useState("");
  const [marksFileFormat, setMarksFileFormat] = useState("");

  const [goodMarksType, setGoodMarksType] = useState("");
  const [genderType, setGenderType] = useState("");
  const [marksType, setMarksType] = useState("");

  const [allGroups, setAllGroups] = useState<any>();
  const [genderGroup, setGenderGroup] = useState("");
  const [currentCourse, setCurrentCourse] = useState("");
  const [allCourses, setAllCourses] = useState([]);
  const [currentGroup, setCurrentGroup] = useState();
  const [examsCourse, setExamsCourse] = useState(1);
  const [examsCourseList, setExamsCourseList] = useState<number[]>([1]);

  const [allGroupsWithoutCourse, setAllGroupsWihtoutCourse] = useState([]);
  const [allGroupsDirectionsCodes, setAllGroupsDirectionsCodes] = useState([]);
  const [currentGroupDirectionCode, setCurrentGroupDirectionCode] = useState(
    ""
  );
  const [examNames, setExamNames] = useState<any>([]);
  const [ableToContinue, setAbleToContinue] = useState(false);
  const [currentExamName, setCurrentExamName] = useState("");

  const get4and5Data = () => {
    fetch("http://localhost:9000/getReports", {
      method: "GET",
      cache: "reload",
      headers: {
        fileFormat: goodMarksFileFormat,
        reportType: goodMarksType,
      },
    })
      .then((res) => {
        return res;
      })
      .then((data) => {
        console.log(data);
      })
      .then((data) => {
        window.open("http://localhost:9000/reports");
      });
  };

  const getGenderData = () => {
    fetch("http://localhost:9000/getReports", {
      method: "GET",
      cache: "reload",
      headers: {
        fileFormat: genderFileFormat,
        reportType: genderType,
        genderGroup: genderGroup,
      },
    })
      .then((res) => {
        return res;
      })
      .then((data) => {
        console.log(data);
      })
      .then((data) => {
        window.open("http://localhost:9000/reports");
      });
  };

  const getSubjectMarksInfo = () => {
    fetch("http://localhost:9000/getReports", {
      method: "GET",
      cache: "reload",
      headers: {
        issueDate: `${new Date().getFullYear() - Number(currentCourse)}-09-01`,
        fileFormat: marksFileFormat,
        reportType: marksType,
        examId: currentExamName,
      },
    })
      .then((res) => {
        return res;
      })
      .then((data) => {
        console.log(data);
      })
      .then((data) => {
        window.open("http://localhost:9000/reports");
      });
  };

  useEffect(() => {
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
        setAllGroups(groups.sort());
      });
    fetch("http://localhost:9000/getDirectionsCodes", {
      method: "GET",
      cache: "reload",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAllGroupsDirectionsCodes(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:9000/getJustCourse", {
      method: "GET",
      cache: "reload",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAllCourses(data);
        //this.setState({ allCourses: data });
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
        setAllGroupsWihtoutCourse(data);
      });
  }, []);

  const setGroupForGenderAnalysis = (event: any) =>
    setGenderGroup(event.target.value);

  const getExams = () => {
    fetch("http://localhost:9000/availableExams", {
      method: "GET",
      headers: {
        course: `${currentCourse}`,
        group: `${currentGroup}`,
        directionCode: `${currentGroupDirectionCode}`,
        examsCourse: `${examsCourse}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setExamNames(data);
        setAbleToContinue(true);
      });
  };

  return (
    <Form>
      <Container>
        <h3 className="mt-3">
          Сводная информация об экзамене по определенному предмету в одной
          группе
        </h3>
        <Form.Group controlId="formGroupNumbers">
          <Form.Label>Номер курса</Form.Label>
          <Form.Control
            as="select"
            custom
            onChange={(event: any) => {
              setCurrentCourse(event.target.value);
              let examsCourseArray = [];
              for (let i = 1; i <= event.target.value; i++) {
                examsCourseArray.push(i);
              }
              setExamsCourseList(examsCourseArray);
            }}
          >
            {allCourses?.map((course: any) => {
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
              setCurrentGroup(event.target.value);
              allGroupsDirectionsCodes.map((code: any) => {
                if (code.Group_number === event.target.value) {
                  setCurrentGroupDirectionCode(code.Direction_code);
                }
              });
            }}
          >
            {allGroupsWithoutCourse?.map((group: any) => {
              if (group != undefined) {
                return (
                  <option
                    key={`${group.Group_number}`}
                    value={`${group.Group_number}`}
                  >
                    {`${group.Group_number}`}
                  </option>
                );
              }
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formGroupNumbers">
          <Form.Label>Номер курса для экзаменов</Form.Label>
          <Form.Control
            as="select"
            custom
            onChange={(event: any) => {
              setExamsCourse(event.target.value);
            }}
          >
            {examsCourseList?.map((course: any) => {
              return (
                <option key={`${course}$#!@!`} value={`${course}`}>
                  {`${course}`}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Button onClick={getExams} variant="info">
          Далее
        </Button>
        {ableToContinue ? (
          <div>
            <Form.Group controlId="formGroupNumbers" className="mt-3">
              <Form.Label>Название экзамена</Form.Label>
              <Form.Control
                as="select"
                custom
                onChange={(event: any) => {
                  setCurrentExamName(event.target.value);
                }}
              >
                <option
                  key={`${examNames[0]?.Name}$#!@!`}
                  value={`${examNames[0]?.Name}`}
                  selected
                >
                  {`${examNames[0]?.Name}`}
                </option>
                {examNames?.map((exam: any, index: any) => {
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
            <Form.Label>Выберите формат отчета</Form.Label>
            {["radio"].map((type) => (
              <div key={`custom-inline-${type}`} className="mb-3">
                <Form.Check
                  custom
                  inline
                  label="txt"
                  type={"radio"}
                  name="formatMarks"
                  value="txt"
                  id={`custom-marks-txt`}
                  onClick={() => {
                    setMarksFileFormat("txt");
                    setMarksType("subjectMarks");
                  }}
                />
                <Form.Check
                  custom
                  inline
                  label="xls"
                  type={"radio"}
                  name="formatMarks"
                  value="xls"
                  id={`custom-marks-xls`}
                  onClick={() => {
                    setMarksFileFormat("xls");
                    setMarksType("subjectMarks");
                  }}
                />
              </div>
            ))}
            <Button
              variant="info"
              className="btn-sm col-4"
              onClick={() => {
                getSubjectMarksInfo();
              }}
            >
              Получить данные
            </Button>
          </div>
        ) : null}
        <Row className="mt-5">
          <Col className="radio-col">
            <h3>Информация о студентах, сдавших экзамены на 4 и 5</h3>
            <Form.Label>Выберите формат отчета</Form.Label>
            {["radio"].map((type) => (
              <div key={`custom-inline-${type}`} className="mb-3">
                <Form.Check
                  custom
                  inline
                  label="txt"
                  type={"radio"}
                  name="format4and5"
                  value="txt"
                  id={`custom-4and5-txt`}
                  onClick={() => {
                    setGoodMarksFileFormat("txt");
                    setGoodMarksType("studentsWith4And5");
                  }}
                />
                <Form.Check
                  custom
                  inline
                  label="xls"
                  type={"radio"}
                  name="format4and5"
                  value="xls"
                  id={`custom-4and5-xls`}
                  onClick={() => {
                    setGoodMarksFileFormat("xls");
                    setGoodMarksType("studentsWith4And5");
                  }}
                />
              </div>
            ))}
            <Button
              variant="info"
              className="btn-sm col-4"
              onClick={() => {
                get4and5Data();
              }}
            >
              Получить данные
            </Button>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="radio-col mt-3">
            <h3>Гендерный анализ</h3>
            <Form.Control
              as="select"
              onChange={setGroupForGenderAnalysis}
              className="group-select"
            >
              <option value="All students">Все студенты</option>
              {allGroups !== undefined
                ? allGroups.map((group: string, index: number) => {
                    return (
                      <option
                        key={index}
                        value={`${group}`}
                      >{`${group}`}</option>
                    );
                  })
                : null}
            </Form.Control>
            <Form.Label>Выберите формат отчета</Form.Label>
            {["radio"].map((type) => (
              <div key={`custom-inline-${type}`} className="mb-3">
                <Form.Check
                  custom
                  inline
                  label="txt"
                  type={"radio"}
                  name="formatGender"
                  value="txt"
                  id={`custom-gender-txt`}
                  onClick={() => {
                    setGenderFileFormat("txt");
                    setGenderType("gender");
                  }}
                />
                <Form.Check
                  custom
                  inline
                  label="xls"
                  type={"radio"}
                  name="formatGender"
                  value="xls"
                  id={`custom-gender-xls`}
                  onClick={() => {
                    setGenderFileFormat("xls");
                    setGenderType("gender");
                  }}
                />
              </div>
            ))}
            <Button
              variant="info"
              className="btn-sm col-4"
              onClick={() => {
                getGenderData();
              }}
            >
              Получить данные
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default GetReports;
