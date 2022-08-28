import { Raw } from "typeorm";
import { AppDataSource } from "../db_connection";
import { Activities } from "../entities/activities";
import { Users } from "../entities/users";
import { RoleService } from "./roleService";
import { ITokenRequest, TokenService } from "./tokenService";

interface IActvRequestFull{
    value: number
    description: string
    due_date: string
    users_id: number[]
}

interface IActvRequestDesc{
    description: string
    activity_id: number
}

interface IActvRequestDate{
    due_date: string
    activity_id: number
}

interface IActvRequestId{
    activity_id: number
}

export class ActivityService{
    repository = AppDataSource.getRepository(Activities)
    async setNewActivity({value, description, due_date, users_id}:IActvRequestFull, {token}:ITokenRequest){
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

        // ERRO: campo obrigatório
        if(!description){
            throw new Error("'description' é obrigatória")
        } else if(!value){
            throw new Error("'value' é obrigatório")
        } else if(!due_date){
            throw new Error("'due_date' é obrigatório")
        } else if(!users_id){
            throw new Error("'users_id' é obrigatório")
        }
 
        // ERRO: campos vazios
        description = description.trim()
        due_date = due_date.trim()
        if(!description){
            throw new Error("Escreva alguma coisa em 'description'")
        } else if(!description){
            throw new Error("Escreva alguma coisa em 'due_date'")
        } else if(users_id.length==0){
            throw new Error("Atribua a atividade para algum 'user_id'")
        }

        // ERRO: alunos não existem
        const lista = await AppDataSource.getRepository(Users).findBy({
            user_id: Raw((alias) => `${alias} IN (:...user_id)`, {
                user_id: users_id
            })
        })
        if(lista.length!=users_id.length){
            throw new Error("Algum 'user_id' inválido")
        }

        // SUCESSO
        const activitiy = this.repository.create({value: value, description: description, due_date: due_date, user:lista})
        await this.repository.save(activitiy)
        return true
    }
    
    async editDescription({activity_id, description}:IActvRequestDesc, {token}:ITokenRequest){
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

        // ERRO: campos são obrigatórios
        if(!description){
            throw new Error("Nova 'description' é obrigatória")
        } else if(!activity_id){
            throw new Error("'actv_id' é obrigatório")
        }

        // ERRO: description vazia
        description = description.trim()
        if(!description){
            throw new Error("Escreva alguma coisa na nova 'description'")
        }

        // ERRO: não há activities com esse id
        const activity = await this.repository.findOneBy({activite_id: activity_id})
        if(!activity){
            throw new Error("Não é possível editar essa 'activity'")
        }

        // SUCESSO
        await this.repository.update({activite_id: activity_id}, {description: description})
        return true
    }

    async editDueDate({activity_id, due_date}:IActvRequestDate, {token}:ITokenRequest){
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

        // ERRO: campos são obrigatórios
        if(!due_date){
            throw new Error("Nova 'due_date' é obrigatória")
        } else if(!activity_id){
            throw new Error("'actv_id' é obrigatório")
        }

        // ERRO: description vazia
        due_date = due_date.trim()
        if(!due_date){
            throw new Error("Escreva alguma coisa na nova 'due_date'")
        }

        // ERRO: não há activities com esse id
        const activity = await this.repository.findOneBy({activite_id: activity_id})
        if(!activity){
            throw new Error("Não é possível editar essa 'activity'")
        }

        // SUCESSO
        await this.repository.update({activite_id: activity_id}, {due_date: due_date})
        return true
    }
    
    async getActivity({activity_id}:IActvRequestId, {token}: ITokenRequest) {
        // verifica o token
        const user = await new TokenService().verificaToken({token})
        if (!user){ 
            throw new Error(String("Você não tem autorização"))
        }

        // ERRO: campo obrigatório
        if(!activity_id){
            throw new Error("'activity_id' é obrigatório")
        }

        // SUCESSO
        const activity = await this.repository.findOneBy({activite_id: activity_id})
        return activity
    }
    
    async deletaUmaActivity({activity_id}:IActvRequestId, {token}: ITokenRequest) {
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

        // ERRO: campo obrigatório
        if(!activity_id){
            throw new Error("'activity_id' é obrigatório")
        }

        // SUCESSO
        await this.repository.delete({activite_id: activity_id})
        return true
    }   
}