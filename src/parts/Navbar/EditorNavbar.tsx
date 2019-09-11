
import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import DefaultNavbar from './DefaultNavbar';
import DefaultNavbarLogo from './DefaultNavbarLogo';

import { getSubdomainConfig } from '../../subdomains';

import { defaultTheme as theme } from '../../style/themes';

import './EditorNavbar.css'


const defaultNavbarStyle = {
    height: theme.navbarHeight
};

interface IEditorNavbarProps extends RouteComponentProps {
    loggedIn: boolean;
}

interface IEditorNavbarState {
    loggedIn: boolean;
}


const subdomainConfig = getSubdomainConfig();

class EditorNavbar extends React.Component<IEditorNavbarProps, IEditorNavbarState> {
    public constructor(props: IEditorNavbarProps) {
        super(props);

        this.state = {
            loggedIn: props.loggedIn
        }

        this.submitLogout = this.submitLogout.bind(this);
    }

    public submitLogout(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        //const { history: routerHistory } = this.props;
        //routerHistory.push('/editor/logout')
        /*this.setState({
            loggedIn: false
        })*/
        window.location.href = "/editor/logout";
    }

    public render() {
        if (!this.state.loggedIn) {
            return <DefaultNavbar />
        }

        return (
            <nav className="editor-navbar default-navbar" style={defaultNavbarStyle}>
                <DefaultNavbarLogo siteName={subdomainConfig.name}/>
                <div className="editor-navbar__left-side_container">
                    <button 
                        className="editor-navbar__logout-button" 
                        type="button"
                        onClick={this.submitLogout}
                    >
                        Log Out
                    </button>
                </div>
            </nav>
        );
    }
}

export default withRouter(EditorNavbar);