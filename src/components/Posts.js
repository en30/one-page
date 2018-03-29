import React, { Component } from "react";
import { Feed } from "semantic-ui-react";
import Link, { push } from "../Link";
import routes from "../routes";

const Posts = ({ posts }) => (
  <Feed>
    {posts.map(post => (
      <Feed.Event
        key={post.id}
        onClick={() => push(routes.posts.show(post.id))}
        as="a"
      >
        <Feed.Label image={post.user.photoURL} />
        <Feed.Content>
          <Feed.Date content={new Date(post.createdAt).toLocaleString()} />
          <Feed.Summary>{post.title}</Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    ))}
  </Feed>
);

export default Posts;
