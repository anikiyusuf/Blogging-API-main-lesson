const mongoose = require("mongoose");
require("dotenv").config();
const logger = require("./logger/logger");

const MONGODB_URL = process.env.MONGODB_URL;

// connect to mongodb
function connectToMongoDB() {
  mongoose.connect(MONGODB_URL);
  mongoose.connection.on("connected", () => {
    logger.info("Connected to MongoDB successfully");
  });
  mongoose.connection.on("error", (err) => {
    logger.error("Error connecting to MongoDB", err);
  });
}

module.exports = { connectToMongoDB };
