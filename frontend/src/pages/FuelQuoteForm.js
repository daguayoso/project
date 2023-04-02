import React, { useState } from 'react';
import { useNavigate , Link,Routes,Route,Router} from 'react-router-dom';
import FuelQuoteHistory from './FuelQuoteHistory';
import '../styles/FuelQuoteForm.css'
import Navbar from './Navbar';
import axios from 'axios';
import '../styles/LoginPage.css'; 

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
        "gallons": Number(gallons),
        "deliveryDate": deliveryDate,
        "address": address, 
        "price": Number(price), 
        "totalAmountDue": Number(totalAmountDue)
    };

    const response = await axios.post( `http://localhost:4000/quotes/addQuotes`, formData); 
    console.log(response);
    
  };

  // form submission
  const calculate = async () => {
    calculate();
  }

  const handleSubmit = async () => {
    saveFormData();
  };

  return (
    <div className="FuelQuoteForm">
      <Navbar/>

      <center>
      <h1>Fuel Quote Form</h1>
      <form>
        <div>
          <label className='fuel-form-placeholder'>Gallons Requested:</label>
          <input type="number" value={gallons} required onChange={(event) => setGallons(event.target.value)} />
        </div>
        <div>
          <label className='fuel-form-placeholder'>Delivery Address:</label>
          <input type="text" value={address} required onChange={(event) => setAddress(event.target.value)}/>
        </div>
        <div>
          <label className='fuel-form-placeholder'>Delivery Date:</label>
          <input type="date" required onChange={(event) => setDeliveryDate(event.target.value)} />
        </div>
        <div>
          <label className='fuel-form-placeholder'>Suggested Price / Gallon:</label>
          <input type="number" value={price} onChange={(event) => setPrice(event.target.value)}  />
        </div>
      </form>
      
    <button
    type="button"
    onClick={(e) => {
      handleSubmit();
      window.location.href='History';
      }}>
     Submit Fuel Quote
    </button>

    </center>
    
    
      </div>
  );
}


export default FuelQuoteForm;



