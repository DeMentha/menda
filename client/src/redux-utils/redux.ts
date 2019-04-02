import { AppStore } from "../app_redux_types";

// TODO: Create a type that encapsulates all Actions we support.
type Handler = (state: any, action: any) => {};
interface HandlerMap {
    [key: string]: Handler;
};

interface ReducerHandlerData {
    key: string;
    handler: Handler;
}

export function createReducer(initialState: any, handlerMap: HandlerMap) {
    return function reducer(state: any = initialState, action: any) {
        if (handlerMap.hasOwnProperty(action.type)) {
            return handlerMap[action.type](state, action);
        } else {
            return state;
        }
    };
}

export function createReducerMap(handlers: ReducerHandlerData[]): HandlerMap {
    let handlerObject: HandlerMap = {};
    for (const handler of handlers) {
        const object: HandlerMap = {};
        object[handler.key] = handler.handler;
        handlerObject = { ...handlerObject, ...object };
    }

    return handlerObject;
}

export function reducerHandlerData(key: string, handler: Handler) {
    return { key, handler };
}

export function defaultMapStateToProps({ data, state }: AppStore) {
    return { data, state };
}
