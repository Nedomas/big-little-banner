import React, { Component } from 'react';
import Radium from 'radium';
import { compose } from 'redux';
import windowSize from 'react-window-size';

class Splash extends Component {
  buttonContent() {
    const {
      mining,
      done,
    } = this.props;

    if (mining) {
      return 'Woohoo! Mining just for a few seconds...';
    }

    if (done) {
      return 'Thank you!';
    }

    return 'Mine Bitcoin for 3 seconds';
  }

  render() {
    const small = this.props.windowWidth <= 650;

    return (
      <div style={styles.container}>
        <div style={styles.top.container}>
          <div style={styles.top.headline}>
            Big Little Banner
          </div>

          <img src='/banner-rectangle@4x.jpg' style={styles.top.img} alt='banner'/>
        </div>

        <div style={[styles.bottom.container, small && styles.small.bottom.container]}>
          <div style={styles.bottom.subheadline}>
            This little banner has big dreams - it wants to meet every person online.

            <span style={styles.bottom.emphasis}>
              Help me meet more people by funding this campaign.
            </span>
          </div>
          <div style={styles.bottom.buttonContainer}>
            <div style={styles.bottom.button} onClick={() => this.props.runMiner(3000)}>
              {this.buttonContent()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  windowSize,
  Radium,
)(Splash);

const styles = {
  container: {
    // minHeight: '100vh',
  },
  top: {
    container: {
      textAlign: 'center',
    },
    headline: {
      fontSize: '50px',
      fontWeight: 450,
      textAlign: 'center',
    },
    img: {
      margin: '40px auto 45px',
      maxWidth: '400px',
      border: '5px solid #000',
      width: '100%',
    },
  },
  bottom: {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    subheadline: {
      fontSize: '22px',
    },
    emphasis: {
      paddingLeft: '5px',
      fontWeight: 550,
    },
    buttonContainer: {
      width:'100%',
    },
    button: {
      color: '#fff',
      backgroundColor: '#000',
      border: '3px solid #000',
      fontSize: '18px',
      padding: '10px 20px',
      fontWeight: 450,
      cursor: 'pointer',
      // maxWidth: '350px',
      // minWidth:'230px',
      textAlign: 'center',
    },
  },
  small: {
    bottom: {
      container: {
        display: 'block',
      },
    },
  },
};
