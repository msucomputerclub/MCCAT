const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "./", ".config") });

module.exports = {
  mongoURI: process.env.MONGOURI,
  port: process.env.PORT,
  secretOrKey: process.env.secretOrKey
};
