require("dotenv").config();
const express = require("express");
const connect = require("./database");
const port = process.env.PORT;
const app = express();
connect();

app.use(express.urlencoded());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.listen(port, () => {
  console.log(`API is listening on port ${port}!`);
});
