import React, { Component } from "react";
import { Container, Header, Item, Image, Card } from "semantic-ui-react";
import Link, { push } from "../Link";
import routes from "../routes";
import post from "../api/post";
import Posts from "../components/Posts";

export default class PostIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  componentDidMount = async () => {
    const posts = await this.props.loading(post.index);
    this.setState({ posts });
  };

  render() {
    const { posts } = this.state;
    return (
      <Card fluid>
        <Card.Content>
          <Header>最新のポスト一覧</Header>
        </Card.Content>

        <Card.Content>
          <Posts posts={posts} />
        </Card.Content>

        <Card.Content>
          <Container textAlign="center">
            <Link to={routes.posts.new}>新規作成</Link>
          </Container>
        </Card.Content>
      </Card>
    );
  }
}