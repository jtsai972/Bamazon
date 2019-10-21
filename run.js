console.log("Running program");

// * Adding in inquirer
const inquirer = require("inquirer");

// * Adding files
    // * Adding in a random generator file (not necessary)
    //const generator = require("./assets/scripts/randomGeneration");
    // * Adding in server access 
    //const server = require("./assets/scripts/serverAccess");

    // * Adding in the bamazonCustomer file
    const customer = require("./assets/scripts/bamazonCustomer");

//* Starting 
start();

// * Functions
function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "Hello, what functionality do you want to access? (Unimplemented stuff will redirect you to customer",
            choices: [
                "customer",
                "manager (not implemented)",
                "supervisor (not implemented)"
            ],
            name: "user"
        }
    ]).then(answer => {
        console.log("answering")
        switch(answer.user) {
            default:
                customer();
                break;
        }

        //closingConnection();
    })
}