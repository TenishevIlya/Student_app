import React, { Component } from "react";
import PostStudentFormWrap from "../../components/PostStudentForm/PostStudentForm";

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
