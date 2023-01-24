const app = require("./index");
require("./db").connectToMongoDB(); // Connect to MongoDB
require("dotenv").config();
const logger = require("./logger/logger");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
