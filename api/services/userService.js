const database = require('../models')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')
const uuid = require('uuid')

class UserService{    
    getAllUsers = async () => await database.User.findAll({
        include:[
            {
                model: database.roles,
                as: 'users_roles',
                attributes: ['id', 'name', 'description'],
                through:{
                    attributes:[]
                }
            },
            {
                model: database.permission,
                as: 'user_permission',
                attributes: ['id', 'name', 'description'],
                through:{
                    attributes:[]
                }
            }
        ]
    })

    getUserById = async (id) =>{
        try {
            const user = await database.User.findOne({
                attributes: ['id','agency','account','name','email','createdAt','updatedAt'],
                where:{
                    id: id
                }
            })
            if (!user) throw new Error("Não localizou o usuário")
            return user
            
        } catch (error) {
            throw new Error("Não localizou o usuário")
        }
        


    }

    editUserById = async (dto) => {


        try {
            const user = await this.getUserById(dto.id)
            
            user.agency = dto.agency ? dto.agency : user.agency
            user.account = dto.account ? dto.account : user.account
            user.name = dto.name ? dto.name : user.name
            user.email = dto.email ? dto.email : user.email
    
            await user.save()            
        } catch (error) {
            throw new Error("Não foi possível editar o usuário")
        }

    }

    deleteUserById = async (id) =>{
        const user = await this.getUserById(id)
        await user.destroy()
    }
}

module.exports = UserService