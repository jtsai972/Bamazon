console.log('\nServer Connection configured\n');

exports.database = {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
    user: process.env.SERVER_USER,
    password: process.env.SERVER_PASS,
    database: process.env.SERVER_DB
};