const database = require('../models')
const uuid = require('uuid')

class PermissionService{
    async createPermission(dto){
        const permission = await database.permission.findOne({
            where:{
                name: dto.name
            }
        })
        
        if(permission) throw new Error("Permissão já existe")

        try {
            return await database.permission.create({
                id: uuid.v4(),
                name: dto.name,
                description: dto.description
            })
        } catch (error) {
            throw new Error('Erro ao criar uma permissão')
        }
    }

    async getAllPermissions(){
        const permissions = await database.permission.findAll()
        if(!permissions) throw new Error('Não foi encontrado nenhuma permissao cadastrada')
        return permissions
    }

    async getPermissionById(id){
        try {
            const permission = await database.permission.findOne({
                where:{
                    id: id
                }
            })
            if (!permission) throw new Error('Não foi encontrado nenhuma permissão pelo id inserido')
            return permission        
        } catch (error) {
            throw new Error('Não foi possível obter a permissão')
        }
    }

    async editPermissionById(dto){
        const permission = await this.getPermissionById(dto.id)
        try {
            permission.name = dto.name
            permission.description = dto.description

            await permission.save()
            return permission
        } catch (error) {
            throw new Error('Não foi possível editar a permissão')
        }
    
    }

    async deletePermissionById(id){
        const permission = await this.getPermissionById(id)

        try {
            permission.destroy()
            return permission.name
        } catch (error) {
            throw new Error('Erro ao deletar a permissão')
        }
    }
}

module.exports = PermissionService