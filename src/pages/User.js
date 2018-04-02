import React, { Component } from "react";
import { Container, Header, Item, Image, Card } from "semantic-ui-react";
import Posts from "../components/Posts";
import Loading from "../components/Loading";
import store from "../store";

@store.subscribe(({ loading, users, usersPosts }, props) => ({
  loading,
  user: users.get(props.context.params.id),
  posts: usersPosts.get(props.context.params.id) || []
}))
export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, posts: [] };
  }

  componentDidMount = async () => {
    const { context: { params: { id } } } = this.props;
    store.fetchUsersPosts(id);
  };

  render() {
    const { user, posts, loading } = this.state;
    return (
      <Card fluid>
        <Loading loading={loading} />
        {user ? (
          <React.Fragment>
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
          </React.Fragment>
        ) : null}
      </Card>
    );
  }
}
