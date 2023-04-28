const request = require ('supertest');

const app = require('../routes/quotes');


const  { MongoMemoryServer } = require("mongodb-memory-server");

const mongoose = require("mongoose");

require('dotenv').config();




describe ("GET /", () =>{
    test("should respond with a 200 status code", async()=>{
        const response = await request(app).get("/")
        expect(response.statusCode).toBe(200)
    })
})

describe ("GET /quoteHistory/:username", () =>{

    describe("connection", () => {
        beforeAll(async () => {
          const mongoServer = await MongoMemoryServer.create();
      
          await mongoose.connect(process.env.ATLAS_URI);
        });
      
        afterAll(async () => {
          await mongoose.disconnect();
          await mongoose.connection.close();
        });

    test("should respond with a 200 status code since this user has a quote history", async()=>{
        const response = await request(app).get("/quoteHistory/joseph2003")
        expect(response.statusCode).toBe(200)
    })

    
})


})

describe ("POST /addQuotes", () =>{

    describe("connection", () => {
        beforeAll(async () => {
          const mongoServer = await MongoMemoryServer.create();
      
          await mongoose.connect(process.env.ATLAS_URI);
        });
      
        afterAll(async () => {
          await mongoose.disconnect();
          await mongoose.connection.close();
        });

    test("should respond with success value of true since quote is added", async()=>{
        
        const quoteInput = {
            username : 'test_username',
            gallons: 2,
            deliveryDate: '2033-06-21T00:00:00.000Z',
            address : '3815 hunters',
            price: 3.1,
            };

        const response = await request(app).post("/addQuotes").send(quoteInput)
        expect(response._body.success).toBe(true)
    })


    test("should respond with success value of false since the date is way before the current date", async()=>{
        
        const quoteInput = {
            username : 'test_username',
            gallons: 2,
            deliveryDate: '2020-06-21T00:00:00.000Z',
            address : '3815 hunters',
            price: 3.1,
            };

        const response = await request(app).post("/addQuotes").send(quoteInput)
        expect(response._body.success).toBe(false)
    })

    
})


})


