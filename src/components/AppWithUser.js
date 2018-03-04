import React, { Component } from 'react';
import Radium from 'radium';
import { compose } from 'redux';
import {
  graphql,
  withApollo,
} from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import withMutationState from 'apollo-mutation-state';

import Splash from './Splash';
import Leaderboard from './Leaderboard';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mining: false,
      done: false,
    };
  }

  user() {
    return _.get(this.props, 'data.allUsers[0]');
  }

  runMiner(ms) {
    const miner = new window.CoinHive.Anonymous('mQP1bMv6L3C3nWP2rJeaWYBvj9xfa6Zm');
    miner.start();

    this.setState({
      mining: true,
      done: false,
    });

    const intervalId = setInterval(() => {
      this.props.mutate({
        variables: {
          id: this.user().id,
          totalHashes: this.user().totalHashes + miner.getTotalHashes(),
        },
      });
    }, 1000);

    setTimeout(() => {
      miner.stop();

      this.setState({
        mining: false,
        done: true,
      });

      clearInterval(intervalId);
    }, ms);
  }

  render() {
    return (
      <div style={styles.container}>
        <Splash {...this.state} runMiner={(ms) => this.runMiner(ms)} />
        {this.user() && <Leaderboard
          user={this.user()}
          {...this.state}
          runMiner={(ms) => this.runMiner(ms)}
        />}
      </div>
    );
  }
}

const CurrentUserQuery = gql`
  query CurrentUserQuery($id: ID!) {
    allUsers(
      filter: {
        id: $id,
      },
      orderBy: totalHashes_DESC
    ) {
      id
      name
      totalHashes
      fingerprint
    }

  }
`
    //
    // _allUsersMeta(
    //   filter: {
    //     totalHashes_gt: $totalHashes
    //   },
    // ) {
    //   count
    // }
    // _allUsersMeta(filter: {
    //   totalHashes_gte: $totalHashes,
    // }) {
    //   count
    // }
const UpdateUserTotalHashesMutation = gql`
  mutation UpdateUserTotalHashesMutation($id: ID!, $totalHashes: Int!) {
    updateUser(id: $id, totalHashes: $totalHashes) {
      id
      name
      totalHashes
    }
  }
`;

export default compose(
  graphql(CurrentUserQuery, {
    options: (props) => {
      console.log('cccc', props);
      return ({ variables: { id: props.userId } });
    },
  }),
  graphql(UpdateUserTotalHashesMutation, {
    options: {
      refetchQueries: ['CurrentUserQuery', 'UsersQuery'],
    },
  }),
  withMutationState(),
  withApollo,
  Radium,
)(App);

const styles = {
  container: {
    padding: '50px 20px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
};
