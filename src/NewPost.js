import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Container } from "semantic-ui-react";
import post from "./post";
import routes from "./routes";

const { Input, Button, Field, TextArea } = Form;

const initialState = { title: "", content: "" };

export default class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  update = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  create = async event => {
    event.preventDefault();
    const { currentUser } = this.props;
    await post.put({ ...this.state, user: currentUser.uid });
    this.reset();
  };

  reset = () => {
    this.setState(initialState);
  };

  render() {
    const { title, content } = this.state;
    return (
      <div>
        <Card fluid>
          <Card.Content>
            <Card.Header>新規ポスト</Card.Header>
          </Card.Content>
          <Card.Content>
            <Form onSubmit={this.create}>
              <Input
                type="text"
                name="title"
                value={title}
                onChange={this.update}
                label="タイトル"
              />

              <Field>
                <label>本文</label>
                <TextArea
                  rows="10"
                  name="content"
                  value={content}
                  onChange={this.update}
                />
              </Field>

              <Container textAlign="center">
                <Button secondary type="submit">
                  投稿
                </Button>
              </Container>
            </Form>
          </Card.Content>
        </Card>
        <Container textAlign="center">
          <Link to={routes.root}>一覧に戻る</Link>
        </Container>
      </div>
    );
  }
}
