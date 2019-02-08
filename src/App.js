import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom'
import './App.css';

import Nav from './component/Nav/Nav'
import routes from './routes'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          {routes}
        </div>
      </Router>
    );
  }
}

export default App;
