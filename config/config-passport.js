const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../service/schemas/user");
require("dotenv").config();
const secret = process.env.SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};
passport.use(
  new Strategy(params, async function (payload, done) {
    const userId = payload.userId;
    const user = await User.findById(userId);
    if (!user) {
      return done(new Error("Not authorized"));
    }
    return done(null, user);
  })
);
