import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Students from "../containers/Students/Students";
import AddStudent from "../containers/AddStudent/AddStudent";
import AddExamWrap from "../containers/AddExam/AddExam";
import EditStudent from "../containers/EditStudent/EditStudent";
import ExamsResults from "../containers/ExamsResults/ExamsResults";
import EditExam from "../containers/EditExam/EditExam";
import GetReports from "../containers/GetReports/GetReports";
import AddGroupAndDirection from "../containers/AddGroupAndDirection/AddGroupAndDirection";
import { Switch, Route, Link, useHistory } from "react-router-dom";

import { TStudent } from "../containers/Students/Students.type";

import { setAllBachelorGroups } from "../utils/setAllBachelorGroups";

import "./Layout.style.css";
import store from "../store/store";
import { CHANGE_GROUP, CHANGE_LOCATION, ALL_STUDENTS } from "../store/actions";

const Layout = () => {
  const [students, setStudents] = useState<TStudent[]>();
  const [allStudents, setAllStudents] = useState<TStudent[]>();
  const [allGroups, setAllGroups] = useState<string[]>();
  const [currentGroup, setCurrentGroup] = useState<string>("All students");
  const history = useHistory();

  const handleChange = (event: any) => {
    setCurrentGroup(event.target.value);
    store.dispatch(CHANGE_GROUP(event.target.value));
  };

  useEffect(() => {
    fetch("http://localhost:9000/api/data", {
      method: "GET",
      cache: "reload",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setStudents(data);
        setAllStudents(data);
        //store.dispatch(ALL_STUDENTS(data));
      });
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
  }, []);

  useEffect(() => {
    store.subscribe(() => {
      if (
        (store.getState().data === "All students" &&
          store.getState().prevLocation !== "/") ||
        (store.getState().data === "All students" &&
          history.location.pathname === "/")
      ) {
        fetch("http://localhost:9000/api/data", {
          method: "GET",
          cache: "no-cache",
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setStudents(data);
          });
      }
    });
  }, [currentGroup]);

  useEffect(() => {
    if (currentGroup === "All students") {
      setAllStudents(allStudents);
    } else {
      fetch("http://localhost:9000/filterGroup", {
        method: "GET",
        headers: {
          group: `${currentGroup.slice(1, 3)}`,
          year: `${
            new Date().getFullYear() - Number(currentGroup.slice(0, 1))
          }-09-01`,
          course: `${currentGroup[0]}`,
        },
        cache: "reload",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setStudents(data);
        });
    }
  }, [currentGroup]);

  return (
    <div>
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
                <Button
                  variant="info"
                  size="sm"
                  className="btn-separation"
                  onClick={() => {
                    store.dispatch(CHANGE_LOCATION(history.location.pathname));
                  }}
                >
                  Добавить студента
                </Button>
              </Link>
              <Link to="/addExam">
                <Button
                  variant="info"
                  size="sm"
                  className="btn-separation"
                  onClick={() =>
                    store.dispatch(CHANGE_LOCATION(history.location.pathname))
                  }
                >
                  Добавить данные о сданном экзамене
                </Button>
              </Link>
              <Link to="/getReports">
                <Button
                  variant="info"
                  size="sm"
                  className="btn-separation"
                  onClick={() =>
                    store.dispatch(CHANGE_LOCATION(history.location.pathname))
                  }
                >
                  Выгрузка отчетов
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/">
                <Button
                  variant="info"
                  size="sm"
                  className="btn-separation"
                  onClick={() => {
                    store.dispatch(CHANGE_LOCATION(history.location.pathname));
                    store.dispatch(CHANGE_GROUP("All students"));
                  }}
                >
                  На главную
                </Button>
              </Link>
              {history.location.pathname !== "/addExam" ? (
                <Link to="/addExam">
                  <Button
                    variant="info"
                    size="sm"
                    className="btn-separation"
                    onClick={() =>
                      store.dispatch(CHANGE_LOCATION(history.location.pathname))
                    }
                  >
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
          ) : null}
        </Navbar>
        <Switch>
          <Route exact path="/">
            <Students allStudents={students} />
          </Route>
          <Route path="/addStudent" component={AddStudent} />
          <Route path="/addExam" component={AddExamWrap} />
          <Route path="/editStudent" component={EditStudent} />
          <Route path="/examsResults" component={ExamsResults} />
          <Route path="/editExam" component={EditExam} />
          <Route path="/getReports" component={GetReports} />
          <Route
            path="/addGroupAndDirection"
            component={AddGroupAndDirection}
          />
        </Switch>
      </>
    </div>
  );
};

export default Layout;
