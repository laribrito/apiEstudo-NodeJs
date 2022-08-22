import { Users } from '../entities/users' 
import { AppDataSource } from './../db_connection' 
import { RoleService } from './roleService'
import * as bcrypt from 'bcrypt';
import { ITokenRequest, TokenService } from './tokenService';

interface IUsersRequestFull{
    name: string 
    email: string 
    password: string 
    role_id: number
}

interface IUsersRequestE{
    email: string
}

interface IUsersRequestID{
    user_id: number
}

interface IUsersRequestN{
    name: string
}

interface IUsersRequestPW{
    password: string
}


export class UserService{
    repository = AppDataSource.getRepository(Users)
    async novoUsuario({name, email, password, role_id}:IUsersRequestFull){
        const repository = this.repository 
        // ERRO: todos os campos são obrigatórios
        if(!name){
            throw new Error("'name' é obrigatório") 
        } else if(!email){
            throw new Error("'email' é obrigatório") 
        } else if(!password){
            throw new Error("'password' é obrigatória") 
        } else if(!role_id){
            throw new Error("'role_id' é obrigatório") 
        }

        // ERRO: não existe função com esse id
        const roleService = new RoleService()
        const fk_role_id = await roleService.pegaUmaRolePeloId({role_id})
        if(!fk_role_id){
            throw new Error("Não existe função com o 'role_id' indicado")
        }

        // ERRO: esse usuario já existe
        const buscaUser = await repository.findOneBy({email: email})
        if(buscaUser){
            throw new Error('Esse usuário já existe. Cadastre um outro email')
        }

        // hash de password
        password = await bcrypt.hash(password, await bcrypt.genSalt());    
        
        // SUCESSO
        const user = repository.create({name, email, password, fk_role_id}) 
        await repository.save(user) 
        return true
    }

    // Deve ser usada somente internamente
    async pegaUsuarioPeloEmail({email}:IUsersRequestE){
        // SUCESSO
        const busca = await this.repository.findOneBy({email:email})
        return busca
    }

    // Deve ser usada somente internamente
    async buscaUsuarioPeloEmail({email}:IUsersRequestE){
        // ERRO: campo obrigatório
        if (!email){
            throw new Error("'email' é obrigatório")
        }

        // SUCESSO
        const busca = await this.repository.findBy({email: email})
        if(busca){
            return busca
        } else {
            return false
        }
    }

    async buscaUsuarioPeloId({user_id}:IUsersRequestID, {token}:ITokenRequest){
        // verifica o token
        const retorno = await new TokenService().verificaToken({token})
        if (!retorno){ 
            throw new Error(String("Você não tem autorização"))
        }

        // ERRO: campo obrigatório
        if (!user_id){
            throw new Error("'user_id' é obrigatório")
        }

        // SUCESSO
        const busca = await this.repository.findOne({
            select: 
                {user_id:true, name: true, email:true, created_at:true}, 
            where:
                {user_id:user_id}
        })
        if(busca){
            return busca
        } else {
            return false
        }
    }

    async alteraNome({name}:IUsersRequestN, {token}:ITokenRequest){
        // verifica o token
        const retorno = await new TokenService().verificaToken({token})
        if (!retorno){ 
            throw new Error("Você não tem autorização")
        }

        // ERRO: campo é obrigatório
        if(!name){
            throw new Error("'name' é obrigatório")
        }

        // ERRO: name vazio
        name = name.trim()
        if(!name){
            throw new Error("Escreva alguma coisa em 'name'")
        }

        // SUCESSO
        const repository = this.repository
        const email = retorno.email
        await repository.update({email: email}, {name: name})
        return true
    }

    async alteraSenha({password}:IUsersRequestPW, {token}: ITokenRequest){
        // verifica o token
        const retorno = await new TokenService().verificaToken({token})
        if (!retorno){ 
            throw new Error(String("Você não tem autorização"))
        }

        // ERRO: campo obrigatório
        if(!password){
            throw new Error("'password' é obrigatório")
        }

        // hash de password
        password = await bcrypt.hash(password, await bcrypt.genSalt());

        // SUCESSO
        const repository = this.repository
        const email = retorno.email
        await repository.update({email: email}, {password: password})
        return true
    }

    async apagaUsuario({token}:ITokenRequest){
        // verifica o token
        const tokenService = new TokenService()
        const retorno = await tokenService.verificaToken({token})
        if (!retorno){ 
            throw new Error("Você não tem autorização")
        }

        // ERRO: tenta fazer logout da conta
        const apagado = await new TokenService().logoutFull({token})
        if (!apagado){ 
            throw new Error("Falha no banco de dados")
        }

        // SUCESSO
        const user_id = retorno.user_id
        await this.repository.delete({user_id: user_id})
            .catch(() => {
                throw new Error("Não foi possível excluir essa conta")
            })
        return true
    }
}