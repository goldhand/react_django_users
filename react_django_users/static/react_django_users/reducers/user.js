import {combineReducers} from 'redux';

import * as types from 'constants/actionTypes';


/**
 * User reducer
 * Add or update a user state object
 *
 * @param {State} state - current user state
 * @param {Object} action - an action that has been dispatched
 * @returns {State} state - next state
 */
function user(state, action) {

  switch (action.type) {
    case types.RECEIVE_USER:
      return {
        ...action.user,
      };
    default:
      return state;
  }
}


/**
 * Fetch reducer
 * While a request for a user is pending this is true
 *
 * @param {State} state - true if a user is being requested
 * @param {Object} action - an action that has been dispatched
 * @returns {State} state - next state
 */
const isFetching = (state = true, action) => {

  switch (action.type) {
    case types.REQUEST_USER:
      return true;
    case types.RECEIVE_USER:
      return false;
    default:
      return state;
  }
};


/**
 * Update reducer
 * While a request for a user is pending this is true
 *
 * @param {State} state - true if a user is being requested
 * @param {Object} action - an action that has been dispatched
 * @returns {State} state - next state
 */
const isUpdating = (state = false, action) => {

  switch (action.type) {
    case types.UPDATE_USER:
      return true;
    case types.RECEIVE_USER:
      return false;
    default:
      return state;
  }
};


/**
 * Users by ID reducer
 * Details each user
 *
 * @param {State} state - New user
 * @param {Object} action - an action that has been dispatched
 * @returns {State} state - next state
 */
const byId = (state = {}, action) => {

  switch (action.type) {
    case types.RECEIVE_USER:
      return {
        ...state,
        [action.username]: user(state[action.username], action),
      };
    default:
      return state;
  }
};


/**
 * User IDs reducers
 * An array of all user ids
 *
 * @param {State} state - Array of user ids
 * @param {Object} action - an action that has been dispatched
 * @returns {State} state - next state
 */
const allIds = (state = [], action) => {

  switch (action.type) {
    case types.REQUEST_USER:
      return [
        ...state,
        action.username,
      ];
    default:
      return state;
  }
};


/**
 * Main User Reducer
 * Actions will be dispatched to each reducer
 */
export default combineReducers({
  byId,
  allIds,
  isFetching,
  isUpdating,
});


// Selectors

export function getUser(state, username) {
  return state.byId[username];
}

export function getIsFetching(state) {
  return state.isFetching;
}

export function getIsUpdating(state) {
  return state.isUpdating;
}
