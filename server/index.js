const express = require("express");
const app = express();
const mysqlRoute = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

let CONTENT;
let error;

const connection = mysqlRoute
  .createConnection({
    host: "localhost",
    user: "tenishev_303_user",
    database: "tenishev_303",
    password: "tenishev220999",
  })
  .promise();

connection.query(
  "SELECT * FROM student ORDER BY Date_of_issue_of_student_ticket DESC,student.Group_number,Surname",
  //"SELECT * FROM student JOIN number_of_course ON Course_number WHERE student.Date_of_issue_of_student_ticket = number_of_course.Beginning_of_education ORDER BY number_of_course.Course_number,student.Group_number,Surname",
  (err, results, fields) => {
    CONTENT = results;
    error = err;
  }
);

app.get("/api/yearChange", (req, res) => {
  connection.query(
    "UPDATE number_of_course SET Beginning_of_education=CONCAT(YEAR(Beginning_of_education)+1,'09', '01') WHERE Course_number=1 OR Course_number=2 OR Course_number=30 OR Course_number=4"
  );
  res.status(201);
});

app.get("/api/data", (req, res) => {
  console.log(req.body);
  connection.query(
    "SELECT * FROM student ORDER BY Date_of_issue_of_student_ticket DESC,student.Group_number,Surname",
    //"SELECT * FROM student JOIN number_of_course ON Course_number WHERE student.Date_of_issue_of_student_ticket = number_of_course.Beginning_of_education ORDER BY number_of_course.Course_number,student.Group_number,Surname",
    (err, results, fields) => {
      CONTENT = results;
    }
  );
  res.status(200).json(CONTENT);
});

app.get("/filterGroup", (req, res) => {
  console.log(req.headers.group);
  const group = req.headers.group;
  //const groupNumber = req.headers.group.slice(1, 3);
  //const course = req.headers.group[0];
  connection
    .query(
      `SELECT * FROM student WHERE student.Group_number = ${group} ORDER BY student.Group_number,Surname`
      //`SELECT * FROM student JOIN number_of_course ON Course_number WHERE student.Group_number = ${groupNumber} and number_of_course.Course_number = ${course} and student.Date_of_issue_of_student_ticket = number_of_course.Beginning_of_education ORDER BY student.Group_number,Surname`
    )
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/groupNumbers", (req, res) => {
  connection
    .query(
      "SELECT Group_number FROM student GROUP BY Group_number"
      //`SELECT DISTINCT Course_number,Group_number FROM student JOIN number_of_course WHERE student.Date_of_issue_of_student_ticket = number_of_course.Beginning_of_education GROUP BY Course_number,Group_number`
    )
    .then((results) => {
      res.status(200).json(results[0]);
    });
});

app.get("/getGraduated", (req, res) => {
  connection
    .query(
      `SELECT * FROM student  WHERE DATEDIFF(NOW(),student.Date_of_issue_of_student_ticket) >= 4*365 ORDER BY student.Group_number,Surname`
    )
    .then((results) => {
      res.status(200).json(results[0]);
    });
});

app.get("/getJustCourse", (req, res) => {
  connection
    .query(
      `SELECT DISTINCT Course_number FROM number_of_course ORDER BY Course_number`
    )
    .then((results) => {
      res.status(200).json(results[0]);
    });
});

app.get("/getJustGroupNumber", (req, res) => {
  connection
    .query(`SELECT DISTINCT Group_number FROM student ORDER BY Group_number`)
    .then((results) => {
      res.status(200).json(results[0]);
    });
});

app.get("/currentGroup:surnames", (req, res) => {
  if (req.headers.course === "4") {
    console.log(req.headers.course);
    connection
      .query(
        `SELECT DISTINCT Surname, Direction_code FROM student JOIN number_of_course WHERE (student.Group_number = ${req.headers.group} and number_of_course.Course_number = ${req.headers.course} and student.Date_of_issue_of_student_ticket = number_of_course.Beginning_of_education) OR (DATEDIFF(NOW(),student.Date_of_issue_of_student_ticket) >= 4*365 && student.Group_number = ${req.headers.group}) ORDER BY Surname`
      )
      .then((results) => {
        res.status(200).json(results[0]);
      });
  } else {
    connection
      .query(
        `SELECT DISTINCT Surname, Direction_code FROM student JOIN number_of_course WHERE student.Group_number = ${req.headers.group} and number_of_course.Course_number = ${req.headers.course} and student.Date_of_issue_of_student_ticket = number_of_course.Beginning_of_education ORDER BY Surname`
      )
      .then((results) => {
        res.status(200).json(results[0]);
      });
  }
});

app.get("/availableExams", (req, res) => {
  connection
    .query(
      `SELECT DISTINCT subject.Name, subject.Id, subject.Number_of_course FROM subject JOIN number_of_course ON Course_number JOIN student ON Direction_code WHERE subject.Study_direction_code = "${req.headers.directioncode}" AND subject.Number_of_course <= ${req.headers.course} AND student.Group_number="${req.headers.group}" AND subject.Number_of_course = number_of_course.Course_number ORDER BY subject.Name`
    )
    .then((results) => {
      console.log(results);
      res.status(200).json(results[0]);
    });
});

app.get("/getDirectionsCodes", (req, res) => {
  connection
    .query(`SELECT DISTINCT Direction_code, Group_number FROM student`)
    .then((results) => {
      console.log(results);
      res.status(200).json(results[0]);
    });
});

app.post("/api/addStudent", (req, res) => {
  const streamGroupNumber = req.body.groupNumber.value.slice(1, 3);
  connection
    .query(
      `INSERT INTO student(Surname,Name,Patronymic,Direction_code,Group_number,Gender,Date_of_birth,Number_of_student_ticket, Date_of_issue_of_student_ticket,Is_a_head_of_group)
      VALUES ("${req.body.surname.value}","${req.body.name.value}","${req.body.patronymic.value}","${req.body.directionCode.value}","${streamGroupNumber}","${req.body.gender.value}","${req.body.dateOfBirth.value}","${req.body.numberOfStudentTicket.value}","${req.body.dateOfIssueOfStudentTicket.value}","${req.body.isAHeadOfGroup.value}")`
    )
    .then((results) => {
      res.status(201);
    });
});

app.post("/api/addExam", (req, res) => {
  let id = 0;
  connection
    .query(`SELECT Id FROM student WHERE Surname="${req.body.student}"`)
    .then((results) => {
      for (key in results[0]) {
        id = results[0][key].Id;
      }
      connection
        .query(
          `INSERT INTO exam(Date,Subject_id,Student_id,Points,Mark) VALUES ("${req.body.date}","${req.body.subjectId}","${id}","${req.body.points}","${req.body.mark}")`
        )
        .then((results) => {
          console.log(done);
          res.status(201);
        });
    });
});

app.listen(9000);
