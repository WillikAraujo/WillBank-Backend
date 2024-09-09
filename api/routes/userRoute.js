const { Router } = require('express')
const UserController = require('../controllers/userController')
const auth = require('../middlewares/auth')
// const permissionRoles = require('../middlewares/permissionRoles')
const roles = require('../middlewares/roles')

const router = Router()

router.use(auth)

router
    .get('/users' /* , roles(['Cliente'])*/,UserController.getAllUsers)
    .get('/user/id/:id', UserController.getUserById)
    .put('/user/id/:id', UserController.editUserById)
    .delete('/user/id/:id', UserController.deleteUserById)
    // .post('/users', UserController.createUser)



module.exports = router