const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  mongoURI: process.env.MONGOURI,
  port: process.env.PORT
};
