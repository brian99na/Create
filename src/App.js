import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header/Header'
import Homepage from './components/Homepage/Homepage';
import { useEffect, useState } from 'react';
import Create from './components/Create/Create';

function App() {
  const [pageLeave, setPageLeave] = useState(false)

  const navigate = useNavigate()


  useEffect(() => {
    setPageLeave(true)
  }, [])

  return (
    <div className="App">
      <Header setPageLeave={setPageLeave} pageLeave={pageLeave}/>
      <Routes>
        <Route path='/' exact element={() => {<Homepage setPageLeave={setPageLeave} pageLeave={pageLeave}/>}}/>
      </Routes>
      <Create setPageLeave={setPageLeave} pageLeave={pageLeave}/>
    </div>
  );
}

export default App;
