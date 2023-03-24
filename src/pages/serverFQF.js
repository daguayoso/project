const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// Load quotes from local storage
let quoteHistory = JSON.parse(localStorage.getItem('quoteHistory')) || [];

const validateFormData = (formData) => {
  if (!formData.gallons || typeof formData.gallons !== 'number') {
    throw new Error('Invalid gallons requested');
  }
  if (!formData.deliveryDate || typeof formData.deliveryDate !== 'string') {
    throw new Error('Invalid delivery date');
  }
};

const calculateTotalAmountDue = (gallons, price) => {
  const amount = gallons * price;
  return amount.toFixed(2);
};

app.post('/fuelQuote', (req, res) => {
  try {
    const formData = req.body;
    validateFormData(formData);
    const { gallons, deliveryDate } = formData;
    const price = 2.88; 
    const totalAmountDue = calculateTotalAmountDue(gallons, price);
    const quote = { ...formData, price, totalAmountDue };
    quoteHistory.push(quote);

    // Save updated quotes to local storage
    localStorage.setItem('quoteHistory', JSON.stringify(quoteHistory));

    res.status(200).json(quote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/quoteHistory', (req, res) => {
  // Return existing quotes from local storage
  res.status(200).json(quoteHistory);
});

app.listen(3000, () => console.log('Server started on port 3000'));
