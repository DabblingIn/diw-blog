import * as React from 'react';

import DefaultNavbar from '../parts/DefaultNavbar/DefaultNavbar';
import LoginForm from '../parts/LoginForm/LoginForm';

//import ApiCaller from '../parts/ApiCaller/ApiCaller';
//import { IGetArticleDataResponse, IArticleData, IGetUserDataResponse, IUserData } from '../parts/ApiCaller/ApiCaller.d';

import { defaultTheme as theme } from '../style/themes';


interface ILoginPageProps {};

interface ILoginPageState {};


const articlePageStyle = {
  marginTop: theme.navbarHeight + theme.topBottomMargin,
  marginBottom: theme.topBottomMargin
};


export default class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {
    constructor(props: ILoginPageProps) {
        super(props);

    }

    public render() {
        return (
            <div className="article-page" style={articlePageStyle}>
                <DefaultNavbar />
                <LoginForm />
            </div>
        );
    }
}