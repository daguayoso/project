import React from 'react';


import '../styles/fuelQuoteHistoryTable.css'

function FuelQuoteHistoryTable({ fuelQuoteHistory }) {
  console.log(fuelQuoteHistory)
  return (
    
    <table>
      <thead>
        <tr>
          <th>Gallons Requested</th>
          <th>Delivery Date</th>
          <th>Delivery Address</th>
          <th>Suggested Price / Gallon &nbsp; &nbsp;</th>
          <th>Total Amount Due</th>
        </tr>
      </thead>
      <tbody>
        {fuelQuoteHistory.map((fuelQuote, index) => (
          <tr key={index}>
            <td>{fuelQuote.gallons}</td>
            <td>{fuelQuote.deliveryDate}</td>
            <td>{fuelQuote.address}</td>
            <td>{fuelQuote.price}</td>
            <td>{fuelQuote.totalAmountDue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FuelQuoteHistoryTable;
