const request = require("supertest");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Backend is working");
});

describe("GET /", () => {
  it("should return status 200", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Backend is working");
  });
});