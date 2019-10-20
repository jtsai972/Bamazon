-- Creating a database
DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

-- Using Database
USE bamazon_db;

-- TABLE CREATION 
CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NULL,
    PRIMARY KEY (id)
);

-- Just for viewing purposes
SELECT * FROM products; 