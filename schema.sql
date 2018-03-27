DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price DECIMAL(4,2),
  stock_quantity INT,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;
