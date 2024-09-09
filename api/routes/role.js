const { Router } = require('express')

const RoleController = require('../controllers/roleController')

const router = Router()

router
    .post('/roles', RoleController.createRole)
    .get('/roles', RoleController.getAllRoles)
    .get('/role/id/:id', RoleController.getRoleById)
    .delete('/role/id/:id', RoleController.deleteRoleById)
    .put('/role/id/:id', RoleController.editRoleById)


module.exports = router