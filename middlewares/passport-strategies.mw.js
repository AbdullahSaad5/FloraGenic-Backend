const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  done(null, id);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      session: false,
    },
    (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "Incorrect email" });
          }
          if (user.comparePassword(password)) {
            return done(null, false, { message: "Incorrect password" });
          }
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
