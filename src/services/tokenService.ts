import { AppDataSource } from "../db_connection";
import { Tokens } from "../entities/tokens";
import { UserService } from "./userService";
import * as bcrypt from 'bcrypt';
import { jwt } from "..";
import { threadId } from "worker_threads";
import { Equal } from "typeorm";

interface IAuthRequest{
    email: string
    password: string
}

export interface ITokenRequest{
    token: string
}

export class TokenService{
    repository = AppDataSource.getRepository(Tokens)
    async login({email, password}: IAuthRequest){
        // ERRO: campos são obrigatórios
        if(!email){
            throw new Error("'email' é obrigatório")
        } else if(!password){
            throw new Error("'password' é obrigatória")
        }
        
        // ERRO: não existe usuario com esse email
        const userService = new UserService()
        const retorno = await userService.buscaUsuarioPeloEmail({email});
        if(!retorno){
            throw new Error("Erro de autenticação")
        }
        const user = retorno[0]

        // ERRO: senhas não coincidem
        if(!await bcrypt.compare(password, String(user.password))) {
            throw new Error("Erro de autenticação")
        }

        // SUCESSO
        const token = String(jwt.sign({ email }, process.env.SECRET)); //Gera o token com base no email e na chave SECRET
        const dadosToken = this.repository.create({token: token, user_id: user});
        await this.repository.save(dadosToken);
        return token
    }

    async logout({token}: ITokenRequest){
        // verifica o token
        const retorno = await this.verificaToken({token})
        if (!retorno){ 
            throw new Error(String("Você não tem autorização"))
        }
    
        // SUCESSO
        await this.repository.delete({token: token})    
        return {saiu: true}
    }

    async verificaToken({token}:ITokenRequest){
        // ERRO: token é obrigatório
        if(!token){
            return false
        }

        // ERRO: token não é válido
        const resultado = await this.repository.findBy({token: token})
        if(!resultado.length){
            return false
        } 

        // busca o user associado
        const decoded= await jwt.verify(token, process.env.SECRET)
        const email = String(decoded.email)
        var user = await new UserService().pegaUsuarioPeloEmail({email});
        return user
    }

    async logoutFull({token}:ITokenRequest){
        const retorno = await this.verificaToken({token})
        if(!retorno){
            return false
        }
        
        await this.repository.delete({ user_id: Equal(retorno.user_id)})
            .catch((erro) => {
                return false
            })
        return true

    }
}