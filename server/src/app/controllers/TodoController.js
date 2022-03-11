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
            .then(() => res.redirect(`${req.baseUrl}/`))
            .catch(error => error);
    }
    done(req, res) {
        console.log("VAO DONE");
        Todo.updateOne({ _id: req.body.id}, 2)
        .then(() => res.redirect(`${req.baseUrl}/`))
        .catch(error => error);
    }
    delete(req, res) {
        console.log("id DELETE:= ", req.body.id);
        Todo.deleteOne({ _id: req.body.id})
        .then(() => res.redirect(`${req.baseUrl}/`))
        .catch(error => error);
    }
}

module.exports = new TodoController;