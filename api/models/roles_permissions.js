'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles_permissions extends Model {
    static associate(models) {
      roles_permissions.belongsTo(models.roles, {
        foreignKey: 'role_id',
        as: 'role'
      });
      roles_permissions.belongsTo(models.permission, {
        foreignKey: 'permission_id',
        as: 'permission'
      });
    }
  }
  roles_permissions.init({
    role_id: DataTypes.UUID,
    permission_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'roles_permissions',
  });
  return roles_permissions;
};