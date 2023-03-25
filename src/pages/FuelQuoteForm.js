import React, { useState } from 'react';
import { useNavigate , Link,Routes,Route,Router} from 'react-router-dom';
import FuelQuoteHistory from './FuelQuoteHistory';
import Navbar from './Navbar';
import axios from 'axios';
function FuelQuoteForm() {
 
  const [address, setAddress] = useState('12345 Destination rd Houston TX 76543');
  const [gallons, setGallons] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [price, setPrice] = useState('');
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

  const saveFormData = async () => {
    const amount = gallons * price;
    const formData = { 
        "gallons": gallons,
        "deliveryDate": deliveryDate,
        "address": address, 
        "price": price, 
        "totalAmountDue": totalAmountDue
    };

    const response = await axios.post( `http://localhost:4000/quotes/addQuotes`, formData); 
    console.log(response);
    
  };

  // form submission
  const handleSubmit = async () => {
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
          <input type="text" value={address} required onChange={(event) => setAddress(event.target.value)}/>
        </div>
        <div>
          <label>Delivery Date:</label>
          <input type="date" required onChange={(event) => setDeliveryDate(event.target.value)} />
        </div>
        <div>
          <label>Suggested Price / Gallon:</label>
          <input type="number" value={price} onChange={(event) => setPrice(event.target.value)}  />
        </div>
        <div>
          <label>Total Amount Due:</label>
          <input type="number" value={totalAmountDue} onChange={(event) => setTotalAmountDue(event.target.value)} />
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



