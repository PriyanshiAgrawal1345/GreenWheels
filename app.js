require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
const express = require("express");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");

require("https").globalAgent.options.rejectUnauthorized = false;

const app = express();
app.use(express.static("public"));
app.use(express.static("uploaded_docs"));
app.use(express.urlencoded({ extended: true }));
app.set("views", "./views");
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(express.static(__dirname + "/views")); 
app.use("/images", express.static(__dirname + "/views/assets/img"));

app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

mongoose.set('strictQuery', false);
mongoose.connect(String(process.env.DB_URL),{
     useNewUrlParser: true , 
     useUnifiedTopology: true
}).then(()=>console.log("connection established")).catch((err)=>console.log("err",err))


const User = require("./schema/user");

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

const strategy = require("./src/strategy");
passport.use(strategy);


//////        Routes     /////////
const indexRoute = require("./routes/index");
const authRoute = require("./routes/auth");

app.use('/',indexRoute);
app.use('/auth/google', authRoute);



app.listen(process.env.PORT || 8080, function () {
  console.log("Server running on port "+ process.env.PORT || 8080);
});