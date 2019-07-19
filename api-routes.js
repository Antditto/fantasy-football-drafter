// Requiring our models and passport as we've configured it
const db = require("./models");
const uuidv4 = require('uuid/v4');
const passport = require("./config/passport");
const joinPlayers = require('./helpers/player-joiner');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


module.exports = function(app) {
  app.post("/login", passport.authenticate("local"), function(req, res, next) {
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }));
  });


  app.post("/register", function(req, res, next) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.firstName,
      last_name: req.body.lastName
    }).then(() => res.json({}))
      .catch(err => next(err));
  });

  app.post("/roster", function(req, res, next) {
    db.Roster.upsert({
      userId: req.body.userId,
      qb: req.body.qb[0].playerId,
      wr_one: req.body.wr[0].playerId,
      wr_two: req.body.wr[1].playerId,
      rb_one: req.body.rb[0].playerId,
      rb_two: req.body.rb[1].playerId,
      te: req.body.te[0].playerId,
      flex: req.body.flex[0].playerId,
      def: req.body.flex[0].playerId,
      bench_one: req.body.bench[0].playerId,
      bench_two: req.body.bench[1].playerId,
      bench_three: req.body.bench[2].playerId,
      bench_four: req.body.bench[3].playerId,
      bench_five: req.body.bench[4].playerId,
      bench_six: req.body.bench[5].playerId,
    }).then(() => res.json({})).catch(err => {
      console.log(err);
      return next(err)
    })
  });

  app.get("/roster/:id", function(req, res, next) {
    db.Roster.findAll({
        where: {
          'userId': req.params.id
        }
      })
      .then(async(data) => {
        data = JSON.stringify(data);
        console.log("DATA HERE", data);
        if (data.length > 0) {
          joinPlayers(data).then(rosterData => {
            console.log(rosterData);
            res.json(rosterData);
          });
        } else {
            res.json({});
        }
      })
      .catch(err => next(err))
  });

}
