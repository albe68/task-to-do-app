import express from "express";
import http from "http";
import serverConfig from "./webserver/server.js";
import connectToDb from "./database/connection.js";
import { routes } from "./webserver/routes/index.js";
import expresConfig from "./webserver/express.mjs";
const app = express();
const server = http.createServer(app);

connectToDb();
expresConfig(app);
routes(app);
serverConfig(server);
app.use((err, req, res, next) => {
  console.log("error occured");
  res.status(500).json({
    messaage: "Something went wrong",
  });
});
