const { comparePassword, getToken } = require("../helpers");
const { User, Type, Lodging, History } = require("../models");
const { OAuth2Client } = require("google-auth-library");

class Controller {
  static async googleSign(req, res, next) {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const token = req.headers.google_token;
      // console.log(token);

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];
      // console.log(userid);
      let user = await User.findOne({
        where: {
          email: payload.email,
        },
      });

      if (!user) {
        user = await User.create({
          username: payload.given_name,
          email: payload.email,
          password: String(Math.random()),
          role: "Staff",
        });
      }
      let jwtId = { id: user.id };
      const jwtToken = getToken(jwtId);
      req.headers.access_token = jwtToken;

      res.status(200).json({
        message: "Login succeessful",
        access_token: jwtToken,
        id: user.id,
        email: user.email,
        role: user.role,
        username: user.username,
      });
    } catch (error) {
      next(error);
    }
  }

  static async registerAdmin(req, res, next) {
    req.body.role = "Admin";
    const payload = req.body;
    try {
      const created = await User.create(payload);
      res.status(201).json({
        message: "success register data",
        created,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async loginPost(req, res, next) {
    // console.log(req.body);
    const { email, password } = req.body;
    try {
      if (!email || !password) throw { name: "EmailPasswordEmpty" };
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user || !comparePassword(password, user.password))
        throw { name: "emailPasswordFalse" };
      let payload = { id: user.id };
      const token = getToken(payload);
      req.headers.access_token = token;

      res.status(200).json({
        message: "Login succeessful",
        access_token: token,
        id: user.id,
        email: user.email,
        role: user.role,
        username: user.username,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async lodgings(req, res, next) {
    try {
      const lodging = await Lodging.findAll({
        include: User,
      });
      res.status(200).json({
        message: "success get all data",
        lodging,
      });
    } catch (error) {
      // console.log(err);
      next(error);
    }
  }

  static async type(req, res, next) {
    try {
      const type = await Type.findAll();
      res.status(200).json({
        message: "success get all data",
        type,
      });
    } catch (error) {
      // console.log(err);
      next(error);
    }
  }

  static async lodgingsCreate(req, res, next) {
    try {
      const status = "Active";
      const { name, facility, roomCapacity, imgUrl, location, price, typeId } =
        req.body;
      const createLodging = await Lodging.create({
        name,
        facility,
        roomCapacity,
        imgUrl,
        authorId: req.user.id,
        location,
        price,
        typeId,
        status,
      });

      const log = await History.create({
        title: createLodging.name,
        description: `New lodging with id ${createLodging.id} is created`,
        updatedBy: req.user.email,
      });
      // console.log(log);
      res.status(201).json({
        message: "success add data",
        createLodging,
      });
    } catch (error) {
      next(error);
    }
  }

  static async lodgingDelete(req, res, next) {
    const { id } = req.params;
    try {
      const lodging = await Lodging.findByPk(id);
      if (!lodging) throw { name: "NotFound" };
      const deleted = await Lodging.destroy({
        where: {
          id,
        },
      });
      if (!lodging) throw { name: "NotFound" };
      const log = await History.create({
        title: lodging.name,
        description: `Lodging ${lodging.name} with id ${lodging.id} is deleted`,
        updatedBy: req.user.email,
      });
      res.status(200).json({
        message: `${lodging.name} Success to delete`,
        lodging,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async lodgingEdit(req, res, next) {
    try {
      const { name, facility, roomCapacity, imgUrl, location, price, typeId } =
        req.body;
      const { id } = req.params;

      const update = await Lodging.update(
        {
          name,
          facility,
          roomCapacity,
          imgUrl,
          location,
          price,
          typeId,
        },
        {
          where: {
            id,
          },
        }
      );

      const log = await History.create({
        title: name,
        description: `Lodging with id ${id} is updated`,
        updatedBy: req.user.email,
      });

      res.status(200).json({
        message: "success update data",
        name,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async statusEdit(req, res, next) {
    const { id } = req.params;
    const { status } = req.body;
    try {
      if (
        status === "Active" ||
        status === "Archived" ||
        status === "Inactive"
      ) {
        const lodging = await Lodging.findByPk(id);
        if (!lodging) throw { name: "NotFound" };
        const updated = Lodging.update(
          {
            status,
          },
          {
            where: {
              id,
            },
          }
        );
        const log = await History.create({
          title: lodging.name,
          description: `Lodging with id ${lodging.id} status has been updated from ${lodging.status} into ${status}`,
          updatedBy: req.user.email,
        });
        res.status(200).json({
          message: "success update data",
          lodging,
        });
      } else {
        throw { name: "statusError" };
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async findLodgingById(req, res, next) {
    const { id } = req.params;
    try {
      const lodging = await Lodging.findByPk(id);
      if (!lodging) throw { name: "NotFound" };
      res.status(200).json({
        message: "success get data by id",
        lodging,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async typeCreate(req, res, next) {
    try {
      const { name } = req.body;
      const createType = await Type.create({
        name,
      });

      const log = await History.create({
        title: createType.name,
        description: `Type with id ${createType.id} is created`,
        updatedBy: req.user.email,
      });
      res.status(201).json({
        message: "success add data",
        createType,
      });
    } catch (error) {
      next(error);
    }
  }

  static async typeDelete(req, res, next) {
    const { id } = req.params;
    try {
      const type = await Type.findByPk(id);
      if (!type) throw { name: "NotFound" };
      const deleted = await Type.destroy({
        where: {
          id,
        },
      });
      if (!type) throw { name: "NotFound" };

      const log = History.create({
        title: type.name,
        description: `${type.name} is deleted`,
        updatedBy: req.user.email,
      });
      res.status(200).json({
        message: `${type.name} Success to delete`,
        type,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async history(req, res, next) {
    try {
      const history = await History.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json({
        message: "success get all data",
        history,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
