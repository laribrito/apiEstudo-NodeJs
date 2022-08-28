import { Roles } from "../entities/roles";
import { AppDataSource } from "../db_connection";
import { Users } from "../entities/users";
import { ITokenRequest, TokenService } from "./tokenService";

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

interface IRoleVerify{
    user: Users
}

export class RoleService{
    repository = AppDataSource.getRepository(Roles)
    async novaRole({role_name}:IRolesRequestName, {token}:ITokenRequest){
        // verifica o token
        const user = await new TokenService().verificaToken({token})
        if (!user){ 
            throw new Error(String("Você não tem autorização"))
        }

        // ERRO: não tem permissão (só usuários com role==1 podem alterar uma role)
        const role_user=await new RoleService().verificaRole({user})
        if(!role_user){
            throw new Error("Você não tem permissão")
        }

        // ERRO: o campo é obrigatório
        if(!role_name){
            throw new Error("'role_name' é obrigatório")
        }

        // ERRO: role_name vazia
        role_name = role_name.trim()
        if(!role_name){
            throw new Error("Escreva alguma coisa em 'role_name'")
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

    async atualizaRole({role_id, role_name}:IRolesRequestFull, {token}:ITokenRequest){
        // verifica o token
        const user = await new TokenService().verificaToken({token})
        if (!user){ 
            throw new Error(String("Você não tem autorização"))
        }

        // ERRO: não tem permissão (só usuários com role==1 podem alterar uma role)
        const role_user=await new RoleService().verificaRole({user})
        if(!role_user){
            throw new Error("Você não tem permissão")
        }

        // ERRO: todos os campos são obrigatórios
        if(!role_id){
            throw new Error("'role_id' é obrigatório")
        } else if(!role_name){
            throw new Error("Novo 'role_name' é obrigatório")
        }

        // ERRO: role_name vazia
        role_name = role_name.trim()
        if(!role_name){
            throw new Error("Escreva alguma coisa em 'role_name'")
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

    async pegaUmaRolePeloId({role_id}:IRolesRequestId, {token}:ITokenRequest){
        // verifica o token
        const user = await new TokenService().verificaToken({token})
        if (!user){ 
            throw new Error(String("Você não tem autorização"))
        }

        // ERRO: não tem permissão (só usuários com role==1 podem alterar uma role)
        const role_user=await new RoleService().verificaRole({user})
        if(!role_user){
            throw new Error("Você não tem permissão")
        }

        // SUCESSO
        const busca = await this.repository.findOne({where: {role_id: role_id}})
        if(!busca){
            return false
        } else {
            return busca
        }
    }

    async pegaUmaRolePeloNome({role_name}:IRolesRequestName, {token}:ITokenRequest){
        // verifica o token
        const user = await new TokenService().verificaToken({token})
        if (!user){ 
            throw new Error(String("Você não tem autorização"))
        }

        // ERRO: não tem permissão (só usuários com role==1 podem alterar uma role)
        const role_user=await new RoleService().verificaRole({user})
        if(!role_user){
            throw new Error("Você não tem permissão")
        }

        // SUCESSO
        const busca = await this.repository.findOne({where: {role_name: role_name}})
        if(!busca){
            return false
        } else {
            return busca
        }
    }

    async apagaUmaRolePeloId({role_id}:IRolesRequestId, {token}:ITokenRequest){
        // verifica o token
        const user = await new TokenService().verificaToken({token})
        if (!user){ 
            throw new Error(String("Você não tem autorização"))
        }

        // ERRO: não tem permissão (só usuários com role==1 podem alterar uma role)
        const role_user=await new RoleService().verificaRole({user})
        if(!role_user){
            throw new Error("Você não tem permissão")
        }

        // SUCESSO
        const busca = await this.pegaUmaRolePeloId({role_id}, {token})
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

    async apagaUmaRolePeloName({role_name}:IRolesRequestName, {token}:ITokenRequest){
        // verifica o token
        const user = await new TokenService().verificaToken({token})
        if (!user){ 
            throw new Error(String("Você não tem autorização"))
        }

        // ERRO: não tem permissão (só usuários com role==1 podem alterar uma role)
        const role_user=await new RoleService().verificaRole({user})
        if(!role_user){
            throw new Error("Você não tem permissão")
        }

        // SUCESSO
        const busca = await this.pegaUmaRolePeloNome({role_name}, {token})
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

    async verificaRole({user}:IRoleVerify){
        const retorno = await AppDataSource.getRepository(Users).findOne({
            relations:{
                fk_role_id: true
            },
            where: {
                user_id: user.user_id,
                fk_role_id:{
                    role_id: 1,
                }
            }
        })
        console.log(retorno)
        return retorno
    }
}