const express = require("express");

const router = express.Router();

const mongoose = require('mongoose');

const cors = require('cors')
//middleware need to use read json requests (req.body)
router.use(express.json());
//middleware needed to access information between different domains
router.use(cors());


//enforces field validation in the backend
const profileSchema = new mongoose.Schema({
    fullName: {type: String, required: true, maxLength: 50},
    address1: {type: String, required: true, maxLength: 100},
    address2: {type: String, required: false, maxLength: 100},
    city: {type: String, required: true, maxLength: 100},
    state: {type:String, required: true, minLength:1, maxLength: 2},
    zipcode: {type: String, required: true, minLength: 5, maxLength: 7}
  });
  
  const Profile = mongoose.model("Profile", profileSchema);


  router.post("/addProfile", async(req, res)=>{
    try {
        const fullName = req.body.fullName;
        const address1 = req.body.address1;
        const address2 = req.body.address2;
        const city = req.body.city;
        const state = req.body.state;

        const profile = new Profile({fullName: fullName, address1: address1, address2: address2, city: city, state: state});
        await profile.save();
        res.json({ success: true });
      } catch (error) {
        res.json({ success: false, error: error.message });
      }
  })
  
  



module.exports = router;