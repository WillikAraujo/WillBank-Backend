const database = require('../models')
const Sequelize = require('sequelize')

class SecurityService{

    async createAcl(dto){

        if (!Array.isArray(dto.roles) || !Array.isArray(dto.permissions)) {
            throw new Error('Roles and permissions must be provided as arrays.');
        }

        const user = await database.User.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'users_roles',
                    attributes: [ 'id', 'name', 'description' ]
                },
                {
                    model: database.permission,
                    as: 'user_permission',
                    attributes: ['id', 'name', 'description' ]
                }
            ],
            where:{
                id: dto.userId
            }
        })
        
        if(!user) throw new Error('Usuário não cadastrado')

        const rolesRegistereds = await database.roles.findAll({
            where:{
                id: {
                    [Sequelize.Op.in]: dto.roles
                }
            }
        })

        const permissionsRegisterds = await database.permission.findAll({
            where:{
                id:{
                    [Sequelize.Op.in]: dto.permissions
                }
            }
        })

        await user.removeUsers_roles(user.user_roles)
        await user.removeUser_permission(user.user_permission)

        await user.addUsers_roles(rolesRegistereds)
        await user.addUser_permission(permissionsRegisterds)

        const newUser = await database.User.findOne({
            include:[
                {
                    model: database.roles,
                    as: 'users_roles',
                    attributes: ['id', 'name', 'description']
                },
                {
                    model: database.permission,
                    as: 'user_permission',
                    attributes: ['id', 'name', 'description']
                }
            ]
        })

        return newUser
    }

    async createPermissionsRoles(dto){
        const role = await database.roles.findOne({
            include: [
                {
                    model: database.permission,
                    as: 'roles_of_permissions',
                    attributes: [ 'id' , 'name', 'description']
                }
            ],
            where:{
                id: dto.roleId
            }
        })

        if (!role) throw new Error('Role não cadastrada')

        const permissionsRegisterds = await database.permission.findAll({
            where:{
                id: {
                    [Sequelize.Op.in]: dto.permissions
                }
            }
        })

        await role.removeRoles_of_permissions(role.roles_of_permissions)
        await role.addRoles_of_permissions(permissionsRegisterds)

        const newRole = await database.roles.findOne({
            include : [
                {
                    model: database.permission,
                    as: 'roles_of_permissions',
                    attributes: [ 'id' , 'name', 'description']
                }
            ],
            where:{
                id: dto.roleId
            }
        })
        
        return newRole
    }

    async getAllPermissionsRoles(){
        try {
        const rolePermissions = await database.roles_permissions.findAll({
            include:[
                {
                    model:database.roles,
                    as: 'role',
                    attributes: [ 'id' , 'name', 'description' ]
                },
                {
                    model:database.permission,
                    as: 'permission',
                    attributes: [ 'id' , 'name', 'description' ]
                }
            ]
        
        })
        const roleMap = {};

        rolePermissions.forEach(item =>{
            const roleId = item.role.id;
            
            if (!roleMap[roleId]){
                roleMap[roleId] = {
                    id: item.role.id,
                    name: item.role.name,
                    description: item.role.description,
                    permissions: []
                }
            }
            
            roleMap[roleId].permissions.push({
                id: item.permission.id,
                name: item.permission.name,
                description: item.permission.description
            })
            // console.log(roleMap[roleId])
        })
        
        const result = Object.values(roleMap)
        return result
        } catch (error) {
            console.log(error)
        }
    }

    async getAllPermissionsRoleById(id){
        try {
            const permissionsRoles = await this.getAllPermissionsRoles();
            
            // Use comparador estrito (===)
            const permissionsRole = permissionsRoles.filter(item => item.id === id);
    
            // Valida se encontrou algum item
            if (permissionsRole.length === 0) {
                throw new Error("Não foi encontrado a role com o ID fornecido");
            }
            
            return permissionsRole;
        } catch (error) {
            console.error("Erro ao acessar as informações da role:", error.message);
            
            // Lança o erro original para não perder o contexto
            throw new Error("Não foi possível acessar as informações da role selecionada");
        }
    }
}
module.exports = SecurityService