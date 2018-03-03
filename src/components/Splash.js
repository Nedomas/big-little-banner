import React, { Component } from 'react';
import Radium from 'radium';

class Splash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mining: false,
      done: false,
    };
  }

  handleClick() {
    const miner = new window.CoinHive.Anonymous('mQP1bMv6L3C3nWP2rJeaWYBvj9xfa6Zm', {throttle: 0.3});
    miner.start();

    this.setState({
      mining: true,
    });

    setTimeout(() => {
      miner.stop();

      this.setState({
        mining: false,
        done: true,
      });
    }, 5000);
  }

  buttonText() {
    const {
      mining,
      done,
    } = this.state;

    if (mining) {
      return 'Woohoo! Mining just for a few seconds...';
    }

    if (done) {
      return "Thanks! You've just funded my next 1000 dates!";
    }

    return 'Mine Bitcoin for 3 seconds';
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.headline}>
          Big Little Banner
        </div>

        <img src='/banner-rectangle@4x.jpg' style={styles.img}/>

        <div style={styles.subheadline}>
          This little banner has big dreams - it wants to meet every person online
          <br/>
          (and maybe someday everyone else offline as well).
        </div>

        <div style={styles.funding.container}>
          <div style={styles.funding.headline}>
            Help me see meet more people by funding this campaign
          </div>

          <button style={styles.funding.button} onClick={() => this.handleClick()}>
            {this.buttonText()}
          </button>
        </div>

      </div>
    );
  }
}

export default Radium(Splash);

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
    margin: '40px auto 45px',
    maxWidth: '430px',
    border: '5px solid #000',
  },
  funding: {
    container: {
      padding: '50px 0',
      maxWidth: '430px',
      margin: '0 auto',
    },
    headline: {
      fontSize: '30px',
      fontWeight: 450,
      marginBottom: '20px',
    },
    button: {
      backgroundColor: '#fff',
      border: '3px solid #000',
      fontSize: '18px',
      padding: '10px 20px',
      fontWeight: 450,
      cursor: 'pointer',

      ':hover': {
        backgroundColor: '#000',
        color: '#fff',
      },
    },
  },
};
