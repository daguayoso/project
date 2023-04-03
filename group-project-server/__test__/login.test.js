const request = require('supertest');

const app = require('../routes/login');

describe("POST", ()=>{
  test("Adds a user with username and password", async()=>{
    const response = await (await request(app).post("/register")).send({
      username: "username",
      password: "password"
    })
    expect(response.statusCode(200))
  })
})


describe("GET", ()=>{
  test("Returns a user with statusCode of 200 if username found in database", async()=>{
    const response = await request(app).get("/signin/joseph2003/jennifer2006")
    expect(response.statusCode(200))
  })
})
