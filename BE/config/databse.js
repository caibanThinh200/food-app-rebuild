require("dotenv").config();
const knex = require("knex");

const querry = knex({
    client:"mysql",
    connection:{
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME
    },
    pool:{max:100,min:0}
},(e)=>{
console.log("OK");

}) 
module.exports = querry;