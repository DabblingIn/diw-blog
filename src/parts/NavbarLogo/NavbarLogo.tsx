import * as React from 'react';

import './NavbarLogo.css';

interface INavbarLogoProps {
    siteName: string;
};

export default class NavbarLogo extends React.Component<INavbarLogoProps, {}> {
    public render() {
        return (
            <a href="/"><h1 className="navbar-logo">{this.props.siteName}</h1></a>
        );
    }
};