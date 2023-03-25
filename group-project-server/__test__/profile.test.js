const request = require("supertest");
const express = require('express');
const app = require("../index");
// test for missing or incorrect parameters in the addProfile
describe("POST /addProfile", () => {
    it("should return an error message if name has numbers", async () => {
      const res = await request(app)
        .post("/profile/addProfile")
        .send({ fullName: "kim44 tran", address1: "123 Main St", address2: "345 Star St", city: "Houston", state: "TX", zip: "77083" });
      //sendinf correct form to test if it doesnt see it as an error
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual("Quote validation failed: fullname: Path `fullname` should have no numbers.");
    });
  
    it("should return an error message if city is blank", async () => {
      const res = await request(app)
        .post("/profile/addProfile")
        .send({ fullName: "kim44 tran", address1: "123 Main St", address2: "345 Star St", city: "", state: "TX", zip: "77083" });
      //purposely sending the wrong info to see if it catches the error
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual("City is blank, please fill out.");
    });
  });

 // test for the format of the quote history data in the history
 describe("GET /userProfile", () => {
    it("should return an array of quotes with the correct format", async () => {
      const res = await request(app).get("/profile/userProfile");
  
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThan(0);
      //checking if it has these properties
      res.body.forEach((quote) => {
        expect(quote).toHaveProperty("fullName");
        expect(quote).toHaveProperty("address1");
        expect(quote).toHaveProperty("address2");
        expect(quote).toHaveProperty("city");
        expect(quote).toHaveProperty("state");
        expect(quote).toHaveProperty("zipCode");
      });
    });
  });
