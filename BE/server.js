
const http = require("http");

const app = require('./app');
const server = http.createServer(app);
const PORT = process.env.PORT;
server.listen(PORT,()=>{
    console.log("Your app is running on port "+PORT);
})