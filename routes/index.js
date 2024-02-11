const {Router}= require('express');
const passport = require("passport");
const User = require('../schema/user');

const indexRoute= Router();
indexRoute.get("/", (req, res) => {
    console.log(req.user);
    if (req.isAuthenticated()) {
        res.render("index", { user: req.user });
    } else {
        res.render("index", { user: null });
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