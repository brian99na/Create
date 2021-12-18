import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header/Header'
import Homepage from './components/Homepage/Homepage';
import { AiOutlinePlus } from 'react-icons/ai'

function App() {

  const navigate = useNavigate()

  const handleCreateClick = () => {
    setTimeout(() => {
      navigate('/create')
    }, 500)
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' exact element={() => {<Homepage />}}/>
      </Routes>
      <div className='create-icon'>
        <div className='create-icon-main'>
          <div className='create-icon-1'></div>
          <AiOutlinePlus className='create-icon-2' onClick={handleCreateClick}/>
          <div className='create-icon-3'></div>
        </div>
      </div>
    </div>
  );
}

export default App;
