console.log("Running program");

// * Adding in dotenv/server requirements
require("dotenv").config();
const mySQL = require("mysql");
const server = require("./assets/scripts/server");
const connection = mySQL.createConnection(server);

// * Adding in a random generator file (not necessary)
//const generator = require("./assets/scripts/randomGeneration");

// * Adding in the bamazonCustomer file
const customer = require("./assets/scripts/bamazonCustomer");



