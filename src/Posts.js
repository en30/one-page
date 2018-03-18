import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Header, Item, Image } from "semantic-ui-react";
import post from "./api/post";
import routes from "./routes";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: {} };
  }

  componentDidMount = async () => {
    this.props.loading.start();
    const posts = await post.index();
    this.props.loading.stop();
    this.setState({ posts });
  };

  render() {
    const { history } = this.props;
    const { posts } = this.state;
    return (
      <div>
        <Header>最新のポスト一覧</Header>

        <Item.Group link>
          {Object.values(posts).map(post => (
            <Item
              key={post.id}
              onClick={() => history.push(routes.posts.show(post.id))}
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
