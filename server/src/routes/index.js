const todoController = require("./todos");
const MONGO_DB = "mongodb"
function route(app) {

    app.use(`/${MONGO_DB}`, todoController);
    app.use(`/${MONGO_DB}/create`, todoController);
    app.use(`/${MONGO_DB}/done`, todoController);
    app.use(`/${MONGO_DB}/delete`, todoController);
}

module.exports = route;