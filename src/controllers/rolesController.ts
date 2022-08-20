import { Request, Response } from "express";
import { RolesService } from "../services/rolesService";

export class RolesController{
    async retornaTodasRoles(req: Request, res: Response){
        const rolesService = new RolesService()
        const lista_roles = await rolesService 
                .retornaRoles()
                .catch(()=>{
                    res.json({
                        message: "Algum problema houve",
                        status: 1
                    })
                    .send()
                })
        return res.json({
            lista: lista_roles,
            status: 0
        })
    }
}