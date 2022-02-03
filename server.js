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

function prompt(){
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: 
      [
        "View All Employees?",
        "View All Employee's By Roles?",
        "View All Employee's By Departments",
        "Update Employee",
        "Add Employee?",
        "Add Role?",
        "Add Department?"   
      ]
    }
  ]).then(function(val){
    switch(val.choice){
      case "View All Employees":
        viewEmployees();
    }
  })
}

function viewEmployees(){}
function viewRoles(){}
function viewDepartments(){}
function updateEmployee(){}
function addEmployee(){}
function addRole(){}
function addDepartment(){}