'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.roles,{
        through: models.user_roles,
        as: 'users_roles',
        foreignKey: 'user_id'
      })
      User.belongsToMany(models.permission,{
        through: models.users_permissions,
        as: 'user_permission',
        foreignKey: 'user_id'
      })
    }
  }
  User.init({
    agency: DataTypes.INTEGER,
    account: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};