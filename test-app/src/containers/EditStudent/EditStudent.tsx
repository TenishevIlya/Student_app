import React, { Component } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import PostStudentFormWrap from "../../components/PostStudentForm/PostStudentForm";
import store from "../../store/store";

class EditStudent extends Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <PostStudentFormWrap
        formTitle="Редактирование информации о студенте"
        submitBtnTitle="Изменить информацию"
      ></PostStudentFormWrap>
    );
  }
}

export default EditStudent;
