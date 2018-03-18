import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "./App.css";
import session from "./session";
import Header from "./Header";
import Posts from "./Posts";
import NewPost from "./NewPost";
import routes from "./routes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null, posts: {} };
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

  render() {
    const { currentUser } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <Header
            currentUser={currentUser}
            signIn={this.signIn}
            signOut={this.signOut}
          />

          <Container as="main" style={{ marginTop: "7em" }}>
            <Switch>
              <Route exact path={routes.root} component={Posts} />
              <Route path={routes.posts.new}>
                {props => <NewPost {...props} currentUser={currentUser} />}
              </Route>
            </Switch>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
