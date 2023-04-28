const request = require ('supertest');

const app = require('../routes/login');


const  { MongoMemoryServer } = require("mongodb-memory-server");

const mongoose = require("mongoose");

require('dotenv').config();




describe ("GET /", () =>{
    test("should respond with a 200 status code", async()=>{
        const response = await request(app).get("/")
        expect(response.statusCode).toBe(200)
    })
})

//tests if username gets authenticated properly
describe ("GET /:username/:password", () =>{

    describe("connection", () => {
        beforeAll(async () => {
          const mongoServer = await MongoMemoryServer.create();
      
          await mongoose.connect(process.env.ATLAS_URI);
        });
      
        afterAll(async () => {
          await mongoose.disconnect();
          await mongoose.connection.close();
        });


    test("should respond with success of true since user exists ", async()=>{
        const response = await request(app).get("/joseph2003/jennifer2006")
        expect(response._body.success).toBe(true)
    })

    test("should respond with success of false since user does not exist", async()=>{
        const response = await request(app).get("/a/a")
        expect(response._body.success).toBe(false)
    })

    
  })
})


//tests if user informations gets saved to the username properly
describe ("POST /register", ()=>{

    describe("connection", () => {
        beforeAll(async () => {
          const mongoServer = await MongoMemoryServer.create();
      
          await mongoose.connect(process.env.ATLAS_URI);
        });
      
        afterAll(async () => {
          await mongoose.disconnect();
          await mongoose.connection.close();
        });


        test("should respond with success of true if user is saved to the database", async()=>{

          let random_username = '';
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          for (let i = 0; i < 12; i++) {
            random_username += characters.charAt(Math.floor(Math.random() * characters.length));
          }

          let random_password = '';
          for (let i = 0; i < 12; i++) {
            random_password += characters.charAt(Math.floor(Math.random() * characters.length));
          }
        

        const userInput = {
            username: random_username,
            password: random_password
        };

        const response = await request(app).post("/register").send(userInput)
        expect(response._body.success).toBe(true)
     
        
        })


    })

})