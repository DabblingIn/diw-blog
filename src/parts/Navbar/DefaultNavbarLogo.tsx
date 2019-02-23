import * as React from 'react';

import './DefaultNavbarLogo.css';

interface IDefaultNavbarLogoProps {
    siteName: string;
};

export default class DefaultNavbarLogo extends React.Component<IDefaultNavbarLogoProps, {}> {
    public render() {
        return (
            <a href="/"><h1 className="default-navbar-logo">{this.props.siteName}</h1></a>
        );
    }
};