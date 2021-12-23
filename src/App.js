import './App.css';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Homepage from './components/Homepage/Homepage';
import Sign from './components/Sign/Sign.js'
import User from './components/User/User'
import Post from './components/Post/Post'
import { useEffect, useState } from 'react';
import Create from './components/Create/Create';

function App() {
  const [pageLeave, setPageLeave] = useState(false)
  const [login, setLogin] = useState(false)
  const [userInfo, setUserInfo] = useState('')

  const localStorageLoad = () => {
    if (localStorage.getItem('create-app') == null) {
      localStorage.setItem('create-app', '[]')
    } else {
      let localToken = JSON.parse(localStorage.getItem('create-app'))
      setUserInfo(localToken[0])
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
        <Route path='/' element={<Homepage key={userInfo} setPageLeave={setPageLeave} pageLeave={pageLeave}/>}/>
        <Route path='/sign-in' element={<Sign key={userInfo} userInfo={userInfo} setUserInfo={setUserInfo} setPageLeave={setPageLeave} pageLeave={pageLeave} login={login} setLogin={setLogin}/>}/>
        <Route path='/users/:id' element={<User key={userInfo} userInfo={userInfo} setUserInfo={setUserInfo} setPageLeave={setPageLeave} pageLeave={pageLeave} login={login} setLogin={setLogin}/>}/>
        <Route path='/users/:id/:post_id' element={<Post key={userInfo} userInfo={userInfo} setUserInfo={setUserInfo} setPageLeave={setPageLeave} pageLeave={pageLeave} login={login} setLogin={setLogin}/>}/>
      </Routes>
      <Create userInfo={userInfo} setUserInfo={setUserInfo} setPageLeave={setPageLeave} pageLeave={pageLeave}/>
    </div>
  );
}

export default App;
