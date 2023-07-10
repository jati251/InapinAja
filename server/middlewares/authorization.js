const { Lodging } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const lodging = await Lodging.findByPk(req.params.id);
    if (!lodging) throw { name: "NotFound" };
    if (req.user.role === "Admin") {
      next();
    } else {
      const userId = req.user.id;
      if (userId !== lodging.authorId) throw { name: "Forbidden" };
      next();
    };
  } catch (error) {
    next(error);
  };
};
