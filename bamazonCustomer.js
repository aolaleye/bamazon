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
    itemsForSale();
});  

function itemsForSale() {
    connection.query("SELECT * FROM products", function(err, response) {
        if (err) throw err;
        for (var i = 0; i < response.length; i++) {
            console.log("Item ID #: " + response[i].item_id + " \nItem Name: " + response[i].product_name + " \nDepartment: " + response[i].department_name + " \nPrice: $" + response[i].price + " \nNumber of Items Remaining: " + response[i].stock_quantity);
            console.log("-----------------------------------");
        }
    });
    placeOrder();
} //<-- end itemsForSale()

function placeOrder() {

    connection.query("SELECT * FROM products", function(err, queryResponse) {

        inquirer.prompt([
            {
                type: "input",
                message: "Enter the Item ID # of the item you would like to purchase:",
                name: "customerItemID",
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
                message: "How many units would you like to purchase?",
                name: "customerQuantity",
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
            console.log("Checking our stock...");
            console.log("---------------------------------------");

            for(i = 0; i < queryResponse.length; i++) {
                if (parseInt(response.customerItemID) === queryResponse[i].item_id) {
                    console.log("Item located");
                    var chosenItem = queryResponse[i];

                    if (parseInt(response.customerQuantity) < chosenItem.stock_quantity) {

                        console.log("Placing your order...");
                        console.log("---------------------------------------");

                        connection.query("UPDATE products SET ? WHERE ?",
                            [
                                {
                                stock_quantity: parseFloat(chosenItem.stock_quantity) - parseFloat(response.customerQuantity)
                                },
                                {
                                item_id: chosenItem.item_id
                                }
                            ],
                            function(err, res) {
                                if(err) throw err;
                            }
                        );

                        var customerPrice = parseFloat(chosenItem.price) * parseInt(response.customerQuantity);

                        console.log("Your order has been succesfully placed!");
                        console.log("Your total price is: $" + customerPrice);
                        console.log("---------------------------------------");
                        connection.end();

                    } else {
                        console.log("Sorry, there is insufficient stock to place your order.");
                        console.log("---------------------------------------");
                        connection.end();
                    }

                }//<--- end if statement

            }//<-- end queryResponse For Loop

        });//<-- end inquirer .then()

    });//<-- end connection.query

}//<-- end placeOrder()
