class CreateController {
    index(req, res) {
        console.log(req.body);
        res.send({
            message: `hello ${req.body}`,
        })
    }
}

module.exports = new CreateController;