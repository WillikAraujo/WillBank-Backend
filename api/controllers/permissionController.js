const PermissionService = require('../services/permissionService')

const permissionService = new PermissionService()

class PermissionController{
    static async createPermission(req, res){
        const { name, description } = req.body

        try {
            const permission = await permissionService.createPermission({name, description})

            res.status(201).send(permission)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }

    static async getAllPermissions(req, res){
        try {
            const permissions = await permissionService.getAllPermissions()
            res.status(200).send(permissions)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }

    static async getPermissionById(req, res){
        const { id } = req.params
        try {
            const permission = await permissionService.getPermissionById(id)
            res.status(200).send(permission)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }

    static async editPermissionById(req, res){
        const { id } = req.params
        const { name, description } = req.body

        try {
            const permission = await permissionService.editPermissionById({ id, name, description })
            res.status(200).send(permission)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }

    static async deletePermissionById(req, res){
        const { id } = req.params

        try {
            const permission = await permissionService.deletePermissionById(id)
            res.status(200).send({message: `A permissão "${permission}" foi deletada com sucesso!`})
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }



}

module.exports = PermissionController