export default {
  root: "/",
  posts: {
    show: id => (id ? `/posts/${id}` : `/posts/:id`),
    new: "/posts/new"
  }
};
