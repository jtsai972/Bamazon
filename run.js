//console.log("Running program");

// * Adding in inquirer
const inquirer = require("inquirer");

// * Adding files
    // * Adding in a random generator file (not necessary)
    //const generator = require("./assets/scripts/randomGeneration");
    // * Adding in server access 
    //const server = require("./assets/scripts/serverAccess");

    // * Adding in the bamazonCustomer file
    const customer = require("./assets/scripts/bamazonCustomer");

//* Formatting 
const dDiv = "------------------------------------------------------",
    eDiv = "======================================================";

const welcome = `\n${eDiv}\n\nWelcome to Bamazon!\n${dDiv}`;

//* Starting 
start();

// * Functions
function start() {
    console.log(welcome)
    inquirer.prompt([
        {
            type: "list",
            message: "What functionality do you want to access? (Unimplemented items will redirect you to customer)",
            choices: [
                "customer",
                "manager (not implemented)",
                "supervisor (not implemented)"
            ],
            name: "user"
        }
    ]).then(answer => {
        //console.log("answering")
        console.log("\n" + eDiv + "\n");
        switch(answer.user) {
            default:
                customer();
                break;
        }

        //closingConnection();
    })
}