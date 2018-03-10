import React, { Component } from 'react';
import './App.css';
import session from './session';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null };    
    session.onChange((currentUser) => this.setState({ currentUser }))
  }
  
  signIn = async () => {
    const currentUser = await session.create();    
    this.setState({ currentUser });
  }
  
  signOut = async () => {
    await session.destroy();
    this.setState({ currentUser: null });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="App">
        <p className="App-intro">
          よう { currentUser ? currentUser.displayName : '匿名' }<br />
          {currentUser ? 
             <button onClick={this.signOut}>ログアウト</button>
           : <button onClick={this.signIn}>ログイン</button>}            
        </p>
      </div>
    );
  }
}

export default App;
