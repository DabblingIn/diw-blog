import * as React from 'react';

import DefaultPage from './pages/DefaultPage';
import ArticlePage from './pages/ArticlePage';
import { defaultTheme as theme } from './style/themes';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import './style/global.css';


const backgroundStyle = { 
  backgroundImage: theme.backgroundColor
};


class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="app">
            <div className="app__background" style={backgroundStyle}/>
            {/*<DefaultPage siteName="Dabbling In Web" />*/}
            <Route exact={true} path="/" component={DefaultPage} />
            <Route path="/p/:articleId" component={ArticlePage} />
        </div>
      </Router>
    );
  }
}

export default App;