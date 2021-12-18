import './App.css';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Homepage from './components/Homepage/Homepage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' exact element={() => {<Homepage />}}/>
      </Routes>
    </div>
  );
}

export default App;
