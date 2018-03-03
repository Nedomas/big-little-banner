import React, { Component } from 'react';

export default class Splash extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.headline}>
          Big Little Banner
        </div>

        <img src='/banner-rectangle.jpg' style={styles.img}/>

        <div style={styles.subheadline}>
          This little banner has big dreams - it wants to meet every person online
          <br/>
          (and maybe someday everyone else offline as well).
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
  headline: {
    fontSize: '50px',
    fontWeight: 450,
  },
  subheadline: {
    fontSize: '24px',
  },
  img: {
    margin: '50px auto 55px',
    maxWidth: '500px',
    border: '5px solid #000',
  },
};
