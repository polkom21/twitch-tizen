import React, { useState, useEffect } from 'react';
import './App.css';
import useApi from './customHooks/useApi';

function App() {
  const [, setKeyPressed] = useState(null)

  const { isLoading, data, apiCall } = useApi();

  useEffect(() => {
    window.addEventListener('keydown', e => {
      setKeyPressed(e.keyCode)
    })

    apiCall('/streams?first=10');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <header className="App-header">
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
