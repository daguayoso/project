const express = require("express");

const router = express.Router();

const mongoose = require('mongoose');

const cors = require('cors')
//middleware need to use read json requests (req.body)
router.use(express.json());
//middleware needed to access information between different domains
router.use(cors());

//enforces field validation in the backend
const pricingSchema = new mongoose.Schema({
 gallons: {type: Number, required: true, minimum: .50}
  
});


const Pricing = mongoose.model("Pricing", pricingSchema);


 // for now we will send a placer value
router.get("/getPricing", async (req, res) => {
     res.send("3.44");

});









module.exports = router;