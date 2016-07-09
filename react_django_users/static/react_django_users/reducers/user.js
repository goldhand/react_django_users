import {combineReducers} from 'redux';

import * as types from 'constants/actionTypes';


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


const byId = (state = {}, action) => {

  switch (action.type) {
    case types.REQUEST_USER:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case types.RECEIVE_USER:
      return {
        ...state,
        isFetching: action.isFetching,
        [action.username]: user(state[action.username], action),
      };
    default:
      return state;
  }
};

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


export default combineReducers({
  byId,
  allIds,
});
