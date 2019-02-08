import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './ducks/store'
import './App.css';

import Nav from './component/Nav/Nav'
import routes from './routes'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Nav />
            {routes}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
