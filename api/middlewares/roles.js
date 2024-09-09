const database = require('../models')


const roles = (listRoles) => {
    return async (req, res, next) =>{
        const { userId } = req

        const user = await database.User.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'users_roles',
                    attributes: [ 'id', 'name' ]
                }
            ],
            where:{
                id: userId
            }
        })

        if (!user) return res.status(401).send({message: 'Usuário não cadastrado'})

        const rolesRegistereds = user.users_roles
        .map((role) => role.name)
        .some((role) => listRoles.includes(role))


        if (!rolesRegistereds) {
            return res.status(401).send({
                message: 'Usuário não possui acesso a essa rota',
                user: req.userEmail,
                user_roles: user.users_roles.name
            })

        }

        return next()
    }
}

module.exports = roles