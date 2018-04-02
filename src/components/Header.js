import React, { Component } from "react";
import { Menu, Container, Dropdown, Image, Button } from "semantic-ui-react";
import Link from "./Link";
import store from "../store";
import routes from "../routes";

const User = ({ user }) => (
  <span>
    <Image avatar src={user.photoURL} alt="プロフィール画像" />
    {user.displayName}
  </span>
);

const UserMenu = ({ currentUser, signOut }) => (
  <Dropdown trigger={<User user={currentUser} />}>
    <Dropdown.Menu>
      <Dropdown.Item onClick={signOut}>ログアウト</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

@store.subscribe(store.select("currentUser"))
export default class Header extends Component {
  render() {
    const { currentUser } = this.state;
    return (
      <Menu fixed="top" borderless>
        <Container>
          <Menu.Item header>
            <Link to={routes.root} style={{ color: "inherit" }}>
              Firebase使って遊ぼう
            </Link>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              {currentUser ? (
                <UserMenu currentUser={currentUser} signOut={store.signOut} />
              ) : (
                <Button primary onClick={store.signIn}>
                  ログイン
                </Button>
              )}
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}
