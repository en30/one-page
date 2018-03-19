import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Container,
  Message,
  Transition,
  Dimmer,
  Loader
} from "semantic-ui-react";
import memoize from "lodash.memoize";
import "./App.css";
import session from "./api/session";
import Header from "./Header";
import Post from "./Post";
import Posts from "./Posts";
import NewPost from "./NewPost";
import routes from "./routes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      message: { content: null, color: "green", visible: false },
      loading: false
    };
    session.onChange(currentUser => this.setState({ currentUser }));
  }

  signIn = async () => {
    const currentUser = await session.create();
    this.setState({ currentUser });
  };

  signOut = async () => {
    await session.destroy();
    this.setState({ currentUser: null });
  };

  message = {
    info: content =>
      this.setState({ message: { content, color: "green", visible: true } }),
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

  appendProps = memoize((Comp, appended) => props => (
    <Comp {...props} {...appended} />
  ));

  render() {
    const { currentUser, message, loading } = this.state;
    return (
      <BrowserRouter>
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
              <Switch>
                <Route
                  exact
                  path={routes.root}
                  component={this.appendProps(Posts, { loading: this.loading })}
                />
                <Route path={routes.posts.new}>
                  {props => (
                    <NewPost
                      {...props}
                      currentUser={currentUser}
                      setMessage={this.message.info}
                    />
                  )}
                </Route>
                <Route
                  path={routes.posts.show()}
                  component={this.appendProps(Post, { loading: this.loading })}
                />
              </Switch>
            </Container>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
