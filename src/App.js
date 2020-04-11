import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { myFetch } from './FetchHelper';

function App() {
  const [keyPressed, setKeyPressed] = useState(null)
  const [streams, setStreams] = useState(null)

  useEffect(() => {
    window.addEventListener('keydown', e => {
      setKeyPressed(e.keyCode)
    })

    myFetch('/streams?first=20', {method: 'GET'})
    .then(res => {
      setStreams(res.data)
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          KeyID: {String(keyPressed)}
        </p>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          {streams === null ? <p>Loading...</p> : streams.map(stream => <div style={{width: 400}}>
            <img src={stream.thumbnail_url.replace('{width}', 400).replace('{height}', 225)} alt=""/>
            <p>{stream.title}</p>
            <p>{stream.user_name}</p>
            <p>{stream.viewer_count}</p>
          </div>)}
        </div>
      </header>
    </div>
  );
}

export default App;
