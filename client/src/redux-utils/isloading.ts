import { ThunkAction } from 'redux-thunk';
import { createReducer, createReducerMap, reducerHandlerData } from './redux';
import { Action, AnyAction } from 'redux';

// Constants

export const IS_LOADING_STATUS = '@sc/IS_LOADING_STATUS';
export enum Status {
    LOADING = 'LOADING',
    COMPLETE = 'COMPLETE',
}

export interface IsLoadingState {
    [key: string]: boolean;
}

interface IsLoadingAction extends Action {
    id: string;
    status: Status;
}

export type IsLoadingActionCreator = (id: string, throwErrors: boolean, promise: Promise<any>) => ThunkAction<
        Promise<void>,
        any,
        void,
        AnyAction
    >;

// Reducer

export const isLoadingStatusHandler = (
    state: IsLoadingState = {},
    action: IsLoadingAction,
): IsLoadingState => {
    const newState: IsLoadingState = { ...state };
    if (action.status === Status.COMPLETE) {
        delete newState[action.id];
    } else {
        newState[action.id] = true;
    }
    return newState;
};

export const isLoadingReducer = createReducer(
    {},
    createReducerMap([reducerHandlerData(IS_LOADING_STATUS, isLoadingStatusHandler)]),
);

// Action Creator

/**
 * Action Creator that wraps given request function and dispatches LOADING and COMPLETED statuses.
 * If throwErrors == true, any errors thrown by request will be thrown for the caller to handle.
 */
export const isLoadingActionCreator: IsLoadingActionCreator = (id, throwErrors, promise) => {
    return async dispatch => {
        dispatch({
            type: IS_LOADING_STATUS,
            id,
            status: Status.LOADING,
        });
        try {
            console.log(promise);
            await promise;
            dispatch({
                type: IS_LOADING_STATUS,
                id,
                status: Status.COMPLETE,
            });
        } catch (err) {
            dispatch({
                type: IS_LOADING_STATUS,
                id,
                status: Status.COMPLETE,
            });
            if (throwErrors) {
                throw err;
            }
        }
    };
};
