import * as React from 'react';

import DefaultPage from './pages/DefaultPage';
import { defaultTheme as theme } from './style/themes'; 

import './App.css';
import './style/global.css';


const backgroundStyle = { 
  backgroundImage: theme.backgroundColor
};


class App extends React.Component {
  public render() {
    return (
      <div>
        <div className="app__background" style={backgroundStyle}/>
        <DefaultPage siteName="Dabbling In Web" />
      </div>
    );
  }
}

export default App;