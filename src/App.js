import React, { Component } from "react";
import {
  Container,
  Message,
  Transition,
  Dimmer,
  Loader
} from "semantic-ui-react";
import memoize from "lodash.memoize";
import page from "page";
import "./App.css";
import session from "./api/session";
import Header from "./Header";
import Post from "./pages/Post";
import PostIndex from "./pages/PostIndex";
import NewPost from "./pages/NewPost";
import User from "./pages/User";
import routes from "./routes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      message: { content: null, color: "green", visible: false },
      loading: false
    };
    page("/", this.dispatch(PostIndex));
    page("/posts/new", this.requireAuthentication, this.dispatch(NewPost));
    page("/posts/:id", this.dispatch(Post));
    page("/users/:id", this.dispatch(User));
    session.onChange(currentUser => this.setState({ currentUser }));
  }

  componentWillMount() {
    page();
  }

  requireAuthentication = (ctx, next) => {
    if (this.state.currentUser) return next();
    this.message.alert("ログインが必要です");
    page("/");
  };

  dispatch = component => context => {
    this.setState({ component, context });
  };

  signIn = async () => {
    const currentUser = await session.create();
    this.message.info("ログインしました");
    this.setState({ currentUser });
  };

  signOut = async () => {
    await session.destroy();
    this.setState({ currentUser: null });
    this.message.info("ログアウトしました");
    page("/");
  };

  message = {
    info: content =>
      this.setState({ message: { content, color: "green", visible: true } }),
    alert: content =>
      this.setState({ message: { content, color: "yellow", visible: true } }),
    dismiss: () =>
      this.setState({ message: { ...this.state.message, visible: false } })
  };

  loading = async af => {
    try {
      this.setState({ loading: true });
      return await af();
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { currentUser, message, loading, context } = this.state;
    const C = this.state.component;
    return (
      <div>
        <div className="App">
          {loading ? (
            <Dimmer active>
              <Loader />
            </Dimmer>
          ) : null}

          <Header
            currentUser={currentUser}
            signIn={this.signIn}
            signOut={this.signOut}
          />

          <Container style={{ marginTop: "7em" }}>
            <Transition
              visible={message.visible}
              duration={{ show: 200, hide: 500 }}
            >
              <Message color={message.color} onDismiss={this.message.dismiss}>
                {message.content}
              </Message>
            </Transition>

            <Container as="main" style={{ marginTop: "2em" }}>
              <C
                context={context}
                currentUser={currentUser}
                loading={this.loading}
              />
            </Container>
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
