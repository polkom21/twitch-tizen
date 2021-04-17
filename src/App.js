import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import useApi from './customHooks/useApi';

function App() {
  const [keyPressed, setKeyPressed] = useState(null)
  const [streams, setStreams] = useState(null)

  const { isLoading, data, error, progress, apiCall } = useApi();

  useEffect(() => {
    window.addEventListener('keydown', e => {
      setKeyPressed(e.keyCode)
    })

    apiCall('/streams?first=10');
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          KeyID: {String(keyPressed)}
          {progress}
        </p>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          {isLoading === true ? <p>Loading...</p> : data.streams.map(stream => <div style={{width: 400}}>
            <img src={stream.preview.medium} alt=""/>
            <p>{stream.channel.status}</p>
            <p>{stream.channel.display_name}</p>
            <p>{stream.viewers}</p>
          </div>)}
        </div>
      </header>
    </div>
  );
}

export default App;
