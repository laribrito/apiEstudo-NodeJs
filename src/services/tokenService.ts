import { AppDataSource } from "../db_connection";
import { Tokens } from "../entities/tokens";
import { UserService } from "./userService";
import * as bcrypt from 'bcrypt';
import { jwt } from "..";

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
        const busca = await userService.buscaUsuarioPeloEmail({email});
        if(!busca.encontrado){
            throw new Error("Erro de autenticação")
        }

        // ERRO: senhas não coincidem
        if(!await bcrypt.compare(password, String(busca.user?.password))) {
            throw new Error("Erro de autenticação")
        }

        // SUCESSO
        const user_id = Number(busca.user?.user_id)
        const token = String(jwt.sign({ user_id }, process.env.SECRET)); //Gera o token com base no user_id e na chave SECRET
        const dadosToken = this.repository.create({token: token, user_id: busca.user});
        await this.repository.save(dadosToken);
        return token
    }

    async logout({token}: ITokenRequest){
        // verifica o token
        const retorno = await this.verificaToken({token})
        if (!retorno){ 
            throw new Error(String("Falha na autenticação"))
        }
    
        // SUCESSO
        await this.repository.delete({token})    
        return {saiu: true}
    }

    async verificaToken({token}:ITokenRequest){
        // ERRO: token é obrigatório
        if(!token){
            return false
        }

        // ERRO: token não é válido
        const resultado = await this.repository.find()
        if(!resultado.length){
            return false
        } else {
            // busca o user associado
            const decoded= await jwt.verify(token, process.env.SECRET)
            const user_id = decoded.user_id
            const busca = await new UserService().buscaUsuarioPeloId({user_id});
            // tratar a busca
            const user = busca.user!=undefined?busca.user[0]:'';
            return user
        }
    }
}