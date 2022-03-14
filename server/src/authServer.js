const express = require("express");
const cors = require("cors");
const app = express();
const PORT =  5000;
const db = require("./config/db");
db.connect();

const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

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

const generateTokens = payload => {
    const {id, username} = payload;

    const accessToken = jwt.sign({id, username}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15s"
    });
    
    const refreshAccessToken = jwt.sign({id, username}, process.env.REFRESH_ACCESS_TOKEN_SECRET, {
        expiresIn: "1h"
    });

    return {accessToken, refreshAccessToken};
}

const updateRefreshAccessToken = (username, refreshAccessToken) => {
    users = users.map(user => {
        if(user.name === username) 
            return {
                ...user,
                refreshAccessToken
            }
    })
}

app.post("/login", (req, res) => {
    const username = req.body.username;
    const user = users.find(user => user.username === username);
    
    if(!user) return res.sendStatus(401);

    const tokens = generateTokens(user);
    updateRefreshAccessToken(username, tokens.refreshAccessToken);
    res.json(tokens);
});

app.post("/token", (req, res) => {
    const refreshAccessToken = req.body.refreshAccessToken;
    if(!refreshAccessToken) return res.sendStatus(401);

    const user = users.find(user => user.refreshAccessToken === refreshAccessToken);
    if(!user) return res.sendStatus(403);

    try {
        jwt.verify(refreshAccessToken, process.env.REFRESH_ACCESS_TOKEN_SECRET);
        const tokens = generateTokens(user);
        updateRefreshAccessToken(username, tokens.refreshAccessToken);
        res.json(tokens);
    } catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
});

app.listen(PORT, () => console.log(`Success conect with ${PORT}`));