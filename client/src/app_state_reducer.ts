import { combineReducers } from 'redux';
import { IsLoadingState, isLoadingReducer } from './redux-utils/isloading';

export interface AppState {
  isLoading: IsLoadingState;
}

export default combineReducers({
  isLoading: isLoadingReducer,
});
