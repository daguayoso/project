import React, { useEffect, useState } from 'react';
import FuelQuoteHistoryTable from './FuelQuoteHistoryTable';
import Navbar from './Navbar';
import axios from 'axios';
import { Await } from 'react-router-dom';
function FuelQuoteHistory() {
  const [fuelQuoteHistory, setFuelQuoteHistory] = useState([]);

  useEffect(() => {
      history();
  }, []);

  const history = async () => {
    const response = await axios.get( `http://localhost:4000/quotes/quoteHistory`); 

    console.log(response.data);

    setFuelQuoteHistory(response.data);
      
  
};

  return (
    <div>
      <Navbar/>
      <h1>Fuel Quote History</h1>
      <FuelQuoteHistoryTable fuelQuoteHistory={fuelQuoteHistory} />
    </div>
    
  );
}

export default FuelQuoteHistory;

