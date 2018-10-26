import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import DefaultPage from './pages/DefaultPage';
import ArticlePage from './pages/ArticlePage';
import LoginPage from './pages/LoginPage';

import { getSubdomainConfig } from './subdomains';

import { defaultTheme as theme } from './style/themes';
import './App.css';
import './style/global.css';

const subdomainConfig = getSubdomainConfig();
document.title = subdomainConfig.tabName;

const backgroundStyle = { 
  backgroundImage: theme.backgroundColor
};


class App extends React.Component {
  public render() {
    document.title = subdomainConfig.tabName;

    return (
      <Router>
        <div className="app">
            <div className="app__background" style={backgroundStyle}/>
            <Route exact={true} path="/" component={DefaultPage} />
            <Route path="/p/:articleId" component={ArticlePage} />
            <Route path="/login" component={LoginPage} />
        </div>
      </Router>
    );
  }
}

export default App;