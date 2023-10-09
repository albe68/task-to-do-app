import request from "supertest";
import express from "express";
// const app = express();
import app from "../src/app";
describe("tasks api", () => {
  it("should fetch all tasks", async () => {
    const response = await request(app).get("/api/test");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
  });
});
