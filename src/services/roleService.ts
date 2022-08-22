import { Roles } from "../entities/roles";
import { AppDataSource } from "../db_connection";

interface IRolesRequestName{
    role_name: string
}

interface IRolesRequestId{
    role_id: number
}

interface IRolesRequestFull{
    role_id: number
    role_name: string
}

export class RoleService{
    repository = AppDataSource.getRepository(Roles)
    async novaRole({role_name}:IRolesRequestName){
        // ERRO: o campo é obrigatório
        role_name = role_name.trim()
        if(!role_name){
            throw new Error("Nome da função é obrigatório")
        }

        // ERRO: a função já existe
        const repository = this.repository
        const busca = await repository.findOne({where: {role_name: role_name}})
        if(busca){
            throw new Error("Essa função já existe")
        }

        // SUCESSO
        const role = repository.create({role_name})
        await repository.save(role)
        return role
    }

    async atualizaRole({role_id, role_name}:IRolesRequestFull){
        // ERRO: todos os campos são obrigatórios
        role_name = role_name.trim()
        if(!role_id){
            throw new Error("'role_id' é obrigatório")
        } else if(!role_name){
            throw new Error("Novo 'role_name' é obrigatório")
        }

        // ERRO: não existe uma funcao com o role_id passado
        const repository = this.repository
        const busca1 = await repository.findOneBy({role_id: role_id})
        if(!busca1){
            throw new Error("Esse 'role_id' não está associado a uma função")
        }

        // ERRO: já existe função com esse nome
        const busca2 = await repository.findOneBy({role_name: role_name})
        if(busca2){
            throw new Error("Já existe uma função com esse 'role_name'")
        }

        // SUCESSO
        await repository.update({role_id: role_id}, {role_name: role_name})
        const roleAtualizada = await repository.findOne({where: {role_id: role_id}})
        return roleAtualizada
    }

    async pegaUmaRolePeloId({role_id}:IRolesRequestId){
        // SUCESSO
        const busca = await this.repository.findOne({where: {role_id: role_id}})
        if(!busca){
            return false
        } else {
            return busca
        }
    }

    async pegaUmaRolePeloNome({role_name}:IRolesRequestName){
        // SUCESSO
        const busca = await this.repository.findOne({where: {role_name: role_name}})
        if(!busca){
            return false
        } else {
            return busca
        }
    }

    async apagaUmaRolePeloId({role_id}:IRolesRequestId){
        // SUCESSO
        const busca = await this.pegaUmaRolePeloId({role_id})
        if(busca){
            await this.repository.delete({role_id})
                .catch(() => {
                    throw new Error("Função está em uso e não pode ser excluída")
                })
            return true
        } else {
            return false
        }
    }

    async apagaUmaRolePeloName({role_name}:IRolesRequestName){
        // SUCESSO
        const busca = await this.pegaUmaRolePeloNome({role_name})
        if(busca){
            await this.repository.delete({role_name: role_name})
                .catch(() => {
                    throw new Error("Função está em uso e não pode ser excluída")
                })
            return true
        } else {
            return false
        }
    }
}