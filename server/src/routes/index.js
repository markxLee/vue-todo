const todoController = require("./todos");
const authController = require("./auths");
const MONGO_DB = "mongodb"
const AUTH = "auth"
function route(app) {

    app.use(`/${MONGO_DB}`, todoController);

    app.use(`/${AUTH}`, authController);
}

module.exports = route;