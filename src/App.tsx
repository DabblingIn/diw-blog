import * as React from 'react';
//import './css/diw-blog.css';
import './App.css';
import './style/global.css';
import { defaultTheme as theme } from './style/themes'; 


import DefaultPage from './pages/DefaultPage';

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