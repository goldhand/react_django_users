import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import App from './components/App';
import CounterApp from './containers/CounterApp';
import UserApp from 'containers/UserApp';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={CounterApp} />
    <Route path="/user/(:username)" component={UserApp} />
    <Redirect from="*" to="/" />
  </Route>
);
