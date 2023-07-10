const { verifyToken } = require("../helpers");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  // console.log(req.headers);
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "Unauthenticated" };
    const payload = verifyToken(access_token);
    const user = await User.findByPk(payload.id);
    if (!user) throw { name: "Unauthenticated" };
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    next(error);
  };
};
