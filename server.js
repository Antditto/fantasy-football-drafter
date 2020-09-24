const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require('path');
const cors = require('cors');
const passport = require("./config/passport");

const errorHandler = require('./helpers/error-handler');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

let server;

const PORT = process.env.PORT || 4000;
const db = require("./models");

const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

//app.use(cors(corsOptions));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://tranquil-shore-28119.herokuapp.com"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(path.join(__dirname,'public')));
app.use('/',express.static(path.join(__dirname+'/public/index.html')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

require("./api-routes.js")(app);

db.sequelize.sync().then(function() {
  server = app.listen(PORT, function() {
    console.log(`==> 🌎  Listening on port ${PORT}`);
  });
});
