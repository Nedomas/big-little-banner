import React, { Component } from 'react';
import Radium from 'radium';
import { compose } from 'redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import withMutationState from 'apollo-mutation-state';

class Leaderboard extends Component {
  userFromDatabase() {
    const {
      data: {
        allUsers = [],
      },
      fingerprint,
    } = this.props;

    return _.find(allUsers, { fingerprint });
  }

  datesCount(user) {
    if (user.id === this.props.userId) {
      return user.totalHashes + this.props.unsavedTotalHashes;
    }

    return user.totalHashes;
  }

  handleSubmit(values) {
    this.props.mutate({
      variables: {
        id: this.props.user.id,
        ...values,
      },
    });
  }

  nameBox(user) {
    if (user.name) return user.name;

    const {
      handleSubmit,
    } = this.props;

    return (
      <form onSubmit={handleSubmit((values) => this.handleSubmit(values))}>
        <Field
          name='name'
          type='text'
          component='input'
          placeholder='Name'
          style={styles.leaderboard.nameInput}
        />
        <button type='submit'>
          Continue mining
        </button>
      </form>
    );
  }

  render() {
    const {
      data: {
        allUsers,
        loading,
      },
    } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.headline}>
          Here's the leaderboard of all of my friends
        </div>
        <div style={styles.subheadline}>
          I've been getting dates all around the world because of them.
        </div>

        <div style={styles.leaderboard.container}>
          <div style={[styles.leaderboard.item.container, styles.leaderboard.item.header]}>
            <div style={styles.leaderboard.item.left}>
              <div style={styles.leaderboard.item.rank}>
                No.
              </div>
              <div style={styles.leaderboard.item.name}>
                Name
              </div>
            </div>
            <div style={styles.leaderboard.item.dates}>
              Dates I got
            </div>
          </div>

          {_.map(allUsers, (user) => {
            return (
             <div key={user.id} style={styles.leaderboard.item.container}>
                <div style={styles.leaderboard.item.left}>
                  <div style={styles.leaderboard.item.rank}>
                    1
                  </div>
                  <div style={styles.leaderboard.item.name}>
                    {this.nameBox(user)}
                  </div>
                </div>
                <div style={styles.leaderboard.item.dates}>
                  {this.datesCount(user)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const UsersQuery = gql`
  query UsersQuery($id: ID!) {
    allUsers(
      filter: {
        OR: [
          {
            name_not: null,
          },
          {
            id: $id,
          },
        ],
      },
      orderBy: totalHashes_DESC,
    ) {
      id
      name
      totalHashes
      fingerprint
    }
  }
`;

const UpdateUserNameMutation = gql`
  mutation UpdateUserNameMutation($id: ID!, $name: String) {
    updateUser(id: $id, name: $name) {
      id
      name
      totalHashes
    }
  }
`;

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }
  return errors;
};

export default compose(
  graphql(UsersQuery, {
    options: ({ user, position }) => ({
      variables: {
        id: user.id,
      }
    }),
  }),
  graphql(UpdateUserNameMutation, {
    options: {
      refetchQueries: ['UsersQuery'],
    },
  }),
  withMutationState(),
  reduxForm({
    form: 'leaderboard',
    validate,
  }),
  Radium,
)(Leaderboard);

const styles = {
  container: {
    paddingTop: '50px',
  },
  headline: {
    fontSize: '28px',
    fontWeight: 550,
    textAlign: 'center',
  },
  subheadline: {
    fontSize: '20px',
    textAlign: 'center',
    paddingBottom: '30px',
  },
  leaderboard: {
    container: {
      maxWidth: '400px',
      margin: '0 auto',
    },
    item: {
      container: {
        display: 'flex',
        borderBottom: '2px solid #000',
        padding: '20px 0',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      header: {
        borderBottom: '4px solid #000',
      },
      left: {
        display: 'flex',
        alignItems: 'center',
      },
      rank: {
        fontSize: '28px',
        fontWeight: 550,
        paddingRight: '20px',
        minWidth: '50px',
      },
      name: {
        fontSize: '24px',
      },
      dates: {
        fontSize: '24px',
      },
    },
    nameInput: {
      border: 0,
      borderBottom: '1px solid #000',
      width: '200px',
      outline: 0,
    },
  },
};