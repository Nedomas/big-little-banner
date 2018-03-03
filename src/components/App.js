import React, { Component } from 'react';

import Splash from './Splash';

export default class App extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Splash />
      </div>
    );
  }
}

const styles = {
  container: {
    padding: '50px 0',
  },
};
