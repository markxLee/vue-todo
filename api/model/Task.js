var mongoose = require('mongoose');
// Setup schema
var taskSchema = mongoose.Schema({
    id: String,
    name: String,
    content: String,
    status: Number,
    pin: Number,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Contact model
var Task = module.exports = mongoose.model('task', taskSchema);
module.exports.get = function (callback, limit) {
    Task.find(callback).limit(limit);
}