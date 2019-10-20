// * Adding in dotenv/server requirements
require("dotenv").config();
const server = require("./assets/scripts/server");

const mySQL = require("mysql");

//* Adding in the bamazonCustomer file
const customer = require("./assets/scripts/bamazonCustomer");


const connection = mySQL.createConnection(server);

console.log(connection);