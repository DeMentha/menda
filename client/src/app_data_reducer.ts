import { combineReducers } from "redux";
import { AppInfoState } from "./redux-utils/appinfo";
import { createReducer, createReducerMap, bindReducerHandler } from "./redux-utils/redux";
import { UserData } from "./components/user/user_types";

export interface AppData {
  appInfo: AppInfoState;
  user: UserData;
}


// AppInfo

export const AppInfoActionType = {
  APP_INFO: 'APP_INFO'
}

const appInfoReducer = createReducer(
  {},
  createReducerMap<AppInfoState>([
    bindReducerHandler<AppInfoState>(AppInfoActionType.APP_INFO, (data: any) => ({name: 'Starter'}))
  ])
);


// User

export const UserActionType = {
  USER_SESSION: 'USER_SESSION',
}

const userReducer = createReducer(
  {},
  createReducerMap<UserData>([
    bindReducerHandler<UserData>(UserActionType.USER_SESSION, (data: any) => ({
      session: data.user,
      sessionId: data.sessionId
    })),
  ])
);

export default combineReducers({
  appInfo: appInfoReducer,
  user: userReducer
});
