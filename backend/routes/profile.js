const express = require("express");

const router = express();

const mongoose = require('mongoose');

const cors = require('cors')
//middleware need to use read json requests (req.body)
router.use(express.json());
//middleware needed to access information between different domains
router.use(cors());
//enforces field validation in the backend
const profileSchema = new mongoose.Schema({
    username: {type: String, required: true, minLength: 8, maxLength: 20, unique: true},
    fullName: {type: String, required: true, maxLength: 50},
    address1: {type: String, required: true, maxLength: 100},
    address2: {type: String, required: false, maxLength: 100},
    city: {type: String, required: true, maxLength: 100},
    state: {type:String, required: true, minLength:1, maxLength: 2},
    zipcode: {type: String, required: true, minLength: 5, maxLength: 7}
  });
  
  const Profile = mongoose.model("Profile", profileSchema);


  router.get("/", async (req, res) => {
    res.sendStatus(200);
});


  // return a profile by username
  router.get("/:username", async (req, res) => {
      Profile.findOne({username: req.params.username})
     .then(profileInfo => res.json (profileInfo))
    .catch(err => res.status(400).json('Error' + err));
});


  //adds a profile to the username
  router.post("/addProfile", async(req, res)=>{
    try {
        const username = req.body.username;
        const fullName = req.body.fullName;
        const address1 = req.body.address1;
        const address2 = req.body.address2;
        const city = req.body.city;
        const state = req.body.state;
        const zipcode = req.body.zipcode;

        const profile = new Profile({username: username, fullName: fullName, address1: address1, address2: address2, city: city, state: state, zipcode: zipcode});
        await profile.save();
        res.json({ success: true });
      } catch (error) {
        res.json({ success: false, error: error.message });
      }
  })
  /*router,put('/:username', async(req, res)=>{
    )
  */
 
  router.post("/updateProfile", async(req, res)=>{
      try{
        const username = req.body.username;
        const fullName = req.body.fullName;
        const address1 = req.body.address1;
        const address2 = req.body.address2;
        const city = req.body.city;
        const state = req.body.state;
        const zipcode = req.body.zipcode;

        await Profile.updateOne({username: username}, {fullName: fullName, address1: address1, address2: address2, city: city, state: state, zipcode: zipcode})
        res.json({success: true});
      }
      catch(error){
        res.json({error: error.message});
      }
  })
    
module.exports = router;
