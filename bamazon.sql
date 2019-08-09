DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price decimal(10,2) default 0,
  stock_quanity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Wireless Headphones", "Electronics", 149.99, 100), 
("Digital Kitchen Scale", "Home and Kitchen", 29.99, 36), 
("Hockey Stick", "Sporting Goods", 279.99, 10),
("Book", "Books", 14.99, 74),
("Dog Kennel", "Pet Supplies", 89.99, 21),
("Xbox Controller", "Electronics", 149.99, 100),
("Video Game", "Electronics", 59.99, 300),
("Reading Lamp", "Books", 49.99, 65),
("Cooking Set", "Home and Kitchen", 99.50, 16),
("Goalie Pads", "Sporting Goods", 799.99, 5);



select * from products;