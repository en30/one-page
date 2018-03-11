import React, { Component } from "react";
import "./App.css";
import session from "./session";
import post from "./post";
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
        <div className="App-intro">
          <div>よう {currentUser ? currentUser.displayName : "匿名"}</div>
          {currentUser ? (
            <div>
              <button onClick={this.signOut}>ログアウト</button>
              <PostForm currentUser={currentUser} />
            </div>
          ) : (
            <button onClick={this.signIn}>ログイン</button>
          )}
        </div>

        <ul>
          {Object.values(posts).map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
