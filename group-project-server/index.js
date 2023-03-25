//most of our backend requests are stored in index.js

const fs = require("fs/promises")
const express = require("express")
const cors = require("cors")
const _ = require("lodash")
const {v4 : uuid} = require("uuid")
const path = require('path');
const app = express();


const loginRouter = require('./routes/login');
const quotesRouter = require('./routes/quotes');
const profileRouter = require('./routes/profile');
const pricingRouter = require('./routes/pricing');

app.use('/login', loginRouter);
app.use('/quotes', quotesRouter);
app.use('/profile', profileRouter);
app.use('/pricing', pricingRouter);

app.listen(4000, ()=> console.log("Server is running on 4000"));


const mongoose = require("mongoose");




app.use(cors());
app.use(express.json());

