import { Like } from "typeorm";
import { AppDataSource } from "../db_connection";
import { Users } from "../entities/users";
import { ITokenRequest, TokenService } from "./tokenService";

interface IUsersRequestBusca{
    termoBusca: string
}

export class UsersService{
    async retornaUsuarios({token}:ITokenRequest) {
        // verifica o token
        const retorno = await new TokenService().verificaToken({token})
        if (!retorno){ 
            throw new Error("Você não tem autorização")
        }

        // SUCESSO
        const busca = await AppDataSource.getRepository(Users).find({
            select: 
                {user_id:true, name: true, email:true, created_at:true}
        })
        return busca
    }

    async buscaUsuarios({termoBusca}:IUsersRequestBusca, {token}:ITokenRequest){
        // verifica o token
        const retorno = await new TokenService().verificaToken({token})
        if (!retorno){ 
            throw new Error("Você não tem autorização")
        }

        // SUCESSO
        const repository = AppDataSource.getRepository(Users)
        const resultado = repository.find({
            select: 
                {user_id:true, name: true, email:true, created_at:true}, 
            where: [
                {name: Like(`%${termoBusca}%`)},
                {email: Like(`%${termoBusca}%`)}
            ]
        })
        return resultado
    }
}