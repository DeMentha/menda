import { Action } from "redux";
import { createReducer, createReducerMap, reducerHandlerData } from "./redux";

export const APP_INFO = '@picasso/APP_INFO';

// Constants

export interface AppInfoState {
  name?: string;
}

interface AppInfoAction extends Action {
}

export type AppInfoActionCreator = () => Action;

// Reducer

export const appInfoHandler = (
  state: AppInfoState = {},
  action: AppInfoAction
): AppInfoState => {
  return {
    name: 'Picasso'
  }
}

export const appInfoReducer = createReducer(
  {},
  createReducerMap([reducerHandlerData(APP_INFO, appInfoHandler)])
);

// Action Creator

export const appInfoActionCreator: AppInfoActionCreator = () => {
  return {
    type: APP_INFO
  }
}