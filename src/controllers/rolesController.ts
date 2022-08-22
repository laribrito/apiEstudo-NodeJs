import { Request, Response } from "express";
import { RolesService } from "../services/rolesService";

export class RolesController{
    async retornaTodasRoles(req: Request, res: Response){
        const lista_roles = await new RolesService() 
                .retornaRoles()
                .catch((erro)=>{
                    return res.status(422).json({message: erro.message, status: 1})
                })
        return res.json({message: lista_roles,status: 0})
    }
}