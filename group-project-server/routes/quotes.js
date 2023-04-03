const express = require("express");

const router = express.Router();

const mongoose = require('mongoose');


const cors = require('cors')
//middleware need to use read json requests (req.body)
router.use(express.json());
//middleware needed to access information between different domains
router.use(cors());


//this helps enforce field validation when the frontend makes request to the backend
const quoteSchema = new mongoose.Schema({
    gallons: {type: Number, required: true, minimum: 1},
    deliveryDate: {type: Date, required: true},
    address: {type: String, required: true},
    price: {type: Number, required: true, minimimum: 0.50},
    totalAmountDue: {type: Number, required: true, minimum: 0.50},
  });

  const Quote = mongoose.model("Quote", quoteSchema);

//lets us add quotes
  router.post("/addQuotes", async(req, res)=>{
    try {
        const gallons = req.body.gallons;
        const deliveryDate = req.body.deliveryDate;
        const address = req.body.address;
        const price = req.body.price;
        const totalAmountDue = gallons*price;

        const quote = new Quote({gallons: gallons, deliveryDate: deliveryDate, address: address, price: price, totalAmountDue: totalAmountDue});
        await quote.save();
        res.json({ success: true });
      } catch (error) {
        res.json({ success: false, error: error.message });
      }

  });


    //gets our quote history
   // return a hardcoded Value array of quoteHistory
    router.get("/quoteHistory", async (req, res) => {
      Quote.find()
    .then(quotes => res.json (quotes))
    .catch(err => res.status(400).json('Error' + err));
  });

module.exports = router
