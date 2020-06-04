import React, { useEffect, useState } from "react";
import { IGetReportsProps } from "./GetReports.type";
import { Form, Col, Container, Row, Button } from "react-bootstrap";
import { setAllBachelorGroups } from "../../utils/setAllBachelorGroups";

const GetReports: React.FC<IGetReportsProps> = () => {
  const [goodMarksFileFormat, setGoodMarksFileFormat] = useState("");
  const [genderFileFormat, setGenderFileFormat] = useState("");
  const [goodMarksType, setGoodMarksType] = useState("");
  const [genderType, setGenderType] = useState("");
  const [allGroups, setAllGroups] = useState<any>();
  const [genderGroup, setGenderGroup] = useState("");

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
  }, []);

  const setGroupForGenderAnalysis = (event: any) =>
    setGenderGroup(event.target.value);

  return (
    <Container>
      <Row className="mt-3">
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
            className="btn-sm col-4"
            onClick={() => {
              get4and5Data();
            }}
          >
            Получить данные
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
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
                    <option key={index} value={`${group}`}>{`${group}`}</option>
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
  );
};

export default GetReports;
