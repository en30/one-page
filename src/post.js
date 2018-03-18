import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Header, Loader, Dimmer } from "semantic-ui-react";
import api from "./api/post";
import routes from "./routes";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { post: null };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    this.props.loading.start();
    const post = await api.show(id);
    this.props.loading.stop();
    this.setState({ post });
  };

  render() {
    const { post } = this.state;
    return (
      <div>
        <Container textAlign="center">
          <Link to={routes.root}>一覧に戻る</Link>
        </Container>

        {post ? (
          <Container style={{ paddingTop: "3em" }}>
            <Header>{post.title}</Header>
            <Container as="article">{post.content}</Container>
          </Container>
        ) : null}
      </div>
    );
  }
}
