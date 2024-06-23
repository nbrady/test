import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CreateCardForm } from './components/create-card-form.component';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <CreateCardForm />
      </header>
    </div>
  );
}

export default App;
