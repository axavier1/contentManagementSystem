//Consts
const inquirer = require("inquirer");
const mysql = require("mysql2");

//Establishing connections to MySQL database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "employees_db"
});

connection.connect(err => {
    if (err) throw err;
    console.log('connection established!');
    startup();
});

//Main startup fucntion
function startup() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Roles",
            "View All Departments",
            "Add an Employee",
            "Add a Role",
            "Add a Department",
            "Update Employee Role",
            "Exit"
        ]
    })
    //Responses to different selections
    .then (answer => {
        if (answer.action === "View All Employees"){
            viewEmployees();
        }
        if (answer.action === "View All Roles"){
            viewRoles();
        }
        if (answer.action === "View All Departments"){
            viewDepartments();
        }
        if (answer.action === "Add an Employee"){
            addEmployees();
        }
        if (answer.action === "Add a Role"){
            addRoles();
        }
        if (answer.action === "Add a Department"){
            addDepartments();
        }
        
        if (answer.action === "Exit"){
            connection.end();
        }
    })
};

//Functions to view Employees, Roles and Departments
function viewEmployees(){
    connection.query ("SELECT * FROM employee", (err, res) => {
        if (err) throw err
        console.table(res)
        startup();
    })
};

function viewRoles(){
    connection.query ("SELECT * FROM role", (err, res) => {
        if (err) throw err
        console.table(res)
        startup();
    })
};

function viewDepartments(){
    connection.query ("SELECT * FROM department", (err, res) => {
        if (err) throw err
        console.table(res)
        startup();
    })
};

//Functions to add Employees, Roles and Departments
function addEmployees(){
    inquirer.prompt ([
        {
            message:"Input employee's first name",
            name:"first_name"
        },
        {
            message:"Input employee's last name",
            name:"last_name"
        },
        {
            message:"Input employee's Role ID",
            name:"role_id"
        },
        {
            message:"Input employee's Manager ID if they have one",
            name:"manager_id", 
            default: "null"
        },
    ])
    .then(answers => {

    connection.query (`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${answers.first_name}","${answers.last_name}",${answers.role_id},${answers.manager_id})`, (err, res) => {
        if (err) throw err
        console.table(res)
        startup();
    })
    })
};

function addRoles(){
    inquirer.prompt ([
        {
            message: "Enter role title",
            name: "title"
        },
        {
            message: "Enter salary",
            name: "salary"
        },
        {
            message: "Enter department number",
            name: "department_id"
        },
    ])
    .then (answers => {
    
    connection.query(`INSERT INTO role(title, salary, department_id) VALUES ("${answers.title}",${answers.salary}, ${answers.department_id})`, (err, res) => {
        if (err) throw err
        console.table(res)
        startup();
    })
    })
};

function addDepartments(){
    inquirer.prompt ([
        {
            message: "Enter department name: ",
            name: "department"
        }
    ])
    .then (answer => {
    connection.query(`INSERT INTO department(name) VALUES ("${answer.department}")`, (err,res) => {
        if (err) throw err
        console.table(res)
        startup();
    })
    })
};