const { Router } = require('express')

const router = Router()
const AuthController = require('../controllers/authController')


router
    .post('/auth/login', AuthController.login)
    .post('/auth/register', AuthController.createUser)

module.exports = router