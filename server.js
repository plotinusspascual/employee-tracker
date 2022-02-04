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

// Start of the prompt to ask Users what functions they would like to do
function prompt(){
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: 
      [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee"          
      ]
    }
// Depending on the user choice, each selection has it's own function that will run    
  ]).then(function(val){
    switch(val.choice){        
      case "View All Departments":
        viewDepartments();
        break;
      case "View All Roles":
        viewRoles();
        break; 
      case "View All Employees":
        viewEmployees();
        break;
      case "Add Department":
        addDepartment();
        break;
      case "Add Role":
        addRole();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Update Employee":
        updateEmployee();
        break;
    }
  })
}

// Prints out All Employees
function viewEmployees(){
  db.query(`SELECT employee.id, employee.first_name, employee.last_name, title, salary, department_name, manager.last_name AS manager
      FROM employee
      LEFT JOIN employee_role ON role_id = employee_role.id
      LEFT JOIN department ON department_id = department.id
      LEFT JOIN employee AS manager ON employee.manager_id = manager.id`, function(err,res){
    if(err)
      throw err
      console.table(res);
      prompt();
  })
}

// Prints out All Roles
function viewRoles(){
  db.query(`SELECT id, title FROM employee_role`, function(err,res){
    if(err)
      throw err
      console.table(res);
      prompt();
  })
}

// Prints out All Departments
function viewDepartments(){
  db.query(`SELECT id, department_name FROM department`, function(err,res){
    if(err)
      throw err
      console.table(res);
      prompt();
  })
}

// Function to add a department with user input
function addDepartment(){
  inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "What Department would you like to add?"
    }
  ]).then(function(val){
    db.query(`INSERT INTO department (department_name) VALUES (?)`, 
    [val.name],
    function(err,res){
      if(err){
        throw err
      }
      console.log("Successfully added to Departments. View All Departments to see...");
      // console.table(res);
      prompt();
    })
  })
}

// Creates and adds a role 
function addRole(){
  inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "What Role would you like to add?"
    },
    {
      name: "salary",
      type: "input",
      message: "What is the Salary?"
    },
    {
      name: "department",
      type: "list",
      message: "Which department would you like to add this Role into?",
      choices: selectDepartment()
    }
  ]).then(function(val){
    var departmentID = selectDepartment().indexOf(val.department)+1;
    db.query(`INSERT INTO employee_role SET?`,
      {
        title: val.title,
        salary: val.salary,
        department_id: departmentID
      },
      function(err,res){
        if(err){
          throw err
        }
        console.log("Successfully added to Roles. View All Roles to see...");
        console.table(res);
        prompt();
      }
    )
  })
}

// Creates and Add Employee
function addEmployee(){
  inquirer.prompt([
    {
      name: "first_name",
      type: "input",
      message: "What is the First Name?"
    },
    {
      name: "last_name",
      type: "input",
      message: "What is the Last Name?"
    },
    {
      name: "role",
      type: "list",
      message: "What is their Role?",
      choices: selectRole()
    },
    {
      name: "manager",
      type: "list",
      message: "Who is their Manager?",
      choices: selectManager()
    }
  ]).then(function(val){
    // Index default start at 0, but ID's start at 1
    var roleID = selectRole().indexOf(val.role)+1;
    var managerID = selectManager().indexOf(val.manager)+1;
    db.query(`INSERT INTO employee SET?`,
      {
        first_name: val.first_name,
        last_name: val.last_name,
        role_id: roleID,
        manager_id: managerID
      },
      function(err,res){
        if(err){
          throw err
        }
        console.table(val);
        prompt();
      }
    )
  })
}
function updateEmployee(){
  // db.query(`SELECT employee.last_name, role.title FROM employee JOIN employee_role ON employee.role_id = role.id`,
  //   function(err,res){
  //     if(err)
  //       throw err
  //     inquirer.prompt
  //   }
  // )
}

var departmentArray = [];
function selectDepartment(){
  db.query(`SELECT * FROM department`, function(err, res){
    if(err)
      throw err
    for(var i=0; i < res.length; i++){
      departmentArray.push(res[i].department_name);
    }
  })
  return departmentArray;
}

var roleArr = [];
function selectRole() {
  db.query("SELECT * FROM employee_role", function(err, res) {
    if (err) 
      throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  })
  return roleArr;
}

var managerArray = [];
function selectManager(){
  
  db.query(`SELECT first_name, last_name FROM employee WHERE manager_id is NOT NULL`, function(err,res){
    if(err)
      throw err
    for(var i=0; i < res.length; i++){
      managerArray.push(res[i].first_name);
    }
  })
  return managerArray;
}