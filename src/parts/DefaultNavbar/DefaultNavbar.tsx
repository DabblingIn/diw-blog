
import * as React from 'react';

import NavbarLogo from '../NavbarLogo/NavbarLogo';

import { defaultTheme as theme } from '../../style/themes';

import './DefaultNavbar.css';


interface IDefaultNavbarProps {
    siteName: string;
};

const defaultNavbarStyle = {
    height: theme.navbarHeight
};


export default class DefaultNavbar extends React.Component<IDefaultNavbarProps, {}> {
    public render() {
        return (
            <nav className="default-navbar" style={defaultNavbarStyle}>
                <NavbarLogo siteName={this.props.siteName}/>
            </nav>
        );
    }
}