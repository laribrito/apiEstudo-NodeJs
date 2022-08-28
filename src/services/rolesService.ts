import { Roles } from "../entities/roles";
import { AppDataSource } from "../db_connection";
import { ITokenRequest, TokenService } from "./tokenService";
import { RoleService } from "./roleService";

export class RolesService{
    async retornaRoles({token}:ITokenRequest){
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

        const repository = AppDataSource.getRepository(Roles)
        const lista_roles = await repository.find()
        return lista_roles
    }
}