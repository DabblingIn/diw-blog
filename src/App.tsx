import * as React from 'react';

import DefaultPage from './pages/DefaultPage';
import { defaultTheme as theme } from './style/themes'; 

import './App.css';
import './style/global.css';


const backgroundStyle = { 
  backgroundImage: theme.backgroundColor
};

const MARGIN_TOPBOTTOM = 20;

const appStyle = {
  marginTop: theme.navbarHeight + MARGIN_TOPBOTTOM,
  marginBottom: MARGIN_TOPBOTTOM
};

const backgroundStyle = { 
  backgroundImage: theme.backgroundColor
};

class App extends React.Component {
  public render() {
    return (
      <div style={appStyle}>
        <div className="app__background" style={backgroundStyle}/>
        <DefaultPage siteName="Dabbling In Web" />
      </div>
    );
  }
}

export default App;