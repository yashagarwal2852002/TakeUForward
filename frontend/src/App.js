import React from 'react';
import { Route, Routes} from 'react-router-dom';
import MainPage from './pages/MainPage.js';
import Dashboard from './components/Dahsboard';
import './App.css';

function App() {
  return (
    <Routes>
        <Route path="/" Component={MainPage}/>
        <Route path="/dashboard" Component={Dashboard} />
    </Routes>
  );
};

export default App;
