const Todo = require("../models/Todo")

class TodoController {
    index(req, res) {
        Todo.find({})
            .then(todos => res.send(todos))
            .catch(error => error);
    }
    ///
    ///CRUD DATA
    ///
    create(req, res) {
        const data = req.body;
        const todo = new Todo(data);
        todo.save()
            .then(data => res.send(data._id))
            .catch(error => error);
    }
    delete(req, res) {
        Todo.deleteOne({ _id: req.body.id})
        .then(() => res.send(true))
        .catch(error => error);
    }
    done(req, res) {
        Todo.updateOne({ _id: req.body.id}, {todoStatus: 2})
        .then(() => res.send(true))
        .catch(error => error);
    }
    check(req, res) {
        Todo.updateOne({ _id: req.body.id}, {isChecked: true})
        .then(() => res.send(true))
        .catch(error => error);
    }
    pin(req, res) {
        Todo.updateOne({ _id: req.body.id}, {pinNumber: req.body.pinNumber})
        .then(() => res.send(true))
        .catch(error => error);
    }
}

module.exports = new TodoController;