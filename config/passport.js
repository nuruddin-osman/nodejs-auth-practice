const User = require("../models/user.models");
const passport = require("passport");
require("dotenv").config();

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4001/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const user = await User.findOne({ googleId: profile.id });
        if (!user) {
          const newUser = new User({
            username: profile.displayName,
            googleId: profile.id,
          });
          await newUser.save();
          return cb(null, newUser);
        }
        return cb(null, user);
      } catch (error) {
        return cb(error.message);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    done(error, false);
  }
});
