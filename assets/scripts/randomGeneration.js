console.log("Generating random content");

//generating random quantities
let genRndQuantities = function(max, min) {
    var genQuantity = (max, min) => { 
        return rnd = Math.floor(Math.random() * (max-min) + min) 
    };

    let i = 0;
    while(i < 10) {
        console.log(genQuantity(max, min));
        i++;
    }
}

module.exports = quantityGenerator;