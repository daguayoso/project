const request = require ('supertest');

const app = require('../routes/profile');

const  { MongoMemoryServer } = require("mongodb-memory-server");

const mongoose = require("mongoose");

require('dotenv').config();




describe ("GET /", () =>{
    test("should respond with a 200 status code", async()=>{
        const response = await request(app).get("/")
        expect(response.statusCode).toBe(200)
    })
})


describe ("GET /", () =>{
    describe("connection", () => {
        beforeAll(async () => {
          const mongoServer = await MongoMemoryServer.create();
      
          await mongoose.connect(process.env.ATLAS_URI);
        });
      
        afterAll(async () => {
          await mongoose.disconnect();
          await mongoose.connection.close();
        });

        test("should respond with status code of 200 since this user has a profile ", async()=>{
            const response = await request(app).get("/joseph2003")
            expect(response.statusCode).toBe(200)
        })

        test("should respond with response of null since this user doesn't have a  profile ", async()=>{
            const response = await request(app).get("/n")
            expect(response._body).toBe(null)
        })

    })
})

//tests if user informations gets saved to the username properly
describe ("POST /addProfile", ()=>{

    describe("connection", () => {
        beforeAll(async () => {
          const mongoServer = await MongoMemoryServer.create();
      
          await mongoose.connect(process.env.ATLAS_URI);
        });
      
        afterAll(async () => {
          await mongoose.disconnect();
          await mongoose.connection.close();
        });


        test("should respond with success of true if profile is saved to the database", async()=>{

        let random_username = '';
         const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 12; i++) {
              random_username += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        const profileInput = {
        username : random_username,
        fullName : 'Joseph Jophy',
        address1 : '3815 Hunters Gate Ct.',
        address2 : '',
        city : 'Sugar Land',
        state :'TX',
        zipcode : '77479',
        };

        const response = await request(app).post("/addProfile").send(profileInput)
        expect(response._body.success).toBe(true)
        
        })


    })

})


//tests if user informations gets saved to the username properly
describe ("POST /updateProfile", ()=>{

    describe("connection", () => {
        beforeAll(async () => {
          const mongoServer = await MongoMemoryServer.create();
      
          await mongoose.connect(process.env.ATLAS_URI);
        });
      
        afterAll(async () => {
          await mongoose.disconnect();
          await mongoose.connection.close();
        });


        test("should respond with success of true if profile is saved to the database", async()=>{

       

        const profileInput = {
        username : 'joseph2003',
        fullName : 'Joseph Jophy',
        address1 : '3815 Hunters Gate Ct.',
        address2 : '',
        city : 'Sugar Land',
        state :'TX',
        zipcode : '77479',
        };

        const response = await request(app).post("/updateProfile").send(profileInput)
        expect(response._body.success).toBe(true)
        
        })


    })

})

