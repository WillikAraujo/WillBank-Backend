const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).send({message: 'Acesso negado'})

    try {
        const accessToken = jwt.verify(token, process.env.JWT_SECRET)

        const { id, email , roleId } = accessToken

        req.userId = id
        req.userEmail = email
        req.roleId = roleId

        return next()
    } catch (error) {
        return res.status(400).send({ message: 'Token inválido'})
    }

}                                                               

module.exports = authenticateToken