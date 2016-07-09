import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'actions/userActions';
import User from 'components/User';


@connect(
  state => ({user: state.user}),
  dispatch => (bindActionCreators(actionCreators, dispatch)),
)
export default class UserApp extends Component {

  static propTypes = {
    params: PropTypes.object,
    fetchUser: PropTypes.func.isRequired,
    user: PropTypes.object,
  }

  componentDidMount() {
    const {params, fetchUser} = this.props;

    fetchUser(params.username);
  }

  render() {
    const {user, params} = this.props;
    return (
      <User {...user.byId[params.username]} />
    );
  }
}
