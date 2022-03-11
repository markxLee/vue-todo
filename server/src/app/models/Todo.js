const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Todo = new Schema({
    content: {type: String, maxlength: 50},
    index: {type: Number, maxlength: 50},
    isChecked: {type: Boolean},
    pinNumber: {type: Number, maxlength: 50},
    todoStatus: {type: Boolean}
});

module.exports = mongoose.model("Todo", Todo);