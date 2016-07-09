import * as types from 'constants/actionTypes';


const apiEndpoint = (query) => `/users/${query}/?format=json`;

export function requestUser(username) {

  return {
    type: types.REQUEST_USER,
    username,
    isFetching: true,
  };
}


export function receiveUser(username, json) {

  // TODO: Don't manipulate the json. How come response json needs to be an array? If add a --insecure filter to the json serializer its ok... but why is it insecure?
  const user = {
    ...json.data,
  };

  return {
    type: types.RECEIVE_USER,
    username,
    user,
    isFetching: false,
    recievedAt: Date.now(),
  };
}


export function fetchUser(username) {

  return dispatch => {
    dispatch(requestUser(username));

    return fetch(apiEndpoint(username))
      .then(response => response.json())
      .then(json => dispatch(receiveUser(username, json)));
  };
}
