var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,  
    user: "root",
    password: "",
    database: "bamazon_db"
  });

//Enter password for Supervisor Access
inquirer.prompt([
   {
        type: "password",
        message: "Enter Password for Access:",
        name: "password"
    }
]).then(function(response) {
    if(response.password === "admin") {
        console.log("\nAccess Granted.\n");
        connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected to database. ID: " + connection.threadId + "\n");
            supervisorMenu();
        });//<-- end connection.connect
    } else {
        console.log("\nIncorrect Password. Access Denied.\n");
        connection.end();
    }
});//<-- end inquirer .then()

function supervisorMenu() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "menuChoice",
            choices: ["View Product Sales by Department", "Create New Department"]
        }
    ]).then(function(response) {
        switch (response.menuChoice) {
            case "View Product Sales by Department":
            salesByDepartment();
            break;
        
            case "Create New Department":
            createNewDepartment();
            break;
        }
    });//<-- end inquirer .then()
}//<-- end supervisorMenu()

function salesByDepartment() {

    connection.query("SELECT * FROM departments", function(err, queryResponse) {
        if (err) throw err;

        console.log("-----------------------------------------------");
        console.log("PRODUCT SALES BY DEPARTMENT:");
        console.log("-----------------------------------------------");

        var values = [];

        for (var i = 0; i < queryResponse.length; i++) {
            var eachValue = [
                queryResponse[i].department_id,
                queryResponse[i].department_name,
                queryResponse[i].over_head_costs
            ];
            values.push(eachValue);
        }//<-- end For loop
        
        console.table(['Department ID', 'Department Name', 'Overhead Costs'], values);
        console.log("-----------------------------------------------");
        anotherAction();

    });//<-- end departments connection.query

}//<-- end salesByDepartment()

function createNewDepartment() {
    connection.query("SELECT * FROM departments", function(err, queryResponse) {
        inquirer.prompt([
            {
                type: "input",
                message: "Enter Department Name:",
                name: "departmentName"
            },
            {
                type: "input",
                message: "Enter Overhead Costs:",
                name: "overheadCosts",
                validate:function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                } 
            }
        ]).then(function(response) {
                if (err) throw err;
                connection.query("INSERT INTO departments SET ?",
                {
                    department_name: response.departmentName,
                    over_head_costs: response.overheadCosts
                },
                function(err, queryResponse) {
                    if(err) throw err;
                    console.log("-----------------------------------------------");
                    console.log("New Department Successfully Added!");
                    console.log("-----------------------------------------------");
                    console.log("Department Name: " + response.departmentName + " \nOverhead Costs: " + response.overheadCosts);
                    console.log("-----------------------------------------------");
                    anotherAction();
                }
            );//<-- end INSERT connection.query 
        });//<-- end inquirer .then()
    });//<-- end SELECT connection.query
}//<-- end createNewDepartment()

function anotherAction() {
    inquirer.prompt([
        {
            type: "list",
            message: "Return to Menu or Exit?",
            name: "anotherAction",
            choices: ["Return to Menu", "Exit"]
        }
    ]).then(function(response) {
        switch (response.anotherAction) {
            case "Return to Menu":
            supervisorMenu();
            break;
        
            case "Exit":
            connection.end();
            break;
        }
    });//<-- end inquirer .then()
}//<-- end anotherAction()