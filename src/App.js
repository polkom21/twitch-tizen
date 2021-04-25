import React, { useState, useEffect } from 'react';
import './App.css';
import useApi from './customHooks/useApi';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LoginPage } from './pages'
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import { initAuth } from './features/Auth';
import { useDispatch } from 'react-redux';

function App() {
  // const [, setKeyPressed] = useState(null)

  // const { isLoading, data, apiCall } = useApi();

  // useEffect(() => {
  //   window.addEventListener('keydown', e => {
  //     setKeyPressed(e.keyCode)
  //   })

  //   apiCall('/streams?first=10');
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAuth());
  }, [])
  
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/" component={Dashboard} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
  //         {isLoading === true ? <p>Loading...</p> : data.streams.map(stream => <div key={stream._id} style={{width: 400}}>
  //           <img src={stream.preview.medium} alt=""/>
  //           <p>{stream.channel.status}</p>
  //           <p>{stream.channel.display_name}</p>
  //           <p>{stream.viewers}</p>
  //         </div>)}
  //       </div>
  //     </header>
  //   </div>
  // );
}

export default App;
