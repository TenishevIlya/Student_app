import React, { Component } from "react";
import {
  IAddGroupAndDirectionProps,
  IAddGroupAndDirectionState,
} from "./AddGroupAndDirection.type";
import { Col, Form, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class AddGroupAndDirection extends Component<
  IAddGroupAndDirectionProps,
  IAddGroupAndDirectionState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      groupNumber: "",
      directionName: "",
      directionCode: "",
    };

    this.addNewGroup = this.addNewGroup.bind(this);
    this.addNewDirection = this.addNewDirection.bind(this);
    this.addGroupAndDirection = this.addGroupAndDirection.bind(this);
  }

  addNewGroup() {
    fetch("http://localhost:9000/api/addGroup", {
      method: "POST",
      cache: "reload",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        groupNumber: this.state.groupNumber,
      }),
    }).then((res) => {
      return res.json();
    });
  }

  addNewDirection() {
    fetch("http://localhost:9000/api/addDirection", {
      method: "POST",
      cache: "reload",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        directionName: this.state.directionName,
        directionCode: this.state.directionCode,
      }),
    }).then((res) => {
      return res.json();
    });
  }

  async addGroupAndDirection() {
    await this.addNewGroup();
    await this.addNewDirection();
  }

  render() {
    return (
      <Container className="mt-3">
        <Col lg={6}>
          <Form.Group controlId="formGroupNumber">
            <Form.Label>Номер новой группы без номера курса</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите номер новой группы"
              onBlur={(event: any) => {
                this.setState({ groupNumber: event.target.value });
              }}
            />
          </Form.Group>
          <Form.Group controlId="formDirectionNane">
            <Form.Label>Введите название нового направления</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите название нового направления"
              onBlur={(event: any) =>
                this.setState({ directionName: event.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formDirectionCode">
            <Form.Label>Введите код нового направления</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите код нового направления"
              onBlur={(event: any) =>
                this.setState({ directionCode: event.target.value })
              }
            />
          </Form.Group>
          <Link to="/addStudent">
            <Button
              variant="secondary"
              block
              onClick={this.addGroupAndDirection}
            >
              Добавить группу и направление
            </Button>
          </Link>
        </Col>
      </Container>
    );
  }
}

export default AddGroupAndDirection;
