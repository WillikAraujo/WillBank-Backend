const database = require('../models')
const Sequelize = require('sequelize')

const permissionRoles = (listPermissions) =>{

    return async (req, res, next) => {
        const { userId } = req

        const user = await database.User.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'users_roles',
                    attributes: ['id', 'name']
                }
            ],
            where:{
                id: userId
            }
        })

        if (!user) return res.status(401).send({message: 'Usuário não cadastrado'})

        let listRolesId = []

        Object.values(user.users_roles).map((role) =>{
            listRolesId.push(role.id)
        })

        if (listRolesId.length == 0) return res.status(401).send({message: 'Usuario não possui acesso a essa rota'})
            
        const roles = await database.roles.findAll({
            include:[
                {
                    model: database.permission,
                    as: 'roles_of_permissions',
                    attributes: ['id', 'name']
                }
            ],
            where: {
                id:{
                    [Sequelize.Op.in]: listRolesId
                }
            }
        })

        let hasPermission = false

        roles.map((role) =>{
            hasPermission = role.roles_of_permissions
            .map((permission) => permission.name)
            .some((permission) => listPermissions.includes(permission))
        })

        if (!hasPermission) return res.status(401).send({message: 'Usuário não tem acesso a essa rota'})

        
        return next()
    
        }
}

module.exports = permissionRoles
