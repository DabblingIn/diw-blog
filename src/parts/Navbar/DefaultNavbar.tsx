
import * as React from 'react';

import DefaultNavbarLogo from './DefaultNavbarLogo';

import { getSubdomainConfig } from '../../subdomains';

import { defaultTheme as theme } from '../../style/themes';

import './DefaultNavbar.css';

const defaultNavbarStyle = {
    height: theme.navbarHeight
};


const subdomainConfig = getSubdomainConfig();

export default class DefaultNavbar extends React.Component<{}, {}> {
    public render() {
        return (
            <nav className="default-navbar" style={defaultNavbarStyle}>
                <DefaultNavbarLogo siteName={subdomainConfig.name}/>
            </nav>
        );
    }
}