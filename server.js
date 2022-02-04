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
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee"          
      ]
    }
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

function viewDepartments(){
  db.query(`SELECT id, department_name FROM department`, function(err,res){
    if(err)
      throw err
      console.table(res);
      prompt();
  })
}

function addDepartment(){
  inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "What Department would you like to add?"
    }
  ]).then(function(res){
    db.query(`INSERT INTO department (department_name) VALUES (?)`, 
    [res.name],
    function(err,res){
      if(err){
        throw err
      }
      console.log("Successfully added to Departments. View All Departments to see...");
      console.table(res);
      prompt();
    })
  })
}

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
  ]).then(function(res){
    db.query(`INSERT INTO employee_role SET?`,
      {
        title: res.title,
        salary: res.salary,
        department_id: res.department
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

var roleArr = [];
function selectRole() {
  db.query("SELECT * FROM employee_role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }

  })
  return roleArr;
}

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
function updateEmployee(){}

var departmentArray = [];
function selectDepartment(){
  db.query(`SELECT * FROM department`, function(err, res){
    if(err)
      throw err

    for(var i=0; i < res.length; i++){
      roleArray.push(res[i].department_name);
    }
  })
  console.log(departmentArray);
  return departmentArray;
}


// function selectRole(){
//   roleArray = [];
//   db.query(`SELECT id, title FROM employee_role`, function(err, res){
//     if(err)
//       throw err
//     for(var i=0; i < res.length; i++){
//       roleArray.push(res[i].id + res[i].title);
//     }
//   })
//   return roleArray;
// }
// var test = selectRole();
// console.log(test);

var managerArray = [];
function selectManager(){
  
  db.query(`SELECT first_name, last_name FROM employee WHERE manager_id is NOT NULL`, function(err,res){
    if(err)
      throw err
    for(var i=0; i < res.length; i++){
      managerArray.push(res[i].first_name);
    }
  })
  console.log(managerArray);
  return managerArray;
}