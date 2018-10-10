
import * as React from 'react';


interface IDefaultNavbarProps {
    siteName: string;
};


export default class DefaultNavbar extends React.Component<IDefaultNavbarProps, {}> {
    public render() {
        return (
            <nav id="main-nav" className="navbar navbar-expand-lg fixed-top">
                <a href="/"><h1 className="logo-text">{this.props.siteName}</h1></a>
            </nav>
        );
    }
}