const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const keys = require("../config/keys");
const mongoose = require("mongoose");
const UserModel = mongoose.model("User");
// Options for JWT Strategy configuration
const opts = {};
// Options elements
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // JWT extractor function
opts.secretOrKey = keys.secretOrKey;  // contains the secret (symmetric)

module.exports = passport => {
  passport.use(
    // Receives options and verify (function)
    new JwtStrategy(opts, (jwt_payload, done) => {
      // Find the user by id
      UserModel.findById(jwt_payload.id)
        .then(user => {
          // If the user was found
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
