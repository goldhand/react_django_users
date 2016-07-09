import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import routes from './routes';
import configureStore from './store/configureStore';
import {loadState, saveReduxStore} from './store/localStorage';


const ROOT_ELEMENT = 'main';
// Stores that should be saved locally
const STORE_STATES = [
  'counter',
];


/**
 * @param {string} env - NODE_ENV
 * @returns {promise} - project container
 */
function projectContainer(env) {

  if (env !== 'production') {
    if (!window.devToolsExtension) {
      // use the internal DecTools because the browser plugin isn't available
      return System.import('./containers/DevTools')
        .then(DevTools => {
          return (
            <div>
              <Router history={browserHistory} routes={routes} />
              <DevTools.default />
            </div>
          );
        })
        .catch(() => {
          // TODO: handle err
        });
    }
  }

  // default to production
  return Promise.resolve(
    <Router history={browserHistory} routes={routes} />
  );

}


/**
 * Renders the project
 * generator for yielding async components: <projectElement> and <persisitState>
 * @returns {generator} - render project
 */
export default async () => {

  try {

    const projectElement = await projectContainer(process.env.NODE_ENV);
    const persistState = await loadState();

    const store = configureStore(persistState);

    // Save store states locally
    saveReduxStore(store)(STORE_STATES);  // this should be a middleware fuck

    // handle client side rendering
    if (typeof document !== 'undefined') {

      ReactDOM.render(
        <Provider store={store}>
          {projectElement}
        </Provider>,
        document.getElementById(ROOT_ELEMENT)
      );

    }

  } catch (err) {
    // TODO: handle err
  }
};
