import React, { Component } from "react";
import { Container, Card, Image } from "semantic-ui-react";
import Link from "../components/Link";
import Loading from "../components/Loading";
import routes from "../routes";
import store from "../store";

const PostUser = ({ user }) => (
  <Card.Content>
    <Image avatar src={user.photoURL} />
    <Link to={routes.users.show(user.id)}>{user.displayName}</Link>
  </Card.Content>
);

@store.subscribe(({ loading, posts }, props) => ({
  loading,
  post: posts.get(props.context.params.id)
}))
export default class Post extends Component {
  componentDidMount = async () => {
    const { context: { params: { id } } } = this.props;
    store.findPost(id);
  };

  render() {
    const { post, loading } = this.state;
    return (
      <div>
        <Container textAlign="center">
          <Link to={routes.root}>一覧に戻る</Link>
        </Container>

        <Loading loading={loading} />
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
