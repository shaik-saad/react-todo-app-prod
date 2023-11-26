const mongoose = require("mongoose");
// add mongodb uri as DATABASE_URI in a .env file before execution
const uri = process.env.DATABASE_URI;

function connect() {
    const options = { useNewUrlParser:true };
    mongoose.connect(uri, options).then(
        () => { console.log("Database connection established!"); },
        err => { console.log("Error connecting Database instance due to: ", err); }
    )
}

module.exports = connect