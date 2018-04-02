import React, { Component } from "react";
import { Container, Message, Transition } from "semantic-ui-react";
import store from "../store";

@store.subscribe(store.select("message"))
export default class extends Component {
  static displayName = "Message";
  render() {
    const { message } = this.state;
    return (
      <Transition visible={message.visible} duration={{ show: 200, hide: 500 }}>
        <Message color={message.color} onDismiss={store.dismissMessage}>
          {message.content}
        </Message>
      </Transition>
    );
  }
}
