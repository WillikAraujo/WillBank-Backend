const AuthService = require('../services/authService')

const authService = new AuthService()

class AuthController{

   static async login(req, res){
    const { email, password } = req.body

    try {
        const login = await authService.login({email, password})
        res.status(200).send(login)
    } catch (error) {
        res.status(401).send({message: error.message})
    }

   }

   static async createUser(req, res){
    const { agency, account, name, email, password } = req.body

    try {
        const token = await authService.createUser({agency, account, name, email, password})
        res.status(200).send(token)
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

}

module.exports = AuthController