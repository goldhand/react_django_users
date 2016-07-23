import * as types from 'constants/actionTypes';
import {getCookie} from 'utils/cookie';

// Api url
const apiEndpoint = (query) => `/users/${query}/`;

// fetch request configuration
const fetchConfig = {
  headers: new Headers({
    'X-Requested-With': 'XMLHttpRequest',  // request.is_ajax() needs this header
    'X-CSRFToken': getCookie().csrftoken,
  }),
  credentials: 'include',
};


function receiveUser(username, user) {

  return {
    type: types.RECEIVE_USER,
    username,
    user,
    recievedAt: Date.now(),
  };
}


export function fetchUser(username) {

  return dispatch => {
    dispatch({
      type: types.REQUEST_USER,
      username,
    });

    return fetch(apiEndpoint(username), {
      ...fetchConfig,
    }).then(response => response.json())
      .then(json => dispatch(receiveUser(username, json)));
  };
}


export function updateUser(username, user) {

  return dispatch => {

    dispatch({
      type: types.UPDATE_USER,
      username,
    });

    return fetch(apiEndpoint('~update'), {
      ...fetchConfig,
      method: 'post',
      body: formatFetchData(user),
    }).then(response => response.json())
      .then(json => dispatch(receiveUser(username, json)));
  };
}


function formatFetchData(data) {
  const form = new FormData();
  for (const field in data) {
    form.append(field, data[field]);
  }
  return form;
}
