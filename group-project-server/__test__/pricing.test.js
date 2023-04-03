const request = require ('supertest');

const app = require('../routes/pricing');

describe ("GET Pricing", () =>{
    test("should respond with a 200 status code", async()=>{
        const response = await request(app).get("/")
        expect(response.statusCode).toBe(200)
    })
})
