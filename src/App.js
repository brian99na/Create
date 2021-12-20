import './App.css';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Homepage from './components/Homepage/Homepage';
import Sign from './components/Sign/Sign.js'
import { useEffect, useState } from 'react';
import Create from './components/Create/Create';

function App() {
  const [pageLeave, setPageLeave] = useState(false)
  const [login, setLogin] = useState(false)


  useEffect(() => {
    setPageLeave(true)
  }, [])

  return (
    <div className="App">
      <Header setPageLeave={setPageLeave} pageLeave={pageLeave}/>
      <Routes>
        <Route path='/' exact element={<Homepage setPageLeave={setPageLeave} pageLeave={pageLeave}/>}/>
        <Route path='/sign-in' exact element={<Sign setPageLeave={setPageLeave} pageLeave={pageLeave} login={login} setLogin={setLogin}/>}/>
      </Routes>
      <Create setPageLeave={setPageLeave} pageLeave={pageLeave}/>
    </div>
  );
}

export default App;
