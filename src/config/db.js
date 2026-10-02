const mongoose = require("mongoose")

async function conectToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("server connected to db");
        
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = conectToDB