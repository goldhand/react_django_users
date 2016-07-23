import React, {Component, PropTypes} from 'react';


/**
 * UserForm updates user data on the server
 *
 * @param {String} name - User field
 * @param {String} username - username
 * @param {Function} updateUser - action to update user on submit
 * @param {Boolean} isUpdating - true if an update is in progress
 * @returns {UserForm} - Form with update user name feature
 */
export default class UserForm extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    updateUser: PropTypes.func.isRequired,
    isUpdating: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
    };
  }

  handleChange = (event) => {
    this.setState({name: event.target.value});
  }

  handleSubmit = (event) => {
    const {updateUser, username} = this.props;

    event.preventDefault();
    updateUser(username, this.state);
  }

  render() {
    const {isUpdating} = this.props;

    const buttonText = isUpdating
      ? 'Loading...'
      : 'Submit';

    return (
      <form>
        <input value={this.state.name} onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>{buttonText}</button>
      </form>
    );
  }
}
