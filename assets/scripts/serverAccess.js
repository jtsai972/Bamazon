// * Adding in dotenv/server requirements
require("dotenv").config();
const mySQL = require("mysql");
const server = require("./serverAuth");
let connection;


let openDB = function() {
    if (!connection) {
        connection = mySQL.createConnection(server.database);

        connection.connect(function(err){
            if(!err) {
                console.log('Database is connected!');
            } else {
                console.log('Error connecting database!');
            }
        });
        return connection;
    }
}

let closeDB = function() {
    console.log("\nEnding connection");
    connection.end();
}

let test = function() {
    console.log("test");
}

exports.openDB = openDB;
exports.closeDB = closeDB;
exports.test = test;