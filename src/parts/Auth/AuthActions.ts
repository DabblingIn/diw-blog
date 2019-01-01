import { AnyAction } from 'redux';

import { IEditorSessionUser } from '../ApiCaller/ApiCaller.d';

export const LOGOUT = 'LOGOUT';
export const START_SESSION_DATA_FETCH = 'START_SESSION_DATA_FETCH';
export const SUCCEED_SESSION_DATA_FETCH = 'SUCCEED_SESSION_DATA_FETCH';
export const FAIL_SESSION_DATA_FETCH = 'FAIL_SESSION_DATA_FETCH';

export function logout(): AnyAction {
    return {
        type: LOGOUT
    }
}

export function startSessionDataFetch(): AnyAction {
    return {
        type: START_SESSION_DATA_FETCH
    }
}

export function succeedSessionDataFetch(user?: IEditorSessionUser): AnyAction {
    return {
        type: SUCCEED_SESSION_DATA_FETCH,
        user
    }
}

export function failSessionDataFetch(): AnyAction {
    return {
        type: FAIL_SESSION_DATA_FETCH
    }
}