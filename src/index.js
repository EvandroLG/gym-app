import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main';

class App extends Component {
  render() {
    return (
      <div>
        <Main />
      </div>
    )
  }
};

ReactDOM.render(<App />, document.getElementById('root'));