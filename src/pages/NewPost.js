import React, { Component } from "react";
import { Card, Form, Container } from "semantic-ui-react";
import Link, { push } from "../Link";
import post from "../api/post";
import routes from "../routes";

const { Input, Button, Field, TextArea } = Form;

const initialPost = { title: "", content: "" };

export default class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialPost, loading: false };
  }

  update = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  create = async event => {
    event.preventDefault();
    const { currentUser, setMessage } = this.props;
    const { title, content } = this.state;
    this.setState({ loading: true });
    try {
      await post.create({ title, content, user: currentUser.uid });
      this.reset();
      setMessage("ポストを作成しました！");
      push(routes.root);
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ loading: false });
    }
  };

  reset = () => {
    this.setState(initialPost);
  };

  render() {
    const { title, content, loading } = this.state;
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
                <Button secondary type="submit" loading={loading}>
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
