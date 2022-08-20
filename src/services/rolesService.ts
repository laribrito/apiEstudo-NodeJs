import { Roles } from "../entities/roles";
import { AppDataSource } from "../db_connection";

export class RolesService{
    async retornaRoles(){
        const repository = AppDataSource.getRepository(Roles)
        const lista_roles = await repository.find()
        return lista_roles
    }
}