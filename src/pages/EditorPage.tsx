import * as React from 'react';
import Helmet from 'react-helmet';

import { Route, Redirect } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router'; //IEditorPageProps
import { connect } from 'react-redux';

import DefaultNavbar from '../parts/Navbar/DefaultNavbar';
import EditorLoginFormContainer from '../parts/EditorLoginForm/EditorLoginFormContainer';
import EditArticlePanel from '../parts/EditArticlePanel/EditArticlePanel';
import EditorArticleListing from '../parts/EditorArticleListing/EditorArticleListing';

import { IReduxStoreState } from '../reducers';
import { logout as authLogout } from '../parts/Auth/AuthActions';
import { postEditorLogout } from '../parts/ApiCaller/ApiCaller';

import { getSubdomainConfig } from '../subdomains';
import { removeTrailingSlash } from '../util';
import * as mu from '../metaUtils';

import { defaultTheme as theme } from '../style/themes';

import './EditorPage.css';

export interface IEditorPageReduxMapProps {
    sessionDataRetrieved: boolean;
    fetchingSessionData: boolean;
    authorId?: string | null;
    isAuthenticated?: boolean;
} 

export interface IEditorPageProps extends RouteComponentProps, IEditorPageReduxMapProps {};

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


function EditorPage(props: IEditorPageProps) {
    const matchUrl = removeTrailingSlash(props.match.url);

    const { isAuthenticated, authorId } = props;

    return (
        <div className="editor-page" style={editorPageStyle}>
            <EditorPageHelmet
                title={subdomainConfig.titlePrefix + " | Editor"}
            />

            <DefaultNavbar />
            <Route path={matchUrl} exact={true} render={(routeProps) => {
                if (isAuthenticated && authorId !== undefined) {
                    // Show author's articles
                    return (<EditorArticleListing {...routeProps} authorId={authorId!}/>);
                } else {
                    // Redirect to login
                    return <Redirect to={`${matchUrl}/login`} />;
                }
            }}/>
            <Route path={`${matchUrl}/login`} component={EditorLoginFormContainer}/>
            <Route path={`${matchUrl}/logout`} render={(props) => {
                postEditorLogout();
                authLogout();
                return <Redirect to={`${matchUrl}/login`} />;
            }}/>
            <Route path={`${matchUrl}/new`} component={EditArticlePanel}/>
            <Route path={`${matchUrl}/edit/:articleId`} component={EditArticlePanel} />
        </div>
    );
}

/**
 * Helmet: EditorPage
 */

interface IEditorPageHelmetProps {
    title: string;
}

function EditorPageHelmet(props: IEditorPageHelmetProps) {
    return (
        <Helmet>
            {mu.metaTitleTags(props.title)}
        </Helmet>
    )
}


function mapStateToProps(state: IReduxStoreState): IEditorPageReduxMapProps {
    const { isAuthenticated, user, sessionDataRetrieved, fetchingSessionData } = state.auth;
    return {
        sessionDataRetrieved,
        fetchingSessionData,
        isAuthenticated,
        authorId: user ? user.id : null
    }
}

export default connect(
    mapStateToProps,
    null
)(withRouter(EditorPage));