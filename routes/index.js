const {Router}= require('express');
const passport = require("passport");
const User = require('../schema/user');

const indexRoute= Router();
indexRoute.get("/", (req, res) => {
    console.log(req.user);
    if (req.isAuthenticated()) {
        res.render("index", { user: req.user , ispresent : "true"});
    } else {
        res.render("index", { user: {} , ispresent : "false"});
    }
});

indexRoute.get("/logout", function (req, res) {
    req.logout((err) => {
      if (err) {
        console.log(err);
      }
    });
    res.redirect("/");
});

module.exports = indexRoute;