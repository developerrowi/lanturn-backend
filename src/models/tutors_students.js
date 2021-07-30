'use strict';
const { Model, Sequelize} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tutors_Students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tutors_Students.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tutorId: {
      type: Sequelize.INTEGER,
    },
    studentId: {
      type: Sequelize.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Tutors_Students',
  });
  return Tutors_Students;
};