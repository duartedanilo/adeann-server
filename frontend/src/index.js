import React, { Component } from 'react';
import { render } from 'react-dom';
import Main from './pages/Main';
import './style.css';

class App extends Component {
  render() {
    return (
          <Main />
    );
  }
}

render(<App />, document.getElementById('root'));
