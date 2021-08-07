const User = require("../models/User");
const Client = require("../models/Client");
const { Strategy, ExtractJwt } = require("passport-jwt");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'SECRET'
};

module.exports = passport => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      await User.findById(payload.user_id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => {
          return done(null, false);
        });
        await Client.findById(payload.client_id)
        .then(client => {
          if (client) {
            return done(null, client);
          }
          return done(null, false);
        })
        .catch(err => {
          return done(null, false);
        });
    })
  );
};