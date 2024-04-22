import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Components/Card'


function App() {
  const [musicNumber, setMusicNumber] = useState(0)


  return (
    <div className="container">
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>
      <main>
        <Card props={{musicNumber, setMusicNumber}}/>
      </main>
    </div>
  );
}

export default App;
