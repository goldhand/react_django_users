import {combineReducers} from 'redux';
// import all app reducers
import counter from './counter';
import user from './user';


const rootReducer = combineReducers({
  counter,
  user,
});

export default rootReducer;
