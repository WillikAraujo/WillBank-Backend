const SecurityService = require('../services/securityService')
// const permissionRoles = require('../middlewares/permissionRoles')
const securityService = new SecurityService()
class SecurityController{
    static async createAcl(req, res){
        const { roles, permissions } = req.body
        const { userId } = req

        try {
            const acl = await securityService.createAcl({roles, permissions, userId})

            res.status(201).send(acl)
        } catch (error) {
            res.status(400).send({message: error.message})
        }

    }

    static async createPermissionsRoles(req, res){
        const { roleId, permissions } = req.body
        
        try {
            const permissionsRole = await securityService.createPermissionsRoles({ roleId, permissions })
            res.status(201).send(permissionsRole)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }

    static async getAllPermissionsRoles(req, res){
        try {
            const PermissionsRoles = await securityService.getAllPermissionsRoles() 
            res.status(200).send(PermissionsRoles)    
        } catch (error) {
         res.status(400).send({message: error.message})   
        }
    }
    
    static async getAllPermissionsRoleById(req, res){
        const { id } = req.params
        try {
            const permissionsRole = await securityService.getAllPermissionsRoleById(id)
            
            res.status(200).send(permissionsRole)
        } catch (error) {
            res.status(400).send({message: error.message})
            
        }
        
    }
}

module.exports = SecurityController