
const UserService = require('../services/userService')

const userService = new UserService()

class UserController{

    static async getAllUsers(req,res){
        try {
            const users = await userService.getAllUsers()
            res.status(200).json(users)            
        } catch (error) {
            res.status(404).send({message: error.message})
        }

    }

    static async createUser(req, res){
        const { agency, account, name, email, password } = req.body

        try {
            const token = await userService.createUser({agency, account, name, email, password})
            res.status(200).send(token)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }

    static async getUserById(req, res){
        const { id } = req.params

        try {
            const user = await userService.getUserById(id)
            res.status(200).json(user)
        } catch (error) {
            res.status(400).send({message: error.message})
        }

    }

    static async editUserById(req, res){
        const { id }= req.params
        const { agency, account, name, email, password } = req.body

        try {
            await userService.editUserById({id, agency, account, name, email }) 
            res.status(200).send({message: 'Usuário editado com sucesso'})
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }

    static async deleteUserById(req, res){
        const { id } = req.params

        try {
            await userService.deleteUserById(id)
            res.status(200).send({message: "Usuário deletado com sucesso"})
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }
}

module.exports = UserController