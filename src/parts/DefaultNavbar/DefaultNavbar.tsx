
import * as React from 'react';

import NavbarLogo from '../NavbarLogo/NavbarLogo';

import './DefaultNavbar.css';


interface IDefaultNavbarProps {
    siteName: string;
};


export default class DefaultNavbar extends React.Component<IDefaultNavbarProps, {}> {
    public render() {
        return (
            <nav className="default-navbar">
                <NavbarLogo siteName={this.props.siteName}/>
            </nav>
        );
    }
}