import express from "express";
import cors from "cors";
const expresConfig = (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
};

export default expresConfig;
