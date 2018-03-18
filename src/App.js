import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import "./App.css";
import session from "./session";
import post from "./post";
import Header from "./Header";
import PostForm from "./PostForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null, posts: {} };
    session.onChange(currentUser => this.setState({ currentUser }));
  }

  componentDidMount = async () => {
    const posts = await post.index();
    this.setState({ posts });
  };

  signIn = async () => {
    const currentUser = await session.create();
    this.setState({ currentUser });
  };

  signOut = async () => {
    await session.destroy();
    this.setState({ currentUser: null });
  };

  render() {
    const { currentUser, posts } = this.state;
    return (
      <div className="App">
        <Header
          currentUser={currentUser}
          signIn={this.signIn}
          signOut={this.signOut}
        />

        <Container as="main" style={{ marginTop: "7em" }}>
          <PostForm currentUser={currentUser} />

          <ul>
            {Object.values(posts).map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </Container>
      </div>
    );
  }
}

export default App;
