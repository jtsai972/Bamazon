//console.log('\nServer Connection configured\n');

const dotenv = require("dotenv");
const result = dotenv.config({path: "./../../.env"})

let database = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB
};

exports.database = database;

//console.log(database);


function configChk() {
    console.log('No value for DB yet:', process.env.DB);

    if (result.error) throw result.error;
    
    console.log(result.parsed)

    console.log('Now the value for DB is:', process.env.DB);
}