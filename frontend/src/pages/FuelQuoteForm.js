import React, { useState, useEffect } from 'react';
import { useNavigate , Link,Routes,Route,Router} from 'react-router-dom';
import FuelQuoteHistory from './FuelQuoteHistory';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import '../styles/LoginPage.css'; 

function FuelQuoteForm() {
 
  const [address, setAddress] = useState('');
  const [gallons, setGallons] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [price, setPrice] = useState('');
  const [totalAmountDue, setTotalAmountDue] = useState('');
  
  const history = useNavigate();
  const [currentPage, setCurrentPage] = useState('login');

  const [State, setState] = useState('TX');


  useEffect(() => {
    setInfo();
    setPricing();
  });

  const setInfo = async()=>{

    const response = await axios.get(`http://localhost:4000/profile/${localStorage.getItem("username")}`);
    setAddress(response.data.address1);
    setState(response.data.state);
    console.log(State);
    const response2 = await axios.get(`http://localhost:4000/quotes/quoteHistory/${localStorage.getItem("username")}`);
    const numQuotes = response2.data.length;
    const response3 = await axios.get(`http://localhost:4000/pricing/${State}/${numQuotes}/${gallons}`);
    console.log(response3.data);
    setPrice(response3.data);
    console.log(price*gallons);
    setTotalAmountDue(price*gallons);
  }

  const setPricing = async()=>{
    /*
    const response = await axios.get(`http://localhost:4000/quotes/quoteHistory/${localStorage.getItem("username")}`);
    const numQuotes = response.data.length;
    console.log(State);
    const response2 = await axios.get(`http://localhost:4000/pricing/${State}/${numQuotes}/${gallons}`);
    console.log(response2.data);
    */
  }
  

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };


  const saveFormData = async () => {
    const amount = gallons * price;
    const formData = { 
        "username": localStorage.getItem("username"),
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
    <div>
    <Navbar/>
    <div className="FuelQuoteForm">

      <center>
      <h1>Fuel Quote Form</h1>
      <form>
        <div>
          <label className='fuel-form-placeholder'>Gallons Requested:</label>
          <input type="number" value={gallons} required onChange={(event) => setGallons(event.target.value)}/>
        </div>
        <div>
          <label className='fuel-form-placeholder'>Delivery Address:</label>
          <input type="text" value={address}  readOnly/>
        </div>
        <div>
          <label className='fuel-form-placeholder'>Delivery Date:</label>
          <input type="date" required onChange={(event) => setDeliveryDate(event.target.value)} />
        </div>
        <div>
          <label className='fuel-form-placeholder'>Suggested Price / Gallon:</label>
          <input type="number" value={price} readOnly/>
        </div>
        <div>
          <label className='fuel-form-placeholder'>Total Amount Due:</label>
          <input type="number" value={totalAmountDue}  readOnly/>
        </div>
      </form>
      
    <button
    type="button"
    onClick={(e) => {
      handleSubmit();
      }}>
     Submit Fuel Quote
    </button>

    </center>
    
    
      </div>
      </div>
  );
}


export default FuelQuoteForm;



