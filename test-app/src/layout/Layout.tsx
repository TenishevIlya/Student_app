import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Students from "../containers/Students/Students";
import AddStudentWrap from "../containers/AddStudent/AddStudent";
import AddExamWrap from "../containers/AddExam/AddExam";
import { Switch, Route, Link, useHistory } from "react-router-dom";

import "./Layout.style.css";

const Layout: React.FC = (props: any) => {
  const [currentGroup, setCurrentGroup] = useState<number | string | any>();
  const [currentGroupStudents, setCurrentGroupStudents] = useState<any>();
  const [allStudents, setAllStudents] = useState<any>();
  const [flag, setFlag] = useState(false);
  const [allGroups, setAllGroups] = useState<any>();
  const [graduated, setGraduated] = useState<any>();

  const [graduatedFromCurrentGroup, setGraduatedFromCurrentGroup] = useState<
    any
  >();

  let [currentDay, setCurrentDay] = useState(0);
  let [currentMonth, setCurrentMonth] = useState(0);
  let [count, setCount] = useState(0);
  let history = useHistory();

  const handleChange = (event: any) => {
    setCurrentGroup(event.target.value);
  };

  useEffect(() => {
    setCurrentDay(new Date().getDate());
    setCurrentMonth(new Date().getMonth() + 1);
    setCount(count++);
  });

  // useEffect(() => {
  //   if (history.location.pathname === "/") {
  //     fetch("http://localhost:9000/api/data")
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         console.log("ad");
  //         setAllStudents(data);
  //       });
  //   }
  // }, [allStudents]);

  useEffect(() => {
    if (
      currentDay === 1 &&
      currentMonth === 9 &&
      localStorage.getItem("update") !== "no"
    ) {
      localStorage.setItem("update", "no");
      fetch("http://localhost:9000/api/yearChange");
    }
    if (currentDay === 2 && currentMonth === 9) {
      localStorage.clear();
    }
  });

  useEffect(() => {
    if (
      currentDay === 14 &&
      currentMonth === 4 &&
      localStorage.getItem("update") === "no"
    ) {
      fetch("http://localhost:9000/api/data")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setAllStudents(data);
        });
    } else {
      setCount(count++);
    }
    if (count === 2) {
      //console.log("here");
      fetch("http://localhost:9000/api/data", {})
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setAllStudents(data);
        });
    }
  }, [currentDay]);

  useEffect(() => {
    fetch("http://localhost:9000/groupNumbers", {
      cache: "reload",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAllGroups(data);
      });
  }, [currentDay]);

  useEffect(() => {
    fetch("http://localhost:9000/getGraduated", {
      cache: "reload",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setGraduated(data);
      });
    if (currentGroup === "All students") {
      setCurrentGroupStudents(allStudents);
      console.log("asd");
      if (graduated !== undefined) {
        setCurrentGroupStudents(allStudents.concat(graduated));
        console.log(graduated);
      }
    } else {
      fetch("http://localhost:9000/filterGroup", {
        method: "GET",
        headers: { group: `${currentGroup}` },
        cache: "reload",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setCurrentGroupStudents(data);
          const filteredGraduatedStudents = graduated.filter((student: any) => {
            if (student.Group_number === data[0].Group_number) {
              return student;
            }
          });
          setGraduatedFromCurrentGroup(filteredGraduatedStudents);
          setFlag(true);
        });
    }
  }, [currentGroup]);

  return (
    <div>
      {flag !== undefined &&
      allStudents !== undefined &&
      allGroups !== undefined &&
      graduated !== undefined ? (
        <>
          <Navbar
            collapseOnSelect
            expand="lg"
            sticky="top"
            bg="dark"
            variant="dark"
          >
            <Navbar.Brand href="#home">МатФак</Navbar.Brand>
            {history.location.pathname === "/" ? (
              <>
                <Link to="/addStudent">
                  <Button variant="info" size="sm" className="btn-separation">
                    Добавить студента
                  </Button>
                </Link>
                <Link to="/addExam">
                  <Button variant="info" size="sm" className="btn-separation">
                    Добавить данные о сданном экзамене
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/">
                  <Button variant="info" size="sm" className="btn-separation">
                    На главную
                  </Button>
                </Link>
                {history.location.pathname !== "/addExam" ? (
                  <Link to="/addExam">
                    <Button variant="info" size="sm" className="btn-separation">
                      Добавить экзамен
                    </Button>
                  </Link>
                ) : null}
              </>
            )}
            {history.location.pathname === "/" ? (
              <Form.Control
                as="select"
                onChange={handleChange}
                className="group-select"
              >
                <option value="All students">Все студенты</option>
                {allGroups !== undefined
                  ? allGroups.map((group: any, index: any) => {
                      return (
                        <option
                          key={index}
                          value={`${group.Course_number}${group.Group_number}`}
                        >{`${group.Course_number}${group.Group_number}`}</option>
                      );
                    })
                  : null}
              </Form.Control>
            ) : null}
          </Navbar>
          <Switch>
            <Route exact path="/">
              <Students
                flag={flag}
                allStudents={allStudents}
                users={currentGroupStudents}
                graduated={graduated}
                graduatedFromCurrentGroup={graduatedFromCurrentGroup}
              />
            </Route>
            <Route path="/addStudent" component={AddStudentWrap} />
            <Route path="/addExam" component={AddExamWrap} />
          </Switch>
        </>
      ) : null}
    </div>
  );
};

export default Layout;
