const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// middlwares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// connect to DB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
