import './App.css';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Homepage from './components/Homepage/Homepage';
import { AiOutlinePlus } from 'react-icons/ai'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' exact element={() => {<Homepage />}}/>
      </Routes>
      <div className='create-icon-1'>
        <div className=''></div>
        <AiOutlinePlus />
        <div className='create-icon-2'></div>
      </div>
    </div>
  );
}

export default App;
