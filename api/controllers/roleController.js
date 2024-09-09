const RoleService = require('../services/roleService')

const roleService = new RoleService()

class RoleController{

    static async createRole(req,res){
        const {name, description} = req.body

        try {
            const role = await roleService.createRole({ name, description })

            res.status(201).send(role)
            
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    } 

    static async getAllRoles(req, res){
        try {
            const roles = await roleService.getAllRoles()
            res.status(200).send(roles)
        } catch (error) {
            res.status(400).send( {message: error.message} )
        }

    }

    static async getRoleById(req, res){
        const { id } = req.params

        try {
            const role = await roleService.getRoleById(id)
            
            res.status(200).send(role)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }
    static async editRoleById(req, res){
        const { id } = req.params
        const { name, description } = req.body

        try {
            const role = await roleService.editRoleById({id, name, description})
            res.status(200).send(role)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }

    static async deleteRoleById(req, res){
        const { id } = req.params

        try {
            const roleName = await roleService.deleteRoleById(id)
            res.status(200).send({message: `A role "${roleName}" foi deletada com sucesso!`})
        } catch (error) {
            res.status(400).send({message: error.message})
            
        }
    }
}

module.exports = RoleController