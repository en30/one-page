import React, { Component } from "react";
import { Container, Header, Item, Image, Card } from "semantic-ui-react";
import postApi from "../api/post";
import api from "../api/user";
import Posts from "../components/Posts";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, posts: [] };
  }

  componentDidMount = async () => {
    const { context: { params: { id } } } = this.props;
    const user = await this.props.loading(() => api.show(id));
    this.setState({ user });
    const posts = await this.props.loading(() => postApi.users(user));
    this.setState({ posts });
  };

  render() {
    const { user, posts } = this.state;
    if (user === null) return null;
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            <Image src={user.photoURL} /> {user.displayName}のpost
          </Card.Header>
          <Card.Meta style={{ marginTop: "0.5em" }}>
            投稿{posts.length}件
          </Card.Meta>
        </Card.Content>

        <Card.Content>
          <Posts posts={posts} />
        </Card.Content>
      </Card>
    );
  }
}
