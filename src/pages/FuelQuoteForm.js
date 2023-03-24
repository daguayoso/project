import React, { useState } from 'react';
import { useNavigate , Link,Routes,Route,Router} from 'react-router-dom';
import FuelQuoteHistory from './FuelQuoteHistory';
import Navbar from './Navbar';
function FuelQuoteForm() {
 
  const [address, setAddress] = useState('12345 Destination rd Houston TX 76543');
  const [gallons, setGallons] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [price, setPrice] = useState('2.88');
  const [totalAmountDue, setTotalAmountDue] = useState('');
  
  const history = useNavigate();
  const [currentPage, setCurrentPage] = useState('login');

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };
  // Function to calculate  price
  const calculateTotalAmountDue = () => {
    const amount = gallons * price;
    setTotalAmountDue(amount.toFixed(2));
  };

  const saveFormData = () => {
    const amount = gallons * price;
    const formData = { address, gallons, deliveryDate, price, totalAmountDue: amount.toFixed(2), pricePerGallon: price };
    const fuelQuoteHistory = JSON.parse(localStorage.getItem('fuelQuoteHistory') || '[]');
    fuelQuoteHistory.push(formData);
    localStorage.setItem('fuelQuoteHistory', JSON.stringify(fuelQuoteHistory));
  };

  // form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    calculateTotalAmountDue();
    saveFormData();
  };

  return (
    <div className="FuelQuoteForm">
      <Navbar/>
      <h1>Fuel Quote Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Gallons Requested:</label>
          <input type="number" value={gallons} required onChange={(event) => setGallons(event.target.value)} />
        </div>
        <div>
          <label>Delivery Address:</label>
          <input type="text" value={address} readOnly />
        </div>
        <div>
          <label>Delivery Date:</label>
          <input type="date" value={deliveryDate} onChange={(event) => setDeliveryDate(event.target.value)} />
        </div>
        <div>
          <label>Suggested Price / Gallon:</label>
          <input type="number" value={price} readOnly />
        </div>
        <div>
          <label>Total Amount Due:</label>
          <input type="number" value={totalAmountDue} readOnly />
        </div>
        <button type="submit">Calculate Total Amount Due</button>
      </form>
      
    <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='History';
      }}>
     Fuel Quote History
    </button>
    
    
      </div>
  );
}


export default FuelQuoteForm;

