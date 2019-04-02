import { combineReducers } from "redux";
import { appInfoReducer, AppInfoState } from "./redux-utils/appinfo";

export interface AppData {
  appInfo: AppInfoState;
}

export default combineReducers({
  appInfo: appInfoReducer
});
