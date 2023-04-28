const express = require("express");

const router = express();

const mongoose = require('mongoose');


const cors = require('cors');
//middleware need to use read json requests (req.body)
router.use(express.json());
//middleware needed to access information between different domains
router.use(cors());


const currentDate = Date();
//this helps enforce field validation when the frontend makes request to the backend
const quoteSchema = new mongoose.Schema({
    username: {type: String, required: true, minLength: 8, maxLength: 20},
    gallons: {type: Number, required: true, min: 1},
    deliveryDate: {type: Date, required: true, min: currentDate},
    address: {type: String, required: true},
    price: {type: Number, required: true, min: 0.50},
    totalAmountDue: {type: Number, required: true, min: 0.50},
  });

  const Quote = mongoose.model("Quote", quoteSchema);

  router.get("/", async (req, res) => {
    res.sendStatus(200);
});

//lets us add quotes
  router.post("/addQuotes", async(req, res)=>{
    try {
        const username = req.body.username;
        const gallons = req.body.gallons;
        const deliveryDate = req.body.deliveryDate;
        const address = req.body.address;
        const price = req.body.price;
        const totalAmountDue = gallons*price;
        
       
        const quote = new Quote({username: username, gallons: gallons, deliveryDate: deliveryDate, address: address, price: price, totalAmountDue: totalAmountDue});

      
        await quote.save();
        res.json({ success: true });
      } catch (error) {
        res.json({ success: false, error: error.message });
      }

  });


    //gets our quote history
   // return a hardcoded Value array of quoteHistory
    router.get("/quoteHistory/:username", async (req, res) => {
      const username = req.params.username;
      Quote.find({username:username})
    .then(quotes => res.json (quotes))
    .catch(err => res.status(400).json('Error' + err));
  });

module.exports = router
