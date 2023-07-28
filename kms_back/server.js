const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path:"./.env"});

const app = require("./app");
const port = process.env.PORT || 8001

const DB = process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD);
console.log(DB);

mongoose.connect(DB).then(con => {
    console.log("DB connection successful ✅ ✅ ✅");
}).catch(err => {
    console.log("Err ==> ",err);
});


app.listen(port,() => {
    console.log(`I'm running on port ${port} ✅ ✅ ✅`);
})