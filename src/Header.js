import React, { Component } from "react";
import { Menu, Container, Dropdown, Image, Button } from "semantic-ui-react";

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

const Header = ({ currentUser, signIn, signOut }) => (
  <Menu fixed="top" borderless>
    <Container>
      <Menu.Item header>Firebase使って遊ぼう</Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          {currentUser ? (
            <UserMenu currentUser={currentUser} signOut={signOut} />
          ) : (
            <Button primary onClick={signIn}>
              ログイン
            </Button>
          )}
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);

export default Header;
