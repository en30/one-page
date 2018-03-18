import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Header, Loader, Dimmer } from "semantic-ui-react";
import api from "./api/post";
import routes from "./routes";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { post: null, loading: true };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const post = await api.show(id);
    this.setState({ post, loading: false });
  };

  render() {
    const { post, loading } = this.state;
    return (
      <div>
        <Container textAlign="center">
          <Link to={routes.root}>一覧に戻る</Link>
        </Container>

        {loading ? (
          <Dimmer active>
            <Loader />
          </Dimmer>
        ) : (
          <Container style={{ paddingTop: "3em" }}>
            <Header>{post.title}</Header>
            <Container as="article">{post.content}</Container>
          </Container>
        )}
      </div>
    );
  }
}
