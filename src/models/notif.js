'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notif extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Notif.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tutor: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    notification: {
      type: DataTypes.STRING,
    },
    recipients: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Notif',
  });
  return Notif;
};