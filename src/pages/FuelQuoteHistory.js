import React, { useEffect, useState } from 'react';
import FuelQuoteHistoryTable from './FuelQuoteHistoryTable';
import Navbar from './Navbar';
function FuelQuoteHistory() {
  const [fuelQuoteHistory, setFuelQuoteHistory] = useState([]);

  useEffect(() => {
    const storedFuelQuoteHistory = JSON.parse(localStorage.getItem('fuelQuoteHistory')) || [];
    setFuelQuoteHistory(storedFuelQuoteHistory);
  }, []);

  return (
    <div>
      <Navbar/>
      <h1>Fuel Quote History</h1>
      <FuelQuoteHistoryTable fuelQuoteHistory={fuelQuoteHistory} />
    </div>
    
  );
}

export default FuelQuoteHistory;

