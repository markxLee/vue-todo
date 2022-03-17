const jwt = require("jsonwebtoken");
require("dotenv").config();

let users = [
    {
        id: 1,
        username: "ninh",
        refreshAccessToken: null
    },
    {
        id: 2,
        username: "deptrai",
        refreshAccessToken: null
    }
]

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

updateRefreshAccessToken = (username, refreshAccessToken) => {
    users = users.map(user => {
        if(user.username === username)
            return {
                ...user,
                refreshAccessToken
            }
        return user;
    })
}

class AuthController {
    login(req, res) {
        const username = req.body.username;
        const user = users.find(user => user.username === username);

        if(!user) return res.sendStatus(401);

        const tokens = generateTokens(user);
        updateRefreshAccessToken(username, tokens.refreshAccessToken);
        res.json(tokens);
    };

    token(req, res){
        const refreshAccessToken = req.body.refreshAccessToken;
        if(!refreshAccessToken) return res.sendStatus(401);

        const user = users.find(user => user.refreshAccessToken === refreshAccessToken);
        if(!user) return res.sendStatus(403);

        try {
            jwt.verify(refreshAccessToken, process.env.REFRESH_ACCESS_TOKEN_SECRET);
            const tokens = generateTokens(user);
            updateRefreshAccessToken(user.username, tokens.refreshAccessToken);
            res.json(tokens);
        } catch (error) {
            console.log(error);
            return res.sendStatus(403);
        }
    };

    logout(req, res) {
        const user = users.find(user => user.id === req.userId);
        updateRefreshAccessToken(user.username, null);
        res.sendStatus(204);
    };
}

module.exports = new AuthController;