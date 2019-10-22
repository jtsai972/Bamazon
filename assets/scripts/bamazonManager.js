// console.log("Entering manager perspective");

/**-----------------------------------------------
 * * Setting up Globals
 * ----------------------------------------------- */

// * setting up requirements
const inquirer = require("inquirer");
const server = require("./serverAccess");

// * Number of products
let totalProducts = countProducts();

// * Formatting
const dDiv = "------------------------------------------------------",
    eDiv = "======================================================";

/**-----------------------------------------------
 * * Exporting this
 * ----------------------------------------------- */

let manager = () => {
    //console.log("Hi, I'm a manager!");
    start();
}
module.exports = manager;

/**-----------------------------------------------
 * * Counting Products 
 * ----------------------------------------------- */
function countProducts() {
    server.openDB().query(
        "SELECT * FROM products", 
        function(err, res) {
            if (err) throw err;
            server.closeDB();
            return res.length - 1;
        }
    );
}


/**-----------------------------------------------
 * * Starting
 * ----------------------------------------------- */

function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do today?",
            choices: [
                "A) View Products for Sale",
                "B) View Low Inventory",
                "C) Add to Inventory",
                "D) Add New Product"
            ],
            name: "choice"
        }
    ]).then(answer => {
        let selection = answer.choice[0];
        
        switch(selection) {
            case 'B':
                viewLowInv();
                break;

            case 'C':
                addInv();
                break;

            case 'D':
                addProducts();
                break;
        
            default:
                viewProducts();
                break;
        }
    })
}

/**-----------------------------------------------
 * * View Products 
 * ----------------------------------------------- */
function viewProducts() {
    var query = server.openDB().query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        for(let i = 0; i < res.length; i++) {
            res[i].price = res[i].price.toFixed(2);
        }

        console.table(res);
        exit();
    });
    //console.log(query.sql);
    query
}

/**-----------------------------------------------
 * * View Low Inventory Hero
 * ----------------------------------------------- */
function viewLowInv() {
    var query = server.openDB().query(
        "SELECT * FROM products WHERE ?",
        {quantity: " < 5"},
        function(err, res) {
            if (err) throw err;

            for(let i = 0; i < res.length; i++) {
                res[i].price = res[i].price.toFixed(2);
            }

            console.table(res);
            exit();
        }
    );
    //console.log(query.sql);
    query
}

/**-----------------------------------------------
 * * Add to Inventory
 * ----------------------------------------------- */
function addInv() {

    inquirer.prompt([
        {
            type: "number",
            message:"What is the id (not index) of the product you want to add to?",
            name: "id",
            validate: numVal
        },
        {
            type: "number",
            message: "How many do you wish to add?",
            name: "quantity",
            validate: isNum
        }
    ]).then(answer => {

        console.log("Reached answer");
        var query = server.openDB().query(
            "UPDATE products SET ? WHERE ?",
            [{quantity: answer.quantity},{id: answer.id}],
            function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " products updated!\n");
    
                console.log(`Added ${answer.quantity} to the product with the id of ${answer.id}`);
            }
        )
        //console.log(query.sql);
        query
        exit();
    })
}
/**-----------------------------------------------
 * * Validation Stuff down here
 * ----------------------------------------------- */
function check(chk, answer) {
    //console.log("Answer: " + answer);
    let reg = /^\d+$/;
    let checkNum = reg.test(answer);
    let msg = "Sorry, that is not a valid product id!";

    return !checkNum || chk ? msg : true;
}
function numVal(answer) {
    let chk = answer < 0 || answer > totalProducts;
    return check(chk, answer);
}

function isNum(answer) {
    let chk = answer < 0;
    return check(chk, answer);
}

/**-----------------------------------------------
 * * Add New Product
 * ----------------------------------------------- */
function addProducts() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of this product?",
            name: "name"
        },
        {
            type: "input",
            message: "What department does this product belong to?",
            name: "department"
        },
        {
            type: "input",
            message: "What is the price of this product?",
            name: "price"
        },
        {
            type: "input",
            message: "How much of this product are we adding into the inventory?",
            name: "quantity"
        }
    ]).then( answer => {
        let newProduct = {
            name: answer.name,
            department: answer.department,
            price: parseFloat(answer.price),
            quantity: parseInt(answer.quantity)
        };
        //console.log(newProduct)

        var query = server.openDB().query(
            "INSERT INTO products SET ?",
            newProduct,
            function(err, res) {
                if (err) throw err;
    
                console.log(res.affectedRows + " new product added!\n");

                exit();
            }
        );
        //console.log(query.sql);
        query
    })
}


/**-----------------------------------------------
 * * Exit
 * ----------------------------------------------- */
function exit() {
    console.log("\n" + eDiv + "\n");
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to do something else with Bamazon",
            choices: ["yes", "no"],
            name: "exit"
        }
    ]).then(answer => {
        if(answer.exit === "yes") {
            server.closeDB();
            start();
        } else {
            console.log("\nThank you for managing Bamazon!");
            console.log("Have a nice day!\n");
            server.closeDB();
        }
        
    })

    
}