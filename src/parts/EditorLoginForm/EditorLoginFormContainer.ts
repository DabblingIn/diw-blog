import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IReduxStoreState } from '../../reducers';

import EditorLoginForm, { IEditorLoginFormProps } from './EditorLoginForm';
import { succeedSessionDataFetch } from '../Auth/AuthActions';
import { IAuthReducerState } from '../Auth/AuthReducer';
import { IEditorSessionUser } from '../ApiCaller/ApiCaller.d';

export interface IEditorLoginFormReduxMapProps {
    sessionUser: IAuthReducerState['user'];
    isAuthenticated: boolean;
    succeedSessionDataFetch: (user: IEditorSessionUser) => any;
}

function mapStateToProps(state: IReduxStoreState, ownProps: IEditorLoginFormProps) {
    const { user, isAuthenticated } = state.auth;
    return {
        sessionUser: user,
        isAuthenticated
    }
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: IEditorLoginFormProps) {
    return {
        succeedSessionDataFetch: (user: IEditorSessionUser) => dispatch(succeedSessionDataFetch(user))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditorLoginForm);