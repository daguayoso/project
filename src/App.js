import React, { useState } from 'react';
import { BrowserRouter as Router, Route ,Navigate, Routes} from 'react-router-dom';
import FuelQuoteForm from './pages/FuelQuoteForm';
import FuelQuoteHistory from './pages/FuelQuoteHistory';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Navbar from './pages/Navbar';
import './styles/LoginPage.css';
import Profile from './pages/Profile';
//import './Profile.css';
import './styles/FQF.css';

function App() {
  
  return (
  <div>
  
        <Navbar />
        <Routes>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/history" exact component={FuelQuoteHistory} />
          <Route path="/form" exact component={FuelQuoteForm} />
        </Routes>
        
      

      </div>
  );
}

export default App;