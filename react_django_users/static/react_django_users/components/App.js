import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';


export default class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {

    return (
      <main>
        <nav>
          <Link to="/user/admin">Admin</Link>
        </nav>
        {this.props.children}
      </main>
    );
  }
}
