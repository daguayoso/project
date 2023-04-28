const request = require ('supertest');

const app = require('../routes/pricing');




describe ("GET /", () =>{
    test("should respond with a 200 status code", async()=>{
        const response = await request(app).get("/")
        expect(response.statusCode).toBe(200)
    })
})



//tests if the pricing module is correct
describe("GET /:location/:ratehistory/:gallonsrequested", ()=>{


    test("should return 1.695", async()=>{
        const response = await request(app).get("/TX/1/1002")
        expect(response.text).toBe("1.695")
    })

    test("should return 1.695", async()=>{
        const response = await request(app).get("/TX/0/1002")
        expect(response.text).toBe("1.71")
    })

    test("should return 1.695", async()=>{
        const response = await request(app).get("/NY/2/1002")
        expect(response.text).toBe("1.725")
    })


})
