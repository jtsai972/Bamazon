console.log("Entering customer perspective");

// * setting up requirements
const inquirer = require("inquirer");
const server = require("./serverAccess");



let customer = function(){
    console.log("Hi, I'm a customer!");
    start();
}

module.exports = customer;


//start();
function start() {
    server.openDB().query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);

        inquirer.prompt([
            {
                type: "number",
                message:"What is the ID of the product you want to buy?",
                name: "id"
            },
            {
                type: "number",
                message: "How many do you wish to purchase?",
                name: "quantity"
            }
        ]).then(answer => {
            

            server.closeDB();
        })
        
    });
}

// customer();