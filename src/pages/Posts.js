import React, { Component } from "react";
import { Container, Header, Item, Image } from "semantic-ui-react";
import Link, { push } from "../Link";
import routes from "../routes";
import post from "../api/post";

export default class Posts extends Component {
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
      <div>
        <Header>最新のポスト一覧</Header>

        <Item.Group link>
          {posts.map(post => (
            <Item
              key={post.id}
              onClick={() => push(routes.posts.show(post.id))}
            >
              <Item.Image avatar size="mini" src={post.user.photoURL} />
              <Item.Content verticalAlign="middle">
                <Item.Header>{post.title}</Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>

        <Container textAlign="center">
          <Link to={routes.posts.new}>新規作成</Link>
        </Container>
      </div>
    );
  }
}
