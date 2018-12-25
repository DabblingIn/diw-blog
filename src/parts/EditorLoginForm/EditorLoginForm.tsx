import * as React from 'react';

import { defaultTheme as theme } from '../../style/themes';
import './EditorLoginForm.css';

export interface IEditorLoginFormProps {};

export interface IEditorLoginFormState {};


export default class EditorLoginForm extends React.Component<IEditorLoginFormProps, IEditorLoginFormState> {

    public render() {
        return (
            <form className="editor-loginform" style={theme.itemBoxStyle}>
                <h2 className="editor-loginform__title">Log In</h2>

                <div className="editor-loginform__field">
                    <h3 className="editor-loginform__fieldheader">Username or Email</h3>
                    <input className="editor-loginform__textinput" autoComplete="off" />
                </div>
                
                <div className="editor-loginform__field">
                    <h3 className="editor-loginform__fieldheader">Password</h3>
                    <input className="editor-loginform__textinput" type="password"/>
                </div>

                <div className="editor-loginform__field">
                    <button className="editor-loginform__submitbutton">Log In</button>
                </div>
            </form>
        );
    }
}
