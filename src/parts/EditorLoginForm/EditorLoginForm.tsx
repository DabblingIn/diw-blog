import * as React from 'react';
import { MouseEvent, FormEvent } from 'react';
import { Redirect } from 'react-router';
import { IEditorLoginFormReduxMapProps } from './EditorLoginFormContainer';

import { validUsername, validPassword } from '../../util';
import { postEditorLogin } from '../ApiCaller/ApiCaller';

import { defaultTheme as theme } from '../../style/themes';
import './EditorLoginForm.css';

export interface IEditorLoginFormProps extends IEditorLoginFormReduxMapProps {};

//interface IEditorLoginFormProps extends RouteComponentProps<IEditorLoginFormProps> {};

export interface IEditorLoginFormState {
    username: string;
    password: string;

    usernameErr: string | null;
    usernameErrColor: string;
    passwordErr: string | null;
    passwordErrColor: string;
    loginSubmitErr: string | null;
    loginSubmitErrColor: string;

    submitEnabled: boolean;
};

const LOGIN_FAIL_BUTTON_DISABLE_MS = 2000;
const BLACK = "black";
const RED = "red";
const GREEN = "green";

export default class EditorLoginForm extends React.Component<IEditorLoginFormProps, IEditorLoginFormState> {
    public constructor(props: IEditorLoginFormProps) {
        super(props);

        this.state = {
            username: "",
            password: "",

            usernameErr: "",
            usernameErrColor: BLACK,
            passwordErr: "",
            passwordErrColor: BLACK,
            loginSubmitErr: "",
            loginSubmitErrColor: BLACK,

            submitEnabled: false
        }

        this.changedUsername = this.changedUsername.bind(this);
        this.changedPassword = this.changedPassword.bind(this);
        this.clickSubmit = this.clickSubmit.bind(this);
        this.checkFieldsEnableSubmit = this.checkFieldsEnableSubmit.bind(this);
    }

    public changedUsername(e: FormEvent<HTMLInputElement>) {
        const newUsername: string = e.currentTarget.value;
        const validation = validUsername(newUsername);

        this.setState({
            username: newUsername
        })

        if (!validation.valid) {
            this.setState({
                usernameErr: validation.err,
                usernameErrColor: RED
            });
        } else {
            this.setState({
                usernameErr: "",
                usernameErrColor: BLACK
            });
        }
        this.checkFieldsEnableSubmit();
    }

    public changedPassword(e: FormEvent<HTMLInputElement>) {
        const newPassword: string = e.currentTarget.value;
        const validation = validPassword(newPassword);

        this.setState({
            password: newPassword
        })

        if (!validation.valid) {
            this.setState({
                passwordErr: validation.err,
                passwordErrColor: RED
            });
        } else {
            this.setState({
                passwordErr: "",
                passwordErrColor: BLACK
            });
        }
        this.checkFieldsEnableSubmit();
    }

    public checkFieldsEnableSubmit() {
        // Enables or disables submit button based on whether fields are valid
        const usernameValidation = validUsername(this.state.username);
        const passwordValidation = validPassword(this.state.password);
        
        let enableSubmit;
        enableSubmit = (usernameValidation.valid && passwordValidation.valid)

        this.setState({
            submitEnabled: enableSubmit
        });

        return enableSubmit;
    }

    public clickSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const usernameValidation = validUsername(this.state.username);
        const passwordValidation = validPassword(this.state.password);
        if (usernameValidation.valid && passwordValidation.valid) {
            postEditorLogin({ username: this.state.username, password: this.state.password })
                .then(({ data: resData }) => {
                    const { success, err, data } = resData;
                    if (success) {
                        let userId = "NO USERID";
                        if (data !== undefined) {
                            userId = data.userId;
                        }

                        this.setState({
                            password: '',
                            loginSubmitErr: "Logged In!: " + userId,
                            loginSubmitErrColor: GREEN
                        })

                        // set in redux store
                        this.props.succeedSessionDataFetch({ id: userId });
                    } else {
                        // disable login button post-fail
                        this.setState({
                            loginSubmitErr: err,
                            loginSubmitErrColor: RED,
                            submitEnabled: false
                        });
                        setTimeout(() => {
                            this.setState({
                                submitEnabled: true
                            });
                        }, LOGIN_FAIL_BUTTON_DISABLE_MS);
                    }
                })
                .catch((err) => {
                    // TODO: deal with login backend err
                })
        }
    }

    public render() {
        if (this.props.isAuthenticated) {
            return (<Redirect to={'/editor'} />)
        }

        return (
            <form className="editor-loginform" style={theme.itemBoxStyle}>
                <h2 className="editor-loginform__title">Log In</h2>

                <div className="editor-loginform__field">
                    <h3 className="editor-loginform__fieldheader">Username</h3>
                    <p style={{ color: this.state.usernameErrColor }} className="editor-loginform__username-err">{this.state.usernameErr}</p>
                    <input onChange={this.changedUsername} value={this.state.username} className="editor-loginform__textinput" autoComplete="off" />
                </div>
                
                <div className="editor-loginform__field">
                    <h3 className="editor-loginform__fieldheader">Password</h3>
                    <p style={{ color: this.state.passwordErrColor }} className="editor-loginform__password-err">{this.state.passwordErr}</p>
                    <input onChange={this.changedPassword} value={this.state.password} className="editor-loginform__textinput" type="password"/>
                </div>

                <div className="editor-loginform__field">
                    <p style={{color: this.state.loginSubmitErrColor}} className="editor-loginform__login-submit-err">{this.state.loginSubmitErr}</p>
                    <button onClick={this.clickSubmit} disabled={!this.state.submitEnabled} className="editor-loginform__submitbutton">Log In</button>
                </div>
            </form>
        );
    }
}