const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  urlDb: process.env.URL_MONGODB_DEV,
  jwtExpiration: "24h",
  jwtSecret: process.env.SECRET_KODE,
  gmail: process.env.EMAIL,
  password: process.env.PASSWORD,
};
