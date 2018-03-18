import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container, Message, Transition } from "semantic-ui-react";
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
      message: null
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

  render() {
    const { currentUser, message, messageVisible } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
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
                <Route exact path={routes.root} component={Posts} />
                <Route path={routes.posts.new}>
                  {props => (
                    <NewPost
                      {...props}
                      currentUser={currentUser}
                      setMessage={this.setMessage}
                    />
                  )}
                </Route>
                <Route path={routes.posts.show()} component={Post} />
              </Switch>
            </Container>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
