require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

module.exports = {
  development: {
    storage: process.env.DB_STORAGE || "src/config/database/development.sqlite",
  },
  staging: {
    storage: process.env.DB_STORAGE || "src/config/database/staging.sqlite",
  },
  production: {
    storage: process.env.DB_STORAGE || "src/config/database/production.sqlite",
  },
};