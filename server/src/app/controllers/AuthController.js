const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User")

let user = Object.create(null);

generateTokens = payload => {
    const {id, username} = payload;
    const accessToken = jwt.sign({id, username}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1m"
    });

    const refreshAccessToken = jwt.sign({id, username}, process.env.REFRESH_ACCESS_TOKEN_SECRET, {
        expiresIn: "1h"
    });

    return {accessToken, refreshAccessToken};
}

updateRefreshAccessToken = (refreshAccessToken) => {
    user = {
        ...user,
        refreshAccessToken
    }
}

class AuthController {
    async login(req, res) {
        user = await User.findOne({ username : req.body.username});
        if(!user) return res.sendStatus(401);
        user = {...user};
        const tokens = generateTokens(user);
        updateRefreshAccessToken(tokens.refreshAccessToken);
        res.json(tokens);
    };

    async token(req, res){
        const refreshAccessToken = req.body.refreshAccessToken;
        if(!refreshAccessToken) return res.sendStatus(401);

        if(refreshAccessToken !== user.refreshAccessToken) return res.sendStatus(403);

        try {
            jwt.verify(refreshAccessToken, process.env.REFRESH_ACCESS_TOKEN_SECRET);
            const tokens = generateTokens(user);
            updateRefreshAccessToken(tokens.refreshAccessToken);
            res.json(tokens);
        } catch (error) {
            console.log(error);
            return res.sendStatus(403);
        }
    };

    logout(req, res) {
        updateRefreshAccessToken(user.username, null);
        res.sendStatus(204);
    };
}

module.exports = new AuthController;