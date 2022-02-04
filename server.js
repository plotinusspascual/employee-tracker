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

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`),
  prompt()
);


function prompt(){
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: 
      [
        "View All Employees",
        "View All Roles",
        "View All Departments",
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
        break;

      case"View All Roles":
        viewRoles();
        break;  
    }
  })
}

function viewEmployees(){
  db.query(`SELECT id, first_name, last_name FROM employee`, function(err,res){
    if(err)
      throw err
      console.table(res);
      prompt();
  })
}
function viewRoles(){
  db.query(`SELECT id, title FROM employee_role`, function(err,res){
    if(err)
      throw err
      console.table(res);
      prompt();
  })
}
function viewDepartments(){}
function updateEmployee(){}
function addEmployee(){}
function addRole(){}
function addDepartment(){}