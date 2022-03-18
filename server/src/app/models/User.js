const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    username: {type: String},
    refreshAccessToken: {type: String}
});

module.exports = mongoose.model("User", User);