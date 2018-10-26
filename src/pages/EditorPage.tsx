import * as React from 'react';

import DefaultNavbar from '../parts/DefaultNavbar/DefaultNavbar';

import { getSubdomainConfig } from '../subdomains';

//import ApiCaller from '../parts/ApiCaller/ApiCaller';
//import { IGetArticleDataResponse, IArticleData, IGetUserDataResponse, IUserData } from '../parts/ApiCaller/ApiCaller.d';

import { defaultTheme as theme } from '../style/themes';


interface IEditorPageProps {};

interface IEditorPageState {};

const subdomainConfig = getSubdomainConfig();

const editorPageStyle = {
  marginTop: theme.navbarHeight + theme.topBottomMargin,
  marginBottom: theme.topBottomMargin
};


export default class EditorPage extends React.Component<IEditorPageProps, IEditorPageState> {
    constructor(props: IEditorPageProps) {
        super(props);

    }

    public render() {
        document.title = subdomainConfig.tabName + " | " + "Login";

        return (
            <div className="editor-page" style={editorPageStyle}>
                <DefaultNavbar />
                {/* Add WYSIWYG editor */}
            </div>
        );
    }
}