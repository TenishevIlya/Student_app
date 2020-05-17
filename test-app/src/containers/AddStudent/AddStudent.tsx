import React from "react";
import PostStudentFormWrap from "../../components/PostStudentForm/PostStudentForm";
import "./AddStudent.style.css";

import { withRouter } from "react-router-dom";

const AddStudent: React.FC = () => {
  return (
    <PostStudentFormWrap
      formTitle="Введите данные о студенте"
      submitBtnTitle="Добавить студента"
    ></PostStudentFormWrap>
  );
};

export default withRouter(AddStudent);
