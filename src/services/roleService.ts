import { Roles } from "../entities/roles";
import { AppDataSource } from "../db_connection";
import { json } from "stream/consumers";
import { SqljsEntityManager } from "typeorm/entity-manager/SqljsEntityManager";

interface IRolesRequestName{
    role_name: string
}

interface IRolesRequestId{
    id: number
}

interface IRolesRequestFull{
    id: number
    role_name: string
}

export class RoleService{
    async novaRole({role_name}:IRolesRequestName){
        const repository = AppDataSource.getRepository(Roles)

        // ERRO: o campo é obrigatório
        if(!role_name){
            throw new Error("Nome da função é obrigatório")
        }

        // ERRO: a função já existe
        const busca = await repository.findOne({where: {role_name: role_name}})
        if(busca){
            throw new Error("Essa função já existe")
        }

        // SUCESSO
        const role = repository.create({role_name})
        await repository.save(role)
        return role
    }

    async atualizaRole({id, role_name}:IRolesRequestFull){
        const repository = AppDataSource.getRepository(Roles)
        // ERRO: todos os campos são obrigatórios
        if(!id){
            throw new Error("'Id' é obrigatório")
        } else if(!role_name){
            throw new Error("Novo nome para a função é obrigatório")
        }

        // ERRO: não existe uma funcao com o id passado
        const busca1 = await repository.findOne({where: {id: id}})
        if(!busca1){
            throw new Error("Esse id não está associado a uma função")
        }

        // ERRO: já existe função com esse nome
        const busca2 = await repository.findOne({where: {role_name: role_name}})
        if(busca2){
            throw new Error("Já existe uma função com esse nome")
        }

        // SUCESSO
        await repository.update({id: id}, {role_name: role_name})
        const roleAtualizada = await repository.findOne({where: {id: id}})
        return roleAtualizada
    }

    async pegaUmaRolePeloId({id}:IRolesRequestId){
        const repository = AppDataSource.getRepository(Roles)

        // SUCESSO
        const busca = await repository.findOne({where: {id: id}})
        if(!busca){
            return {encontrado: false}
        } else {
            return {encontrado: true, role: busca}
        }
    }

    async pegaUmaRolePeloNome({role_name}:IRolesRequestName){
        const repository = AppDataSource.getRepository(Roles)

        // SUCESSO
        const busca = await repository.findOne({where: {role_name: role_name}})
        if(!busca){
            return {encontrado: false}
        } else {
            return {encontrado: true, role: busca}
        }
    }

    async apagaUmaRolePeloId({id}:IRolesRequestId){
        const repository = AppDataSource.getRepository(Roles)

        // SUCESSO
        const busca = await this.pegaUmaRolePeloId({id})
        if(busca.encontrado){
            await repository.delete({id})
            return {encontrado: true, apagado: true}
        } else {
            return {encontrado: false}
        }
    }

    async apagaUmaRolePeloName({role_name}:IRolesRequestName){
        const repository = AppDataSource.getRepository(Roles)

        // SUCESSO
        const busca = await this.pegaUmaRolePeloNome({role_name})
        if(busca.encontrado){
            await repository.delete({role_name: role_name})
            return {encontrado: true, apagado: true}
        } else {
            return {encontrado: false}
        }
    }
}