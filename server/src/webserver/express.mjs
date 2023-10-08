import express from "express";

const expresConfig = (app) => {
  app.use(express.json());
};

export default expresConfig;
