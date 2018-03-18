import React, { Component } from "react";
import { Link } from "react-router-dom";
import post from "./post";
import routes from "./routes";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: {} };
  }

  componentDidMount = async () => {
    const posts = await post.index();
    this.setState({ posts });
  };

  render() {
    const { posts } = this.state;
    return (
      <div>
        <Link to={routes.posts.new}>新規作成</Link>
        <ul>
          {Object.values(posts).map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}
