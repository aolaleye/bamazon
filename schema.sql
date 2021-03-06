DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price DECIMAL(10,2),
  stock_quantity INT,
  product_sales DECIMAL(10,2) DEFAULT 0,
  PRIMARY KEY (item_id)
);

CREATE TABLE departments (
  department_id INT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(100),
  over_head_costs DECIMAL(18,2),
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs) values ('apparel', '150.00');
INSERT INTO departments (department_name, over_head_costs) values ('jewelry', '45.00');
INSERT INTO departments (department_name, over_head_costs) values ('electronics', '1125.00');
INSERT INTO departments (department_name, over_head_costs) values ('accessories', '75.00');

DROP TABLE IF EXISTS view_departments;
CREATE TABLE view_departments
AS
SELECT department_id, departments.department_name, over_head_costs,
SUM(product_sales) AS total_sales
FROM products
INNER JOIN departments ON products.department_name = departments.department_name
GROUP BY department_id;
SELECT * FROM view_departments;

SELECT * FROM products;
SELECT * FROM departments;



