import { AppStore } from "../app_redux_types";
import { Action } from "redux";

// TODO: Create a type that encapsulates all Actions we support.
type Handler<T> = (state: T, action: any) => T;
interface HandlerMap<T> {
    [key: string]: Handler<T>;
};

export interface DefaultAction extends Action {
  data: any;
}

export function defaultActionCreator(type: string, data: any): DefaultAction {
  return { type, data };
}

interface ReducerHandlerData<T> {
    key: string;
    handler: Handler<T>;
}

export function createReducer<T>(initialState: any, handlerMap: HandlerMap<T>) {
    return function reducer(state: any = initialState, action: any) {
        if (handlerMap.hasOwnProperty(action.type)) {
            return handlerMap[action.type](state, action);
        } else {
            return state;
        }
    };
}

export function createReducerMap<T>(handlers: ReducerHandlerData<T>[]): HandlerMap<T> {
    let handlerObject: HandlerMap<T> = {};
    for (const handler of handlers) {
        const object: HandlerMap<T> = {};
        object[handler.key] = handler.handler;
        handlerObject = { ...handlerObject, ...object };
    }

    return handlerObject;
}

export function bindReducerHandler<T>(key: string, handler: (data: any) => any) {
  return {
    key,
    handler: createSimpleHandler<T>(handler)
  };
}

export function reducerHandlerData<T>(key: string, handler: Handler<T>) {
    return { key, handler };
}

export function defaultMapStateToProps({ data, state }: AppStore) {
    return { data, state };
}

/**
 * @param handler The handler function that returns an object of type T.
 */
export function createSimpleHandler<T>(handler: (data: any) => any): Handler<T> {
  return (state: T, action: DefaultAction): T => {
    return {
      ...state,
      ...handler(action.data),
    };
  }
}

/**
 * @param handler The handler function that returns an object of type T given initial state and action.data
 */
export function createHandler<T>(handler: (state: T, data: any) => T): Handler<T> {
  return (state: T, action: DefaultAction): T => {
    return handler(state, action.data);
  }
}
