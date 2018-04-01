# Bamazon - MySQL/Node Application

### Overview
This application utilizes MySQL and Node to simulate an Amazon-like storefront. The app ranges from Customer level - where it takes in orders from customers and depletes stock from the store's inventory - to Supervisor level - where it tracks overhead costs across the store's departments and outputs a SQL Table in the terminal.

This application utlizes the following npm packages:
* __mysql__ _(to access the MySQL database)_
* __inquirer__ _(to retrieve information from the user)_
* __console.table__ _(to log SQL tables to the console)_

__Note:__ run `npm i` to install the packages included in the json package

#

### Customer View: 
__DEMO:__ https://drive.google.com/open?id=1CaZDXp7iKAV55VMswkORMb3RNdtrNmN3
* #### `node bamazonCustomer.js`

* During the purchasing process, the app accesses a MySQL Database called bamazon_db.

* The database contains the __products__ table which houses each product's:
    * item_id *(Unique id for each product)*
    * product_name *(The name of the product)*
    * department_name *(The name of product's department)*
    * price *(The product's cost to customer)*
    * stock_quantity *(How many units of each product is available in stores)*
    * product_sales *(Each product's total revenue from each sale)*

* Upon running the command, the app first displays all of the items available for sale including the ID # for each item.

* The app then prompts the customer with two messages:
    * The first asks the customer the ID # of the product the customer would like to buy.
    * The second message asks how many units of the product the customer would like to buy.

* Once the customer has placed the order, the app checks if the store has enough of the product to meet the customer's request.
    * If not, the app informs the customer that there is insufficient quantity and prevents the order from going through.
    * However, if the store does have enough of the product, the customer's order is fulfilled.

* The SQL database is immediately updated to reflect the remaining quantity of the product of the customer's purchase.

* Once the update goes through, the app shows the customer the total cost of their purchase.

![alt text](img/bamazon1.gif)

#

### Manager View: 
__DEMO:__ https://drive.google.com/open?id=1UaQE8JVaGZxqwgxR_c1-uD51EI2UGY8F
* #### `node bamazonManager.js`

* Upon running the command, the app prompts the manager to select among four options:
    * __View Products for Sale__
        * The app lists every available item including the item IDs, names, prices, and quantities.

    * __View Low Inventory__
        * The app lists all items with an inventory count lower than 15.

    * __Add to Inventory__
        * This choice allows the manager add inventory to any item currently in the store.

    * __Add New Product__
        * This choice allows the manager to add a completely new product to the store.    

__NOTE:__ Upon running the app in Manager View, the application asks for a password. For test purposes, the password is "admin".

![alt text](img/bamazon2.gif)

#

### Supervisor View: 
__DEMO:__ https://drive.google.com/open?id=1ysfd5yCbpF_ElcXhgnwVRzb7i8CmALss
* #### `node bamazonSupervisor.js`

* In Supervisor mode, the app accesses the __departments__ table within the MySQL Database.

* This table houses each product's:
    * department_id _(Unique id for each department)_
    * department_name _(The name of the department)_
    * over_head_costs _(All costs for the department)_

* The _products_ table in the database includes a product_sales column which is updated with each individual products total revenue from each sale.

* So whenever a customer purchases anything from the store, the price of the product is multiplied by the quantity purchased added added to the product's product_sales column, and the updates are immediately reflected in the SQL database.

* Upon running the command, the app prompts the supervisor to select between two options:
    * __View Product Sales By Department__
        * The app displays a summarized table of the SQL Database Data directly in the console.

    * __Create New Department__
        * This choice allows the supervisor to create a new department.   

__NOTE:__ Upon running the app in Supervisor View, the application asks for a password. For test purposes, the password is "admin".

![alt text](img/bamazon3.gif) 
