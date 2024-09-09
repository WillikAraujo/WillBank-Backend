'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      roles.belongsToMany(models.User,{
        through: models.user_roles,
        as: 'roles_of_users',
        foreignKey: 'role_id'
      })

      roles.belongsToMany(models.permission,{
        through: models.roles_permissions,
        as: 'roles_of_permissions',
        foreignKey: 'role_id'
      })
    }
  }
  roles.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};