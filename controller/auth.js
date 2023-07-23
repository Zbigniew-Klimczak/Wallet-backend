const passport = require("passport");

const authDecor = (refresh = false) => {
  return (req, res, next) => {
    const authHeader = req.header("Authorization");
    console.log(req.headers);
    console.log(req.body);
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (!user || err || (refresh ? user.refreshToken !== token : user.accessToken !== token)) {
        return res.status(401).json({
          status: "Unauthorized",
          code: 401,
          message: "Not authorized",
        });
      }

      req.user = user;
      next();
    })(req, res, next);
  };
};

module.exports = {
  auth: authDecor(),
  refreshAuth: authDecor(true),
};
