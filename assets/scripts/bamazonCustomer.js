console.log("Entering customer perspective");

// * setting up requirements
const inquirer = require("inquirer");
const server = require("./serverAccess");

let first, last;

let customer = function(){
    console.log("Hi, I'm a customer!");
    start();
}

module.exports = customer;

customer();

//start();
function start() {
    server.openDB().query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

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

        first = res[0].id;
        last = res[res.length-1].id;

        console.log(res.length);

        inquirer.prompt([
            {
                type: "number",
                message:"What is the index of the product you want to buy?",
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

            //Item and current quantity
            console.log(`Item: ${item.name} \nQuantity: ${item.quantity}`);

            console.log(" ");

            if (item.quantity < num) {
                console.log( 
                    item.quantity === 0 ? 
                        "Sorry, we are out of stock!" :
                        "Sorry, we don't have that many left!"
                )
                server.closeDB();
            } else {
                purchase()
            }
            

            server.closeDB();
        })
        
    });
}

// customer();

let numVal = function(answer) {
    if(typeof answer !== "number" || typeof answer === NaN) {
        return "Sorry, that is not a valid product id!";
    } else if ( answer < first || answer > last) {
        return "Sorry, that is not a valid product id!";
    } else {
        return true;
    }
}

let isNum = function(answer) {
    if (typeof answer !== "number" || typeof answer === NaN) {
        return "Sorry, that is not a valid product id!";
    } else if (answer < 0) {
        return "Sorry, that is not a valid product id!";
    } else {
        return true;
    }
}