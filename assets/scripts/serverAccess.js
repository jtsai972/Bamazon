// * Adding in dotenv/server requirements
require("dotenv").config();
const mySQL = require("mysql");
const server = require("./assets/scripts/serverAuth");
const connection = mySQL.createConnection(server);