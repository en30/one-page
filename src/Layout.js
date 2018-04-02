import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import memoize from "lodash.memoize";
import page from "page";
import store from "./store";
import Header from "./components/Header";
import Message from "./components/Message";

@store.subscribe(store.select("currentUser"))
class Layout extends Component {
  render() {
    const { children } = this.props;
    const { currentUser } = this.state;
    return (
      <div>
        <Header />

        <Container style={{ marginTop: "7em" }}>
          <Message />

          <Container as="main" style={{ marginTop: "2em" }}>
            {children}
          </Container>
        </Container>
      </div>
    );
  }
}

export default Layout;
