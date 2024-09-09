const { Router } = require('express')

const router = Router()

const SecurityController = require('../controllers/securityController')

router
    .post('/security/acl', SecurityController.createAcl)
    .post('/security/permissions-roles', SecurityController.createPermissionsRoles)
    .get('/security/permissions-roles', SecurityController.getAllPermissionsRoles)
    .get('/security/permissions-role/id/:id',SecurityController.getAllPermissionsRoleById)


module.exports = router