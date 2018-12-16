import * as React from 'react';

import { defaultTheme as theme } from '../../style/themes';
import './LoginForm.css';

export interface ILoginFormProps {};

export interface ILoginFormState {};

const loginFormStyle = theme.itemBoxStyle;
//const titleStyle = theme.articleTitleStyle;

export default class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {



    public render() {
        return (
            <form className="loginform" style={loginFormStyle}>
                <h2 className="loginform__title">Log In</h2>

                <div className="loginform__field">
                    <h3 className="loginform__fieldheader">Username or Email</h3>
                    <input className="loginform__textinput" autoComplete="off" />
                </div>
                
                <div className="loginform__field">
                    <h3 className="loginform__fieldheader">Password</h3>
                    <input className="loginform__textinput" type="password"/>
                </div>

                <div className="loginform__field">
                    <button className="loginform__submitbutton">Log In</button>
                </div>
            </form>
        );
    }
}
