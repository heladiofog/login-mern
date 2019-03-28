// Root reducer
import { combineReducers } from 'redux';
import authRreducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authRreducer,
  errors: errorReducer
});