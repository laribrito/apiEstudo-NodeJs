import { equal } from "assert";
import { userInfo } from "os";
import { Equal, Raw } from "typeorm";
import { AppDataSource } from "../db_connection";
import { Activities } from "../entities/activities";
import { ITokenRequest, TokenService } from "./tokenService";

export class ActivitiesService{
    repository = AppDataSource.getRepository(Activities)
    async allActivities({token}:ITokenRequest){
        // verifica o token
        const user = await new TokenService().verificaToken({token})
        if (!user){ 
            throw new Error(String("Você não tem autorização"))
        }

        // SUCESSO
        const activities = this.repository.find()
            .catch(() => {
                throw new Error("Houve um erro no banco de dados")
            })
        return activities
    }
    
    async activitiesDoUserLogado({token}:ITokenRequest){
        // verifica o token
        const retorno = await new TokenService().verificaToken({token})
        if (!retorno){ 
            throw new Error(String("Você não tem autorização"))
        }
        // SUCESSO
        const activities = await this.repository.find({relations: {user: true},
            where: {
                user: {
                    user_id: retorno.user_id
                },
            }
        })
        return activities
    }
}