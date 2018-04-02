import firebase from "firebase";
import page from "page";
import pick from "lodash.pick";
import userApi from "./api/user";
import postApi from "./api/post";
import session from "./api/session";
import { Map } from "immutable";

const callbacks = [];
let store = {
  loading: false,
  currentUser: null,
  message: { content: null, color: "green", visible: false },
  latestPosts: [],
  usersPosts: new Map(),
  posts: new Map(),
  users: new Map()
};

const change = () => {
  callbacks.forEach(f => f(store));
};

const assign = vals => {
  store = { ...store, ...vals };
  change();
};

const initialize = () => {
  const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: "",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
  };
  firebase.initializeApp(config);
  session.onChange(currentUser => assign({ currentUser }));
};

const fetchLatestPosts = async () => {
  if (store.latestPosts.length !== 0) return store.latestPosts;
  assign({ loading: true });
  const latestPosts = await postApi.index();
  const posts = latestPosts.reduce((s, e) => s.set(e.id, e), store.posts);
  assign({ latestPosts, posts, loading: false });
  return posts;
};

const findPost = async id => {
  if (store.posts.has(id)) return store.posts.get(id);
  assign({ loading: true });
  const post = await postApi.show(id);
  const posts = store.posts.set(id, post);
  assign({ posts, loading: false });
};

const fetchUser = async id => {
  if (store.users.has(id)) return store.users.get(id);
  assign({ loading: true });
  const user = await userApi.show(id);
  const users = store.users.set(id, user);
  assign({ users, loading: false });
  return user;
};

const fetchUsersPosts = async id => {
  if (store.usersPosts.has(id)) return store.usersPosts.get(id);
  assign({ loading: true });
  const user = await fetchUser(id);
  const posts = await postApi.users(user);
  const usersPosts = store.usersPosts.set(id, posts);
  const newPosts = posts.reduce((s, e) => s.set(e.id, e), store.posts);
  assign({ usersPosts, posts: newPosts, loading: false });
};

const message = {
  info: content => ({ content, color: "green", visible: true }),
  alert: content => ({ content, color: "yellow", visible: true })
};

const alertMessage = msg => {
  assign({ message: message.alert(msg) });
};

const dismissMessage = () => {
  assign({ message: { visible: false } });
};

const signIn = async () => {
  const currentUser = await session.create();
  assign({ currentUser, message: message.info("ログインしました") });
};

const signOut = async () => {
  await session.destroy();
  assign({ currentUser: null, message: message.info("ログアウトしました") });
  page("/");
};

const onChange = f => {
  callbacks.push(f);
};

const select = (...keys) => state => pick(state, keys);

const enhance = (Class, selector) =>
  class extends Class {
    constructor(props) {
      super(props);
      this.state = { ...this.state, ...selector(store, props) };
      onChange(store => this.setState(selector(store, props)));
    }
  };

const subscribe = selector => Class => (...args) => {
  const C = enhance(Class, selector);
  return new C(...args);
};

export default {
  initialize,
  subscribe,
  select,
  fetchLatestPosts,
  findPost,
  fetchUser,
  fetchUsersPosts,
  alertMessage,
  signIn,
  signOut,
  dismissMessage,
  onChange
};
