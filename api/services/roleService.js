const database = require('../models')
const uuid = require('uuid')
class RoleService{

    async createRole(dto){
        const role = await database.roles.findOne({
            where:{
                name: dto.name
            }
        })

        if (role) throw new Error('Role já cadastrado')

            try {
                return await database.roles.create({
                    id: uuid.v4(),
                    name: dto.name,
                    description: dto.description
                })
            } catch (error) {
                throw new Error('Erro ao cadastrar role')
            }
        }

        async getAllRoles(){
            try {
                return await database.roles.findAll()
            } catch (error) {
                throw new Error('Erro ao trazer todas as roles')
            }
        }

        async getRoleById(id){

            try {
                const role = await database.roles.findOne({
                    where:{
                        id: id
                    }
                })
                if (!role) throw new Error('Não foi encontrado nenhum Role pelo Id inserido!')

                return role
            } catch (error) {
                throw new Error('Não foi encontrado nenhum Role pelo Id inserido!')
            }
        }

        async editRoleById(dto){
            const role = await this.getRoleById(dto.id)
            
            try {
                role.name = dto.name
                role.description = dto.description

                await role.save()
                return role
            } catch (error) {
                throw new Error('Não foi possível fazer a edição da role')
            }
        }
        
        async deleteRoleById(id){
            
            const role = await this.getRoleById(id)
            try {
                await role.destroy()
                return role.name
            } catch (error) {
                throw new Error('Não foi possível deletar a role')
            }
        }
    }



module.exports = RoleService