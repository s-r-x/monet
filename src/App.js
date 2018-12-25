// css
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'reset-css/reset.css';
import './App.css';

import './closestPolyfill';
import 'promise-polyfill/src/polyfill';

import React, { Component } from 'react';
import theme from './theme';
import { ThemeProvider } from 'styled-components';
import Router from './components/Router';


class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router/>
      </ThemeProvider>
    );
  }
}

export default App;
