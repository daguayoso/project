const request = require("supertest");
const express = require('express');
const app = require("../index");
// test for missing or incorrect parameters in the addQuotes
describe("POST /addQuotes", () => {
    it("should return an error message if gallons is missing", async () => {
      const res = await request(app)
        .post("/quotes/addQuotes")
        .send({ deliveryDate: "2023-03-25", address: "123 Main St", price: 2.88, totalAmountDue: 8.64 });
      //sendinf correct fomr to test if it doesnt see it as an error
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual("Quote validation failed: gallons: Path `gallons` is required.");
    });
  
    it("should return an error message if totalAmountDue is incorrect", async () => {
      const res = await request(app)
        .post("/quotes/addQuotes")
        .send({ gallons: 3, deliveryDate: "2023-03-25", address: "123 Main St", price: 2.88, totalAmountDue: 8.63 });
      //purposely sending the wrong info to see if it catches the error
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual("Incorrect data detected");
    });
  });
  
  // test for the format of the quote history data in the history
  describe("GET /quoteHistory", () => {
    it("should return an array of quotes with the correct format", async () => {
      const res = await request(app).get("/quotes/quoteHistory");
  
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThan(0);
      //checking if it has these properties
      res.body.forEach((quote) => {
        expect(quote).toHaveProperty("address");
        expect(quote).toHaveProperty("gallons");
        expect(quote).toHaveProperty("deliveryDate");
        expect(quote).toHaveProperty("price");
        expect(quote).toHaveProperty("totalAmountDue");
      });
    });
  });