const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");
const express = require("express");
const sequelize = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
