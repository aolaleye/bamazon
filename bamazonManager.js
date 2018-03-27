var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,  
    user: "root",
    password: "",
    database: "bamazon_db"
  });

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    managerMenu();
});//<-- end connection.connect

function managerMenu() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "menuChoice",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function(response) {
        switch (response.menuChoice) {
            case "View Products for Sale":
            viewProductsForSale();
            break;
        
            case "View Low Inventory":
            viewLowInventory();
            break;
        
            case "Add to Inventory":
            addToInventory();
            break;
        
            case "Add New Products":
            addNewProduct();
            break;
        }
    });//<-- end inquirer .then()
}//<-- end managerMenu()

function viewProductsForSale() {
    connection.query("SELECT * FROM products", function(err, queryResponse) {
        if (err) throw err;
        for (var i = 0; i < queryResponse.length; i++) {
            console.log("Item ID #: " + queryResponse[i].item_id + " \nItem Name: " + queryResponse[i].product_name + " \nDepartment: " + queryResponse[i].department_name + " \nPrice: $" + queryResponse[i].price + " \nNumber of Items Remaining: " + queryResponse[i].stock_quantity);
            console.log("-----------------------------------");
        }
    });//<-- end connection.query
}//<-- end viewProductsForSale()

function viewLowInventory() {

}//<-- end viewLowInventory()

function addToInventory() {

}//<-- end addToInventory()

function addNewProduct() {

}//<-- end addNewProduct()