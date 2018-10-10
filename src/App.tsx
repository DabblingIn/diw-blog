import * as React from 'react';
import './App.css';

import DefaultPage from './pages/DefaultPage';


class App extends React.Component {
  public render() {
    return (
      <DefaultPage siteName="Dabbling In Web" />
    );
  }
}

export default App;