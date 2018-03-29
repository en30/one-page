import React, { Component } from "react";
import { Container, Card, Image } from "semantic-ui-react";
import Link from "../Link";
import api from "../api/post";
import routes from "../routes";

const PostUser = ({ user }) => (
  <Card.Content>
    <Image avatar src={user.photoURL} />
    <Link to={routes.users.show(user.id)}>{user.displayName}</Link>
  </Card.Content>
);

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { post: null };
  }

  componentDidMount = async () => {
    const { context: { params: { id } } } = this.props;
    const post = await this.props.loading(() => api.show(id));
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
          <Card fluid>
            <PostUser user={post.user} />
            <Card.Content as="article">
              <Card.Header as="h1">{post.title}</Card.Header>
              <Card.Description>{post.content}</Card.Description>
            </Card.Content>
          </Card>
        ) : null}
      </div>
    );
  }
}
