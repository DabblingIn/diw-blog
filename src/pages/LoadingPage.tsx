import * as React from 'react';

import DefaultNavbar from '../parts/Navbar/DefaultNavbar';

import { getSubdomainConfig } from '../subdomains';

import { defaultTheme as theme } from '../style/themes';


const subdomainConfig = getSubdomainConfig();

const defaultPageStyle = {
  marginTop: theme.navbarHeight + theme.topBottomMargin,
  marginBottom: theme.topBottomMargin
};

interface ILoadingPageProps {
    errorMessage: string | null;
}

export default class LoadingPage extends React.Component<ILoadingPageProps, {}> {
    public render() {
        document.title = subdomainConfig.tabName;

        let message = "Just a tick!  Loading.";
        if (this.props.errorMessage) {
            message = this.props.errorMessage
        }

        return (
            <div className="loading-page" style={defaultPageStyle}>
                <DefaultNavbar />

                <div>
                    <h2>{message}</h2>
                </div>
            </div>
        );
    }
}