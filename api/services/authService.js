const database = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')

class AuthService{

    async login(dto){
        const user = await database.User.findOne({
            include:[
                {
                    model: database.roles,
                    as: 'users_roles',
                    attributes: ['id', 'name', 'description'],
                    through:{
                        attributes:[]
                    }
                }
            ],
            where:{
                email: dto.email
            }
        })

        if (!user) throw new Error('Usuário ou senha incorreto')

        const equalPass = await bcrypt.compare(dto.password, user.password)

        if (!equalPass)  throw new Error('Usuário ou senha incorreto')

        if (!user.users_roles) throw new Error('Nenhuma role cadastrada para esse usuário')

        const userRole = user.users_roles[0]
        
        try {
            return jwt.sign({
                id: user.id,
                email: user.email,
                roleId: userRole.id
            }, process.env.JWT_SECRET, {
                expiresIn: "1h"
            })
        } catch (error) {
            throw new Error("Não foi possível retornar o token")
        }
        
    }

     async createUser(dto){
        const user = await database.User.findOne({
            where:{
                email: dto.email
            }
        })
        
        if (user) throw new Error("Email já existe")

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(dto.password, salt)

        try {
            const newUser = await database.User.create({
                id: uuid.v4(),
                agency: dto.agency,
                account: dto.account,
                name: dto.name,
                email: dto.email,
                password: hashedPassword
            })
            const token =  jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {expiresIn: '1h'})
            return token
        } catch (error) {
            throw new Error("")
        }

    }

}

module.exports = AuthService