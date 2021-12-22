import './App.css';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Homepage from './components/Homepage/Homepage';
import Sign from './components/Sign/Sign.js'
import User from './components/Users/User'
import { useEffect, useState } from 'react';
import Create from './components/Create/Create';

function App() {
  const [pageLeave, setPageLeave] = useState(false)
  const [login, setLogin] = useState(false)
  const [userInfo, setUserInfo] = useState({})

  const localStorageLoad = () => {
    if (localStorage.getItem('create-app') == null) {
      localStorage.setItem('create-app', '[]')
    } else {
      let localToken = localStorage.getItem('create-app')
      setUserInfo(localToken)
    }
  }

  useEffect(() => {
    setPageLeave(false)
    localStorageLoad()
  }, [])

  console.log(userInfo)

  return (
    <div className="App">
      <Header userInfo={userInfo} setUserInfo={setUserInfo} setPageLeave={setPageLeave} pageLeave={pageLeave}/>
      <Routes>
        <Route path='/' exact element={<Homepage setPageLeave={setPageLeave} pageLeave={pageLeave}/>}/>
        <Route path='/sign-in' exact element={<Sign userInfo={userInfo} setUserInfo={setUserInfo} setPageLeave={setPageLeave} pageLeave={pageLeave} login={login} setLogin={setLogin}/>}/>
        <Route path='/users/:id' exact element={<User userInfo={userInfo} setUserInfo={setUserInfo} setPageLeave={setPageLeave} pageLeave={pageLeave} login={login} setLogin={setLogin}/>}/>
      </Routes>
      <Create setPageLeave={setPageLeave} pageLeave={pageLeave}/>
    </div>
  );
}

export default App;
