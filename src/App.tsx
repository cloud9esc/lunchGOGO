import React from 'react';
import './App.css';
import Spinner from './Spinner';
import NewMenu from './NewMenu';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="App-background" />
      <div className="App-header">
        <h1>Lunch Lunch 고고씽</h1>
        <Spinner />
      </div>
      <NewMenu />
    </div>
  );
}

export default App;
