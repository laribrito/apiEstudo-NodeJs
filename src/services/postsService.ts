import { Equal } from "typeorm";
import { AppDataSource } from "../db_connection";
import { Posts } from "../entities/posts";
import { ITokenRequest, TokenService } from "./tokenService";

interface IPostsRequestUser{
    user_id: string
}

export class PostsService{
    repository = AppDataSource.getRepository(Posts)
    async todosPosts({token}:ITokenRequest){
        // verifica o token
        const user = await new TokenService().verificaToken({token})
        if (!user){ 
            throw new Error(String("Você não tem autorização"))
        }

        // SUCESSO
        const post = this.repository.find()
            .catch(() => {
                throw new Error("Houve um erro no banco de dados")
            })
        return post
    }
    
    async postsDeUmUsuario({user_id}:IPostsRequestUser, {token}:ITokenRequest){
        // verifica o token
        const user = await new TokenService().verificaToken({token})
        if (!user){ 
            throw new Error(String("Você não tem autorização"))
        }

        // ERRO: campo obrigatório
        if(!user_id){
            throw new Error("'user_id' é obrigatório")
        }

        // ERRO: user_id não é um número
        const id = parseInt(user_id)
        if(id==NaN){
            throw new Error("Usuário não encontrado")
        }

        // SUCESSO
        const posts = await this.repository.findBy({user_id: Equal(id)})
        return posts
    }
    
    async postsDoUserLogado({token}: ITokenRequest) {
        // verifica o token
        const user = await new TokenService().verificaToken({token})
        if (!user){ 
            throw new Error(String("Você não tem autorização"))
        }

        // SUCESSO
        const posts = await this.repository.findBy({user_id: Equal(user.user_id)})
        return posts
    }
}