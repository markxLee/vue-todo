const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/todo_app")
    } catch (error) {
        console.log("Connect failure: ", error);
    }
}

module.exports = {connect}