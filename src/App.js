import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Container,
  Message,
  Transition,
  Dimmer,
  Loader
} from "semantic-ui-react";
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
      posts: {},
      messageVisible: false,
      message: null,
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

  setMessage = message => {
    this.setState({ message, messageVisible: true });
  };

  resetMessage = () => {
    this.setState({ messageVisible: false });
  };

  dismissMessage = () => {
    this.setState({ messageVisible: false });
  };

  startLoading = () => {
    this.setState({ loading: true });
  };

  stopLoading = () => {
    this.setState({ loading: false });
  };

  render() {
    const { currentUser, message, messageVisible, loading } = this.state;
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
              visible={messageVisible}
              duration={{ show: 200, hide: 500 }}
              onHide={this.resetMessage}
            >
              <Message positive onDismiss={this.dismissMessage}>
                {message}
              </Message>
            </Transition>

            <Container as="main" style={{ marginTop: "2em" }}>
              <Switch>
                <Route exact path={routes.root}>
                  {props => (
                    <Posts
                      {...props}
                      startLoading={this.startLoading}
                      stopLoading={this.stopLoading}
                    />
                  )}
                </Route>
                <Route path={routes.posts.new}>
                  {props => (
                    <NewPost
                      {...props}
                      currentUser={currentUser}
                      setMessage={this.setMessage}
                    />
                  )}
                </Route>
                <Route path={routes.posts.show()}>
                  {props => (
                    <Post
                      {...props}
                      startLoading={this.startLoading}
                      stopLoading={this.stopLoading}
                    />
                  )}
                </Route>
              </Switch>
            </Container>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
