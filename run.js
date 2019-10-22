//console.log("Running program");

// * Adding in inquirer
const inquirer = require("inquirer");

// * Adding files
    // * Adding in a random generator file (not necessary)
    //const generator = require("./assets/scripts/randomGeneration");
    const path = "./assets/scripts/bamazon";

    // * Adding in the bamazon files
    const customer = require( path + "Customer");
    const manager = require(path + "Manager");

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
                "manager",
                "supervisor (not implemented)"
            ],
            name: "user"
        }
    ]).then(answer => {
        //console.log("answering")
        console.log("\n" + eDiv + "\n");
        switch(answer.user) {
            case "manager": 
                manager();
                break;

            // case "supervisor":
            //     supervisor();
            //     break;

            default:
                customer();
                break;
        }
    })
}