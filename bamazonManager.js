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
    console.log("Connected to database. ID: " + connection.threadId + "\n");
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
        
            case "Add New Product":
            addNewProduct();
            break;
        }
    });//<-- end inquirer .then()
}//<-- end managerMenu()

function viewProductsForSale() {
    connection.query("SELECT * FROM products", function(err, queryResponse) {
        if (err) throw err;
        for (var i = 0; i < queryResponse.length; i++) {
            console.log("-----------------------------------");
            console.log("Item ID #: " + queryResponse[i].item_id + " \nItem Name: " + queryResponse[i].product_name + " \nDepartment: " + queryResponse[i].department_name + " \nPrice: $" + queryResponse[i].price + " \nNumber of Units Remaining: " + queryResponse[i].stock_quantity);
        }
        console.log("-----------------------------------");
        anotherAction();
    });//<-- end connection.query
}//<-- end viewProductsForSale()

function viewLowInventory() {
    connection.query("SELECT * FROM products", function(err, queryResponse) {
        if (err) throw err;
        console.log("-----------------------------------");
        console.log("LOW INVENTORY ITEMS: ");
        for (var i = 0; i < queryResponse.length; i++) {
            if(queryResponse[i].stock_quantity < 15) {
            console.log("-----------------------------------");
            console.log("Item Name: " + queryResponse[i].product_name + "\nNumber of Units Remaining: " + queryResponse[i].stock_quantity);
            }
        }
        console.log("-----------------------------------");
        anotherAction();
    });//<-- end connection.query
}//<-- end viewLowInventory()

function addToInventory() {
    connection.query("SELECT * FROM products", function(err, queryResponse) {
        inquirer.prompt([
            {
                type: "input",
                message: "Enter the Item ID # of the item you would like add inventory to: ",
                name: "itemID",
                validate:function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                } 
            }
        ]).then(function(response) {
            for(i = 0; i < queryResponse.length; i++) {
                if (parseInt(response.itemID) === queryResponse[i].item_id) {
                    var chosenItem = queryResponse[i];
                    console.log("---------------------------------------");
                    console.log("CHOSEN ITEM:");
                    console.log("---------------------------------------");
                    console.log("Item ID #: " + chosenItem.item_id + " \nItem Name: " + chosenItem.product_name + " \nNumber of Units Remaining: " + chosenItem.stock_quantity);
                    console.log("---------------------------------------");

                    inquirer.prompt([
                        {
                            type: "input",
                            message: "How many units would you like to add to this item: ",
                            name: "unitsAdded",
                            validate:function(value) {
                                if (isNaN(value) === false) {
                                    return true;
                                } else {
                                    return false;
                                }
                            } 
                        }
                    ]).then(function(response) {
                        console.log("---------------------------------------");
                        console.log("Adding " + response.unitsAdded + " units...");
                        var updatedUnits = chosenItem.stock_quantity + parseInt(response.unitsAdded);
                        connection.query("UPDATE products SET ? WHERE ?",
                            [
                                {
                                stock_quantity: chosenItem.stock_quantity + parseInt(response.unitsAdded)
                                },
                                {
                                item_id: chosenItem.item_id
                                }
                            ],
                            function(err, res) {
                                if(err) throw err;
                                console.log("---------------------------------------");
                                console.log("UPDATED ITEM:");
                                console.log("---------------------------------------");
                                console.log("Item ID #: " + chosenItem.item_id + " \nItem Name: " + chosenItem.product_name + " \nNumber of Units Remaining: " + updatedUnits);
                                console.log("---------------------------------------");
                                anotherAction();                      
                            }
                        );//<-- end UPDATE connection.query
                        
                    });//<-- end inquirer .then()

                } //<-- end if statement

            }//<-- end queryResponse For Loop

        });//<-- end inquirer .then()

    });//<-- end SELECT connection.query

}//<-- end addToInventory()

function addNewProduct() {
    connection.query("SELECT * FROM products", function(err, queryResponse) {
        inquirer.prompt([
            {
                type: "input",
                message: "Enter Product Name:",
                name: "itemName"
            },
            {
                type: "input",
                message: "Enter Department Name:",
                name: "itemDepartment"
            },
            {
                type: "input",
                message: "Enter Item Price:",
                name: "itemPrice",
                validate:function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                } 
            },
            {
                type: "input",
                message: "Enter Stock Quantity:",
                name: "itemQuantity",
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
                var itemID = queryResponse.length + 1;
                connection.query("INSERT INTO products SET ?",
                {
                    item_id: itemID,
                    product_name: response.itemName,
                    department_name: response.itemDepartment,
                    price: response.itemPrice,
                    stock_quantity: response.itemQuantity
                },
                function(err, queryResponse) {
                    if(err) throw err;
                    console.log("-----------------------------------");
                    console.log("New Product Successfully Added!");
                    console.log("-----------------------------------");
                    console.log("Item ID #: " + itemID + " \nItem Name: " + response.itemName + " \nDepartment: " + response.itemDepartment + " \nPrice: $" + response.itemPrice + " \nNumber of Units Remaining: " + response.itemQuantity);
                    console.log("-----------------------------------");
                    anotherAction();
                }
            );//<-- end INSERT connection.query 
        });//<-- end inquirer .then()
    });//<-- end SELECT connection.query
}//<-- end addNewProduct()

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
            managerMenu();
            break;
        
            case "Exit":
            connection.end();
            break;
        }
    });//<-- end inquirer .then()
}//<-- end anotherAction()