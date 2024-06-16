// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import TodayBirthdays from './pages/TodayBirthdays';
import AllEmployees from './pages/AllEmployees';
import Notification from './components/Notification';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/today-birthdays' element={<TodayBirthdays />} />
            <Route path='/employees' element={<AllEmployees />} />
          </Routes>
        </div>
      </Router>
      <Notification />
    </div>
  );
}


export default App;
