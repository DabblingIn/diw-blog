import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import DefaultPage from './pages/DefaultPage';
import ArticlePage from './pages/ArticlePage';
import EditorPage from './pages/EditorPage';
import LoadingPage from './pages/LoadingPage';

import { IReduxStoreState } from './reducers';
import {
  startSessionDataFetch,
  succeedSessionDataFetch,
  failSessionDataFetch
} from './parts/Auth/AuthActions'
import { IAuthReducerState } from './parts/Auth/AuthReducer';
import { getEditorSessionData } from './parts/ApiCaller/ApiCaller';
import { IEditorSessionUser } from './parts/ApiCaller/ApiCaller.d';
import { getSubdomainConfig } from './subdomains';

import { defaultTheme as theme } from './style/themes';
import './App.css';
import './style/global.css';

const subdomainConfig = getSubdomainConfig();
document.title = subdomainConfig.tabName;

const backgroundStyle = { 
  backgroundImage: theme.backgroundColor
};

interface IAppState {
  sessionDataRetrieved: boolean;
  editorSessionUser: IAuthReducerState['user'];
  loadingPageErrorMessage: string | null;
}

interface IAppOwnProps {}
type IAppProps = IAppReduxStateMapProps & IAppReduxDispatchMapProps & IAppOwnProps;

interface IAppReduxStateMapProps {
  // state -> props
  sessionDataRetrieved: boolean;
  editorSessionUser: IAuthReducerState['user'];
  fetchingSessionData: boolean;
}

interface IAppReduxDispatchMapProps {
  // dispatch -> props
  succeedSessionDataFetch: (user?: IEditorSessionUser) => any;
  startSessionDataFetch: () => any;
  failSessionDataFetch: () => any;
}


class App extends React.Component<IAppProps, IAppState> {

  public constructor(props: IAppProps) {
    super(props);

    this.state = {
      sessionDataRetrieved: props.sessionDataRetrieved,
      editorSessionUser: props.editorSessionUser,
      loadingPageErrorMessage: null
    }
  }

  public componentDidMount() {
    if (!this.props.sessionDataRetrieved) {
      // no data updated in redux store; fetching
      if (!this.props.fetchingSessionData) {
        this.props.startSessionDataFetch();
        getEditorSessionData()
          .then(({ data: resData }) => {
              if (resData.err === null) {
                if (resData.data === null) {
                  // data retrieved, NO current session
                  this.props.succeedSessionDataFetch();
                  this.setState({
                    sessionDataRetrieved: true
                  });
                } else {
                  // data retrieved, session data retrieved
                  const { user } = resData.data!;
                  this.props.succeedSessionDataFetch(user);
                  this.setState({
                    editorSessionUser: user,
                    sessionDataRetrieved: true
                  });
                }
              } else {
                // error with data retrieval
                this.setState({
                  loadingPageErrorMessage: resData.err
                })
              }
            })
          .catch((err) => {
              this.props.failSessionDataFetch();
              this.setState({
                loadingPageErrorMessage: "Failed session fetch: " + err
              })
            })
      }
    }
  }

  public render() {
    document.title = subdomainConfig.tabName;

    if (this.props.fetchingSessionData && !this.props.sessionDataRetrieved) {
      return (
        <div className="app">
            <div className="app__background" style={backgroundStyle}/>
            <LoadingPage errorMessage={this.state.loadingPageErrorMessage} />
        </div>
      );
    }

    return (
      <Router>
        <div className="app">
            <div className="app__background" style={backgroundStyle}/>
            <Route exact={true} path="/" component={DefaultPage} />
            <Route path="/p/:articleUrlId" component={ArticlePage} />
            <Route path="/editor" component={EditorPage} isAuthenticated={false} authorId=""/>
        </div>
      </Router>
    );
  }
}


// Container functions
function mapStateToProps(state: IReduxStoreState, ownProps: IAppOwnProps): IAppReduxStateMapProps {
  const { sessionDataRetrieved, user, fetchingSessionData } = state.auth;
  return {
    sessionDataRetrieved,
    editorSessionUser: user,
    fetchingSessionData
    //isAuthenticated: state.auth.isAuthenticated
  }
}

function mapDispatchToProps(dispatch: Dispatch): IAppReduxDispatchMapProps {
  return {
    succeedSessionDataFetch: (user?: IEditorSessionUser) => dispatch(succeedSessionDataFetch(user)),
    startSessionDataFetch: () => dispatch(startSessionDataFetch()),
    failSessionDataFetch: () => dispatch(failSessionDataFetch())
  }
}

export default connect<IAppReduxStateMapProps, IAppReduxDispatchMapProps, IAppOwnProps, IReduxStoreState>(
  mapStateToProps,
  mapDispatchToProps
)(App);