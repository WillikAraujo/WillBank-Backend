const { Router } = require('express')
const router = Router()

const PermissionController = require('../controllers/permissionController')

router
    .post('/permissions', PermissionController.createPermission)
    .get('/permissions', PermissionController.getAllPermissions)
    .get('/permission/id/:id', PermissionController.getPermissionById)
    .delete('/permission/id/:id', PermissionController.deletePermissionById)
    .put('/permission/id/:id', PermissionController.editPermissionById)


module.exports = router