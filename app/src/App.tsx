import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CreateCardForm } from './components/create-card-form.component';

function App() {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <CreateCardForm />
        </div>      
        <div className='col text-center'>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default App;
