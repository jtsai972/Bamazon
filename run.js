// * Adding in dotenv/server requirements
require("dotenv").config();
const server = require("./assets/scripts/server");

const mySQL = require("mysql");

//* Adding in the bamazonCustomer file
const customer = require("./assets/scripts/bamazonCustomer");


const connection = mySQL.createConnection(server);


function test() {
    var genQuantity = (max, min) => { 
        return rnd = Math.floor(Math.random() * (max-min) + min) 
    };

    let i = 0;
    while(i < 10) {
        console.log(genQuantity(99, 0));
        i++;
    }
}


