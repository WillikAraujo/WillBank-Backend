'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      permission.belongsToMany(models.User, {
        through: models.users_permissions,
        as: 'permissions_of_user',
        foreignKey: 'permission_id'
      })

      permission.belongsToMany(models.roles,{
        through: models.roles_permissions,
        as: 'roles_of_permissions',
        foreignKey: 'permission_id'
      })
    }
  }
  permission.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'permission',
  });
  return permission;
};