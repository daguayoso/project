const express = require("express");

const router = express();

const mongoose = require('mongoose');

const cors = require('cors')
//middleware need to use read json requests (req.body)
router.use(express.json());
//middleware needed to access information between different domains
router.use(cors());

router.get("/", async(req, res) =>{
     res.sendStatus(200);
})

 // for now we will send a placer value
router.get("/:location/:ratehistory/:gallonsrequested", async (req, res) => {
     try{
     const location = req.params.location;
     const ratehistory = req.params.ratehistory;
     const gallonsrequested = req.params.gallonsrequested;
     const currentPrice = 1.50;
     
     const locationFactor = location == "TX" ? .02 : .04;
     const ratehistoryFactor = ratehistory >= 1 ? .01 : 0;
     const gallonsrequestedFactor = gallonsrequested > 1000 ? .02 : .03;
     const companyprofitFactor = .1;

     const margin = currentPrice *  (locationFactor - ratehistoryFactor + gallonsrequestedFactor + companyprofitFactor);

     const suggestedPrice = currentPrice + margin;
     res.json(suggestedPrice);
     }
     catch(error){
          res.json(error);
     }
   
});

module.exports = router;
