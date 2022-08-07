import './App.css';
import { loadButtonDisabled } from './blackjack.js'
import React from 'react'
import { Game } from './blackjack.js'



function App() {
  window.addEventListener('load', loadButtonDisabled)
  
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
