export default {
  root: "/",
  posts: {
    show: id => (id ? `/posts/${id}` : `/posts/:id`),
    new: "/posts/new"
  },
  users: {
    show: id => (id ? `/users/${id}` : `/users/:id`)
  }
};
