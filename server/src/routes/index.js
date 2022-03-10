const createController = require("./create");

function route(app) {

    app.use("/create", createController);
}

module.exports = route;