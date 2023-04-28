const express = require("express");

const router = express();

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const cors = require('cors')
//middleware need to use read json requests (req.body)
router.use(express.json());
//middleware needed to access information between different domains
router.use(cors());

//this helps enforce field validation when we are trying to add a new user 
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, minLength: 8, maxLength: 20, unique: true},
    password: {type: String, required: true},
  });

  const User = mongoose.model("User", userSchema);


router.get("/", async(req, res) =>{
    res.sendStatus(200);
})


router.post("/register", async (req, res) => {
      try {
        const username = req.body.username;
        const password = req.body.password;
        var saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({ username: username, password: hashedPassword });
        await user.save();
        res.json({ success: true });
      } catch (error) {
        res.status(error);
      }
    });


//this is where user authentication occurs when signing in
router.get("/:username/:password", async (req, res) => {
       try{
        const username = req.params.username;
        const password = req.params.password;
        var saltRounds = 10;
        const userFound = await User.findOne({username: username});
        //await bcrypt.compare(password, userFound.password);
        if (userFound){
          res.json({success: true});
        }else{
          res.json({success: false});
        }
       }catch(error){
        res.status(500).json({ error: error.message });
       }
    });



module.exports = router
