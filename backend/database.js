const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;

async function connect() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to the database succesfully!");
  } catch (error) {
    console.error(error);
  }
}

module.exports = connect;
