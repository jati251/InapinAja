const { getToken, comparePassword } = require("../helpers");
const { User, Lodging, WishList, Type } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const { Op } = require("sequelize");
const axios=require('axios')

class Controller {
  static async registerCustomer(req, res, next) {
    req.body.role = "Customer";
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

  static async loginCustomer(req, res, next) {
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
        role: "Customer",
        username: user.username,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async loginGoogle(req, res, next) {
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
          role: "Customer",
        });
      }
      let jwtId = { id: user.id };
      const jwtToken = getToken(jwtId);
      req.headers.access_token = jwtToken;

      res.status(200).json({
        message: "Login successful",
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

  static async getLodging(req, res, next) {
    // console.log(req.query);
    let { page } = req.headers;
    if (!page) {
      page = 1;
    }
    let limit = 9;
    let offset = (page - 1) * limit;
    try {
      let data = {
        limit,
        offset,
        where: {},
        include: Type,
      };
      if (req.query.search) {
        let { search } = req.query;
        console.log(search);
        data.where.name = { [Op.iLike]: `%${search}%` };
      }
      if (req.query.type) {
        let { type } = req.query;
        data.where.typeId = +type;
      }
      const lodging = await Lodging.findAndCountAll(data);
      res.status(200).json({
        message: "success get all data",
        lodging,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createWishList(req, res, next) {
    const userId = req.user.id;
    const lodgingId = req.body.id;
    console.log(lodgingId);
    console.log(userId);
    try {
      const lodging = await Lodging.findByPk(+lodgingId);
      if (!lodging) throw { name: "NotFound" };

      const newWishList = await WishList.create({
        userId,
        lodgingId,
      });
      console.log(newWishList);
      res.status(201).json({
        message: "success created wishlist",
        newWishList,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getWishList(req, res, next) {
    const userId = req.user.id;
    try {
      const wishList = await WishList.findAll({
        where: {
          userId,
        },
        include: { model: Lodging, include: Type },
      });
      console.log(wishList);
      res.status(200).json({
        message: "success get wishlist",
        wishList,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async findLodging(req, res, next) {
    const { id } = req.params;
    try {
      const lodging = await Lodging.findOne({
        where: { id },
        include: Type,
      });
      if (!lodging) throw { name: "NotFound" };
      res.status(200).json({
        message: "success find lodging by id " + id,
        lodging,
      });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async getBarcode(req, res, next) {
    const { page } = req.body
    // console.log(id);
    try {
      let {data} = await axios({
        method: 'POST',
        data:{
          frame_name: "no-frame",
          qr_code_text: page,
          image_format: "SVG",
          qr_code_logo: "scan-me-square"
      },
        url: 'https://api.qr-code-generator.com/v1/create?access-token=ramjyCranyvSaGhfPvYNtp1MH9t6IHAtxnBCa_VL1-jDtpjNBbNtwXnr9lPAIm9m'
      })
      res.status(200).json({
        message: "success created barcode",
        barcode:data,
      });
    } catch (error) {
      console.log(error);
    }
  }

    static async getType(req, res, next) {
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
}

module.exports = Controller;
