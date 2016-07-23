import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'actions/userActions';
import {getUser, getIsFetching, getIsUpdating} from 'reducers/user';
import User from 'components/User';
import UserForm from 'components/UserForm';


@connect(
  (state, ownProps) => {
    const {username} = ownProps.params;
    return {
        user: getUser(state.user, username),
        isFetching: getIsFetching(state.user),
        isUpdating: getIsUpdating(state.user),
        username,
    };
  },
  dispatch => (bindActionCreators(actionCreators, dispatch)),
)
export default class UserApp extends Component {

  static propTypes = {
    fetchUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    user: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    isUpdating: PropTypes.bool.isRequired,
  }

  componentWillMount() {
    const {username, fetchUser} = this.props;

    fetchUser(username);
  }

  handleSubmit = (user) => {
    const {username, updateUser} = this.props;

    updateUser(username, user);
  }

  render() {
    const {user, isFetching, isUpdating, updateUser} = this.props;

    if (isFetching) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <User {...user} />
        <UserForm {...user} updateUser={updateUser} isUpdating={isUpdating} />
      </div>
    );
  }
}
