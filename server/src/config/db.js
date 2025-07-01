const mongoose = require("mongoose");
require('dotenv').config();
const connectDb = async() => {
    try {
        const db_uri = process.env.MONGODB_URI;
        await mongoose.connect(db_uri);
    } catch (error) {
        console.log("error occured : ", error);
    }
}

module.exports = connectDb;