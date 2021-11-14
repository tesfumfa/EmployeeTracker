
//requiring dependencies
'use strict';

const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "test@2663",
    database: "employee_db"
});
connection.connect(function (err) {
    if (err) throw err;
    mainMenu();
   
    
});
// need to be able to add Departments, Roles and Employees
//View Departments, Roles and Employees
//Update Employee Roles
//BONUS 
//Update Employee Managers
//view Employee Managers
//Delete Departments, Roles, and Employees
// add console.table



function mainMenu() {
    inquirer
        .prompt({
            type: "rawlist",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View Departments",
                "View Employees",
                "View Roles",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employees Role",
            
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Departments":
                    viewDepartment();
                    break;
                case "View Employees":
                    viewEmployee();
                    break;
                case "View Roles":
                    viewRole();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmployee();
                case "Update Employees Role":
                    updateEmployee();
                    break;
                case "Delete Department":
                    deleteDepartment();
                    break;
                case "Delete Role":
                    deleteRole();
                    break;
                case "Delete Employee":
                    deleteEmployee();
                    break;
                case "Exit":
                    connection.end()

            }
        })
        
}


function viewEmployee() {

    const query = "SELECT * FROM employee"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res)
        mainMenu()
    })
}

function viewRole() {

    const query = "SELECT * FROM employeerole"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res)
        mainMenu()
    })
}

function viewDepartment() {

    const query = "SELECT * FROM department"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res)
        mainMenu()
    })
}


function addRole() {
    var query = "SELECT * FROM department";
    var department = [];
    connection.query(query, function (err,res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            department.push({name:res[i].name, value:res[i].id})
        }
        // department.push(res);

    })
    inquirer
    .prompt([
        {
        type: "input",
        name: "title",
        message: "What Role Would you like to add?",
        },
        {
            type:"input",
            name: "salary",
            message: " What is the salary?",
        },
        {
            type: "list",
            name: "department",
            message: "What department ID does this belong to?",
            choices: department
        },
       
    ]).then(function(answer) {
        var query = "INSERT INTO employeerole SET ?";
        connection.query(query, {employeerole:answer["title"], department_id:answer["department"], salary:answer["salary"]}, function(err, res){
            if (err) throw err;
            console.log("title has been added");
            mainMenu();
        })
    }) 

}

function addDepartment () {
    inquirer
    .prompt({
        type: "input",
        name: "departments",
        message: "What department would you like to add?",
    }).then(function(answer) {
        var query = "INSERT INTO department SET ?";
        connection.query(query, {name:answer["departments"]}, function (err, res){
            if (err) throw err;
            console.log("Succesfully added");
            mainMenu();
        })
    })
}

function addEmployee () {
    var query = "SELECT * FROM employee";
    var query = "SELECT * FROM department";
   var department = [];
   connection.query(query, function (err, res){
       if (err) throw err;
       for(var i = 0; i < res.length; i++){
           department.push({name:res[i].first_name, name:res[i].last_name, value: res[i].id, name:res[i].name});
       }
       var query = "SELECT * FROM employeerole";
       var roles = [];
       connection.query(query, function (err,res) {
           if (err) throw err;
           for (var i = 0; i < res.length; i++) {
               roles.push({name:res[i].employeerole, value:res[i].id})
           }
           inquirer.prompt([
               {
               type: "input",
               name: "first name",
               message: "What is the first name?",
           },
           {
            type: "input",
            name: "last name",
            message: "What is the last name?",
           },
           {
               type: "list",
               name: "role",
               message: " What is the role of the employee?",
               choices: roles
           },
           {
               type: "list",
               name: "employee id",
               message: "What is the id for this employee?",
               choices: department
           }
        ]).then(function(one){
                var query = "INSERT INTO employee SET ?";
                connection.query(query, {first_name: one["first name"], last_name: one["last name"], role_id: one["role"], manager_id: one["employee id"]}, function(err, res) {
                    if (err) throw err;
                    console.log("employee added");
                    mainMenu();
                })
        })
        
   })

});
}

function updateEmployee() {
    var query = "SELECT e.first_name, e.last_name, r.employeerole, e.manager_id, e.id FROM employee_db.employee as e LEFT JOIN employeerole as r on e.role_id = r.id";
    var employees = [];
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            employees.push({name: res[i].first_name + " " + res[i].last_name, value: res[i].id })
        }
        var query = "SELECT * FROM employeerole";
       var roles = [];
       connection.query(query, function (err,res) {
           if (err) throw err;
           for (var i = 0; i < res.length; i++) {
               roles.push({name:res[i].employeerole, value:res[i].id})
           }
          
        });
    
        inquirer.prompt([
            {
                type: "list",
                name: "which employee",
                message: "Which employee would you like to update?",
                choices: employees
            },
            {
                type: "list",
                name: "update role",
                message: "What role would you like to change this employee to?",
                choices: roles
            }
        ]).then(function(res){
            var query = "UPDATE employee SET role_id = ? Where id = ?";
            connection.query(query,[res["update role"],res["which employee"]], function(err, res) {
                if (err) throw err;
                console.log("employee roll changed");
                mainMenu();
            })
        })
        
    })

}
