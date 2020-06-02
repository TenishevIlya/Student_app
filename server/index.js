const express = require("express");
const app = express();
const mysqlRoute = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const fs = require("fs");

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
  (err, results, fields) => {
    CONTENT = results;
    error = err;
  }
);

app.get("/download", (req, res) => {
  // console.log("get");
  // fs.open("testFile.txt", "w", (err) => {
  //   if (err) throw err;
  //   console.log("File created");
  // });
  // fs.appendFile("testFile.txt", " This line is beyond the end.", (err) => {
  //   if (err) throw err;
  //   console.log("Data has been added!");
  // });
  res.sendFile(__dirname + "/testFile.txt");
});

// app.get("/api/yearChange", (req, res) => {
//   connection.query(
//     "UPDATE number_of_course SET Beginning_of_education=CONCAT(YEAR(Beginning_of_education)+1,'09', '01') WHERE Course_number=1 OR Course_number=2 OR Course_number=30 OR Course_number=4"
//   );
//   res.status(201);
// });

app.get("/api/data", (req, res) => {
  connection.query(
    "SELECT * FROM student ORDER BY Date_of_issue_of_student_ticket DESC,student.Group_number,Surname",
    (err, results, fields) => {
      CONTENT = results;
    }
  );
  res.status(200).json(CONTENT);
});

app.get("/filterGroup", (req, res) => {
  const group = req.headers.group;
  const year = req.headers.year;
  const course = req.headers.course;
  connection
    .query(
      `SELECT * FROM student WHERE student.Group_number = ${group} and (student.Date_of_issue_of_student_ticket = '${year}' OR (student.Date_of_issue_of_student_ticket < '${year}' AND ${course} = 4)) ORDER BY student.Group_number,Surname`
    )
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/groupNumbers", (req, res) => {
  connection.query("SELECT Group_number FROM 	group_numbers").then((results) => {
    res.status(200).json(results[0]);
  });
});

app.get("/getDirectionName", (req, res) => {
  connection.query(`SELECT * FROM directions`, (err, results) => {
    res.status(200).json(results);
  });
});

app.get("/checkHeadOfGroup", (req, res) => {
  const streamGroupNumber = req.headers.group.slice(1, 3);
  connection.query(
    `SELECT sum(case when Is_a_head_of_group = 1 then 1 else 0 end) HeadOfGroup FROM student WHERE Group_number='${streamGroupNumber}' AND Date_of_issue_of_student_ticket='${req.headers.issuedate}'`,
    (err, results) => {
      res.status(200).json(results);
    }
  );
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
      `SELECT DISTINCT subject.Name, subject.Id FROM subject JOIN student ON Direction_code WHERE subject.Study_direction_code = "${req.headers.directioncode}" AND subject.Number_of_course = "${req.headers.examscourse}" AND student.Group_number="${req.headers.group}" AND subject.Number_of_course = "${req.headers.examscourse}" ORDER BY subject.Name`
    )
    .then((results) => {
      res.status(200).json(results[0]);
    });
});

app.get("/getDirectionsCodes", (req, res) => {
  connection
    .query(`SELECT DISTINCT Direction_code, Group_number FROM student`)
    .then((results) => {
      res.status(200).json(results[0]);
    });
});

app.get("/getCurrentStudentExams", (req, res) => {
  connection
    .query(
      `SELECT DISTINCT exam.Subject_id, exam.Student_id, exam.Date, exam.Points, exam.Mark, subject.Name, subject.Number_of_course FROM exam JOIN subject WHERE exam.Student_id=${req.headers.id} AND exam.Subject_id = subject.id ORDER BY exam.Date`
    )
    .then((results) => {
      res.status(200).json(results[0]);
    });
});

app.post("/api/addStudent", (req, res) => {
  const streamGroupNumber = req.body.groupNumber.value.slice(1, 3);
  connection
    .query(
      `INSERT INTO student(Surname,Name,Patronymic,Direction_code,Group_number,Gender,Date_of_birth,Number_of_student_ticket, Date_of_issue_of_student_ticket,Is_a_head_of_group)
      VALUES ("${req.body.surname.value}","${req.body.name.value}","${req.body.patronymic.value}","${req.body.directionCode.value}","${streamGroupNumber}","${req.body.gender}","${req.body.dateOfBirth.value}","${req.body.numberOfStudentTicket.value}","${req.body.dateOfIssueOfStudentTicket.value}","${req.body.isAHeadOfGroup}")`
    )
    .then(
      connection.query(
        "SELECT * FROM student ORDER BY Date_of_issue_of_student_ticket DESC,student.Group_number,Surname",
        (err, results, fields) => {
          res.status(201).json(results);
        }
      )
    );
});

app.post("/api/addGroup", (req, res) => {
  connection.query(
    `INSERT INTO group_numbers VALUES("${req.body.groupNumber}")`,
    (err, results) => {
      res.status(201).json(results);
    }
  );
});

app.post("/api/addDirection", (req, res) => {
  console.log(req.body);
  connection.query(
    `INSERT INTO directions(Name, Code_of_direction) VALUES("${req.body.directionName}","${req.body.directionCode}")`,
    (err, results) => {
      res.status(201).json(results);
    }
  );
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
          res.status(201).json(results);
        });
    });
});

app.put("/api/editStudent", (req, res) => {
  const streamGroupNumber = req.body.groupNumber.value.slice(1, 3);
  connection
    .query(
      `UPDATE student SET Surname="${req.body.surname.value}", Name="${req.body.name.value}", Patronymic="${req.body.patronymic.value}", Direction_code="${req.body.directionCode.value}", Group_number="${streamGroupNumber}", Gender="${req.body.gender}", Date_of_birth="${req.body.dateOfBirth.value}", Number_of_student_ticket="${req.body.numberOfStudentTicket.value}", Date_of_issue_of_student_ticket="${req.body.dateOfIssueOfStudentTicket.value}", Is_a_head_of_group="${req.body.isAHeadOfGroup}" WHERE Id=${req.body.id}`
    )
    .then((results) => {
      res.status(201).json(results);
    });
});

app.put("/api/editExam", (req, res) => {
  connection
    .query(
      `UPDATE exam SET Date="${req.body.date}", Points="${req.body.points}", Mark="${req.body.mark}" WHERE Subject_Id="${req.body.subjectId}"`
    )
    .then((results) => {
      res.status(201).json(results);
    });
});

app.delete("/api/deleteExamInfo", (req, res) => {
  connection
    .query(
      `DELETE FROM exam WHERE Subject_Id="${req.body.deleteSubjectId}" AND Student_Id="${req.body.deleteStudentId}"`
    )
    .then((results) => {
      res.status(200).json(results);
    });
});

app.delete("/api/deleteStudent", (req, res) => {
  connection
    .query(`DELETE FROM student WHERE Id="${req.body.id}"`)
    .then((results) => {
      res.status(200).json(results);
    });
});

app.delete("/api/deleteExamsForCurrentStudent", (req, res) => {
  connection
    .query(`DELETE FROM exam WHERE Student_id="${req.body.id}"`)
    .then((results) => {
      res.status(200).json(results);
    });
});

app.listen(9000);
