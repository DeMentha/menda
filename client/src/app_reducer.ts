import { combineReducers } from 'redux';

import appDataReducer from './app_data_reducer';
import appStateReducer from './app_state_reducer';

export default combineReducers({
  data: appDataReducer,
  state: appStateReducer
});
