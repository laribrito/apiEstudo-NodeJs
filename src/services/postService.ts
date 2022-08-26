import { Equal } from "typeorm";
import { AppDataSource } from "../db_connection";
import { Posts } from "../entities/posts";
import { ITokenRequest, TokenService } from "./tokenService";

interface IPostRequest{
    description: string
}

interface IPostRequestFull{
    description: string
    post_id: number
}

interface IPostRequestId{
    post_id: string
}

export class PostService{
    repository = AppDataSource.getRepository(Posts)
    async criaPost({description}:IPostRequest, {token}:ITokenRequest){
        // verifica o token
        const user = await new TokenService().verificaToken({token})
        if (!user){ 
            throw new Error(String("Você não tem autorização"))
        }

        // ERRO: campo obrigatório
        if(!description){
            throw new Error("'description' é obrigatória")
        }

        // ERRO: description vazia
        description = description.trim()
        if(!description){
            throw new Error("Escreva alguma coisa em 'description'")
        }

        // SUCESSO
        const post = this.repository.create({description: description, user_id: user})
        await this.repository.save(post)
        return true
    }

    async editaPost({post_id, description}:IPostRequestFull, {token}:ITokenRequest){
        // verifica o token
        const user = await new TokenService().verificaToken({token})
        if (!user){ 
            throw new Error(String("Você não tem autorização"))
        }

        // ERRO: campos são obrigatórios
        if(!description){
            throw new Error("Nova 'description' é obrigatória")
        } else if(!post_id){
            throw new Error("'post_id' é obrigatória")
        }

        // ERRO: description vazia
        description = description.trim()
        if(!description){
            throw new Error("Escreva alguma coisa na nova 'description'")
        }

        // ERRO: não há post com esse id ou não pode editar
        const post = await this.repository.findOneBy({user_id: Equal(user.user_id), post_id: post_id})
        if(!post){
            throw new Error("Você não pode editar esse post ou ele não existe")
        }

        // SUCESSO
        await this.repository.update({post_id: post_id}, {description: description})
        return true
    }

    async pegaUmPost({post_id}:IPostRequestId, {token}: ITokenRequest) {
        // verifica o token
        const user = await new TokenService().verificaToken({token})
        if (!user){ 
            throw new Error(String("Você não tem autorização"))
        }

        // ERRO: campo obrigatório
        if(!post_id){
            throw new Error("'post_id' é obrigatório")
        }

        // ERRO: a informação não é um número
        const id = parseInt(post_id)
        if(id==NaN){
            throw new Error("'post_id' inválido")
        }

        // ERRO: não há post com esse id
        const post = await this.repository.findOneBy({post_id: id})
        if(!post){
            throw new Error("Esse post não existe")
        }

        // SUCESSO
        return post
    }

    async deletaUmPost({post_id}:IPostRequestId, {token}: ITokenRequest) {
        // verifica o token
        const user = await new TokenService().verificaToken({token})
        if (!user){ 
            throw new Error(String("Você não tem autorização"))
        }

        // ERRO: campo obrigatório
        if(!post_id){
            throw new Error("'post_id' é obrigatório")
        }

        // ERRO: a informação não é um número
        const id = parseInt(post_id)
        if(id==NaN){
            throw new Error("'post_id' inválido")
        }

        // ERRO: não há post com esse id ou esse post não é do usuário
        const post = await this.repository.findOneBy({post_id: id, user_id: Equal(user.user_id)})
        if(!post){
            throw new Error("Você não pode excluir esse post ou ele não existe")
        }

        // SUCESSO
        await this.repository.delete({post_id: id})
        return true
    }
}