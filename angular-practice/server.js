const app = require('./app');
require('dotenv').config({path:'./config.env'});
const connectDB = require('./src/config/database.config');

const DB = process.env.DATABASE_LOCAL;
const PORT = process.env.PORT;


connectDB(DB);
app.listen(PORT,() => {
    console.log(`The server is listening at ${PORT}...`)
})