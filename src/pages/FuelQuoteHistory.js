import React, { useEffect, useState } from 'react';
import FuelQuoteHistoryTable from './FuelQuoteHistoryTable';
import Navbar from './Navbar';
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';
import { Await } from 'react-router-dom';

function FuelQuoteHistory() {
  const [fuelQuoteHistory, setFuelQuoteHistory] = useState([]);

  const { state } = useLocation();
  console.log(state);


  useEffect(() => {
      history();
  }, []);

  const history = async () => {
    const response = await axios.get( `http://localhost:4000/quotes/quoteHistory/${localStorage.getItem("username")}`); 

    console.log(response.data);

    setFuelQuoteHistory(response.data);
  
};

  return (
    <div>
      <Navbar/>
      <center>
      <h1>Fuel Quote History</h1>
      <FuelQuoteHistoryTable fuelQuoteHistory={fuelQuoteHistory} />
      </center>
    </div>
    
  );
}

export default FuelQuoteHistory;

