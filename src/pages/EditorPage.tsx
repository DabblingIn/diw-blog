import * as React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router'; //IEditorPageProps
import { connect } from 'react-redux';

import DefaultNavbar from '../parts/DefaultNavbar/DefaultNavbar';
import EditorLoginFormContainer from '../parts/EditorLoginForm/EditorLoginFormContainer';
import EditArticlePanel from '../parts/EditArticlePanel/EditArticlePanel';
//import EditorArticleListing from '../parts/EditorArticleListing/EditorArticleListing';

import { IReduxStoreState } from '../reducers';
import { logout as authLogout } from '../parts/Auth/AuthActions';

import { getSubdomainConfig } from '../subdomains';

import { postEditorLogout } from '../parts/ApiCaller/ApiCaller';
//import { IGetArticleDataResponse, IArticleData, IGetUserDataResponse, IUserData } from '../parts/ApiCaller/ApiCaller.d';

import { defaultTheme as theme } from '../style/themes';

import './EditorPage.css';

export interface IEditorPageReduxMapProps {
    authorId?: string | null;
    isAuthenticated?: boolean;
} 

export interface IEditorPageProps extends RouteComponentProps {
    authorId?: string;
    isAuthenticated?: boolean;
};

interface IEditorPageState {};

const subdomainConfig = getSubdomainConfig();

const editorPageStyle = {
  marginTop: theme.navbarHeight + theme.topBottomMargin,
  marginBottom: theme.topBottomMargin
};


/*

    TODO:
        FRONTEND PATHS:
            /editor/articles
                >> articles: GET, (!)DELETE
                >> List Author's articles to edit.
                >> Verifies session & author, grabs his data
                >> Allows delete *with confirmation (maybe make the type url id like w github delete repo)
                    >> delete will check session & author upstream
            /editor/edit/:articleUrlId
                >> article: UPDATE
                >> Edits article with given article URL ID
                >> Checks session, author, & article existence
                >> Article MUSTb EXIST in this screen
            /editor/new
                >> article: POST
                >> Create a NEW article
                >> Verifies session
                >> At submit, checks for URL ID?
            /editor/login
                >> editor login: POST
                >> logs in, initiates user session
            /editor/logout
                >> editor logout: POST
                >> Sends an editor logout POST request, then redirects to the login page
        NEXT BIG QUESTIONS: 
            subroutes for editor panel? (all start /editor)
            put these subroutes under EditorPage, or split it up into multiple page tsx files?

*/


class EditorPage extends React.Component<IEditorPageProps, IEditorPageState> {
    constructor(props: IEditorPageProps) {
        super(props);

        /*this.state = {
            // TODO: Get authorId from session info, once session logic established
            authorId: "lasdkjfh2o478h"
        }*/
    }

    public render() {
        document.title = subdomainConfig.tabName + " | " + "Editor";

        const { match } = this.props;

        return (
            <div className="editor-page" style={editorPageStyle}>
                <DefaultNavbar />
                <Route path={match.url} exact={true} render={(props) => {
                    // TODO: Fix once this check is done
                    return (<p>
                        <b>isAuth</b>: {
                            String(this.props.isAuthenticated)
                        } 
                        &nbsp;
                        <b>authorId</b>: {
                            String(this.props.authorId)
                        }
                        </p>)
                    /*if (this.props.isAuthenticated && this.props.authorId !== undefined) {
                        // Show author's articles
                        return (<EditorArticleListing {...props} authorId={this.props.authorId}/>);
                    } else {
                        // Redirect to login
                        return (<Redirect to={`${match.url}/login`} />);
                    }*/
                }}/>
                <Route path={`${match.url}/login`} component={EditorLoginFormContainer}/>
                <Route path={`${match.url}/logout`} render={(props) => {
                    postEditorLogout();
                    authLogout();
                    return (<Redirect to={`${match.url}/login`} />);
                }}/>
                <Route path={`${match.url}/new`} component={EditArticlePanel}/>
                <Route path={`${match.url}/edit/:articleId`} component={EditArticlePanel} />
            </div>
        );
    }
}

function mapStateToProps(state: IReduxStoreState): IEditorPageReduxMapProps {
    const { isAuthenticated, user } = state.auth;
    return {
        isAuthenticated,
        authorId: user ? user.id : null
    }
}

export default connect(
    mapStateToProps,
    null
)(EditorPage);