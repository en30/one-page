import React, { Component } from "react";
import post from "./post";

const initialState = { title: "", content: "" };

export default class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  update = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  create = async event => {
    event.preventDefault();
    const { currentUser } = this.props;
    await post.put({ ...this.state, user: currentUser.uid });
    this.reset();
  };

  reset = () => {
    this.setState(initialState);
  };

  render() {
    const { title, content } = this.state;
    return (
      <form onSubmit={this.create}>
        <section>
          <label>
            タイトル
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.update}
            />
          </label>
        </section>

        <section>
          <label>
            本文
            <textarea name="content" value={content} onChange={this.update} />
          </label>
        </section>

        <input type="submit" value="投稿" />
      </form>
    );
  }
}
