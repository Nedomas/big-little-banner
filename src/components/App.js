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

import AppWithUser from './AppWithUser';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fingerprint: null,
    };
  }

  componentWillMount() {
    const fingerprint = _.toString(_.random(9999999999999));

    this.setState({
      fingerprint,
    });

    this.props.mutate({
      variables: {
        fingerprint,
      },
    });
  }

  render() {
    const {
      mutation: {
        success,
      },
    } = this.props;

    if (!success) return <div/>;

    const {
      mutation: {
        data: {
          createUser: {
            id,
          },
        },
      },
    } = this.props;

    return <AppWithUser fingerprint={this.state.fingerprint} userId={id} />;
  }
}

const CreateUserMutation = gql`
  mutation CreateUserMutation($fingerprint: String!) {
    createUser(fingerprint: $fingerprint) {
      id
      fingerprint
    }
  }
`;

export default compose(
  graphql(CreateUserMutation),
  withMutationState(),
  Radium,
)(App);

const styles = {
  container: {
    padding: '50px 20px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
};
