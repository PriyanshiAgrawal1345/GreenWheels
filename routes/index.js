const {Router}= require('express');
const passport = require("passport");

const indexRoute= Router();
indexRoute.get(
    "/",(req, res) => {
        res.render("index");
    }
);

module.exports = indexRoute;