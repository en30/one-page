import React, { Component } from "react";
import { Container, Header, Item, Image, Card } from "semantic-ui-react";
import Link, { push } from "../components/Link";
import routes from "../routes";
import Posts from "../components/Posts";
import Loading from "../components/Loading";
import store from "../store";

@store.subscribe(store.select("loading", "latestPosts"))
export default class PostIndex extends Component {
  componentDidMount() {
    store.fetchLatestPosts();
  }

  render() {
    const { latestPosts, loading } = this.state;
    return (
      <Card fluid>
        <Card.Content>
          <Header>最新のポスト一覧</Header>
        </Card.Content>

        <Card.Content>
          <Loading loading={loading} />
          <Posts posts={latestPosts} />
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
