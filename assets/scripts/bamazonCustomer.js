// console.log("Entering customer perspective");

/**-----------------------------------------------
 * * Setting up Globals
 * ----------------------------------------------- */

// * setting up requirements
const inquirer = require("inquirer");
const server = require("./serverAccess");
const dDiv = "------------------------------------------------------",
    eDiv = "======================================================";

let first, last;

/**-----------------------------------------------
 * * Exporting this
 * ----------------------------------------------- */
let customer = function(){
    //console.log("Hi, I'm a customer!");
    start();
}
module.exports = customer;

/**-----------------------------------------------
 * * Starting Stuff down here
 * ----------------------------------------------- */

//start();
function start() {
    var query = server.openDB().query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        for(let i = 0; i < res.length; i++) {
            res[i].price = res[i].price.toFixed(2);
        }

        console.table(res);

        first = res[0].id;
        last = res[res.length-1].id;

        purchasePrompt(res);
        
    });
    //console.log(query.sql);
    query
}

/**-----------------------------------------------
 * * Purchasing Prompt Stuff down here
 * ----------------------------------------------- */

function purchasePrompt(res) {
    inquirer.prompt([
        {
            type: "number",
            message:"What is the id (not index) of the product you want to buy?",
            name: "id",
            validate: numVal
        },
        {
            type: "number",
            message: "How many do you wish to purchase?",
            name: "quantity",
            validate: isNum
        }
    ]).then(answer => {
        let id = answer.id,
            num = answer.quantity,
            item = res[id-1];

        console.log(" ");

        // * Item and current quantity
        //console.log(`Item: ${item.name} \nQuantity: ${item.quantity}\n`);

        if (item.quantity < num) {
            console.log( 
                item.quantity === 0 ? 
                    "Sorry, we are out of stock!" :
                    "Sorry, we don't have that many left!"
            )
            newPurchase();
        } else {
            let receipt = [
                eDiv,
                "Your order:",
                dDiv,
                "    Purchase: " + item.name,
                "    Quantity: " + num,
                "    Price: " + item.price,
                "    Total: " + (item.price * num).toFixed(2),
                dDiv,
                "Thank you for your purchase!",
                eDiv + "\n",
            ].join("\n");

            console.log(receipt);

            purchasing(item, num);
        }
    })
    
    
}

/**-----------------------------------------------
 * * Validation Stuff down here
 * ----------------------------------------------- */
function check(chk, answer) {
    //console.log("check " + answer);

    let reg = /^\d+$/;
    let checkNum = reg.test(answer);
    let msg = "Sorry, that is not a valid product id!";

    //console.log("Testing regex: " + reg.test(answer));
    return !checkNum || chk ? msg : true;
}
function numVal(answer) {
    let chk =  answer < first || answer > last;
    return check(chk, answer);
}

function isNum(answer) {
    let chk = answer < 0;
    return check(chk, answer);
}

/**-----------------------------------------------
 * * Purchasing Stuff down here
 * ----------------------------------------------- */
function purchasing(item, purchase) {
    //console.log("Purchasing");

    var query = server.openDB().query(
        "UPDATE products SET ? WHERE ?",
        [{quantity: (item.quantity-purchase)},{id: item.id}],
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");

            newPurchase()
        }
    )
    //console.log(query.sql);
    query
}

/**-----------------------------------------------
 * * Displaying Products down here
 * ----------------------------------------------- */
function newPurchase() {
    console.log("\n" + eDiv + "\n");
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to make another purchase?",
            choices: ["yes", "no"],
            name: "continue"
        }
    ]).then(answer => {
        console.log("\n" + eDiv + "\n");
        if(answer.continue === "yes") {
            server.closeDB();
            start();
        } else {
            console.log("\nThank you for shopping with Bamazon!");
            console.log("Have a nice day!\n");
            server.closeDB();
        }
    })
}


/**-----------------------------------------------
 * * Testing Stuff down here
 * ----------------------------------------------- */
function tableTest(res) {
    let test = {}
    for(let i = 0; i < res.length; i++) {
        test[res[i].id] = {
            name: res[i].name,
            department: res[i].department,
            price: res[i].price = res[i].price.toFixed(2),
            quantity: res[i].quantity
        }
    }
    console.table(test);
}