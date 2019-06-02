import { combineReducers } from 'redux';

import AuthReducer, { IAuthReducerState } from './parts/Auth/AuthReducer';
//import  from './parts/Auth/Auth.d';

export interface IReduxStoreState {
    auth: IAuthReducerState;
}

const allReducers = combineReducers({
    auth: AuthReducer
});

export default allReducers;