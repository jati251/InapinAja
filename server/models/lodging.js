"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lodging extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lodging.belongsTo(models.User, { foreignKey: "authorId" });
      Lodging.belongsTo(models.Type, { foreignKey: "typeId" });
      Lodging.belongsTo(models.WishList, {foreignKey: 'id'})
    }
  }
  Lodging.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Name is required`,
          },
          notEmpty: {
            msg: `Name is required`,
          },
        },
      },
      facility: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: `facility is required`,
          },
          notEmpty: {
            msg: `facility is required`,
          },
        },
      },
      roomCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Room Capacity is required`,
          },
          notEmpty: {
            msg: `Room Capacity is required`,
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Image is required`,
          },
          notEmpty: {
            msg: `Image is required`,
          },
          isUrl: {
            msg: `Image must be a URL`,
          },
        },
      },
      authorId: DataTypes.INTEGER,
      location: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Location is required`,
          },
          notEmpty: {
            msg: `Location is required`,
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Price is required`,
          },
          notEmpty: {
            msg: `Price is required`,
          },
          priceMin(value) {
            if (value < 100000) {
              throw new Error("Price must be minimal 100000");
            }
          },
        },
      },
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Type is required`,
          },
          notEmpty: {
            msg: `Type is required`,
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `status is required`,
          },
          notEmpty: {
            msg: `status is required`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Lodging",
    }
  );
  return Lodging;
};
