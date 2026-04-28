const mongoose = require("mongoose")

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)  
        console.log("DB connected to the server")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToDB