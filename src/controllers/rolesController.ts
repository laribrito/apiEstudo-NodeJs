import { Request, Response } from "express";
import { RolesService } from "../services/rolesService";

export class RolesController{
    async retornaTodasRoles(req: Request, res: Response){
        const token = req.headers["authorization"]
        if (!token) return res.status(401).json({ message: "'token' é necessário", status: 1 });
        const lista_roles = await new RolesService() 
                .retornaRoles({token})
                .catch((erro)=>{
                    return res.status(422).json({message: erro.message, status: 1})
                })
        return res.json({message: lista_roles,status: 0})
    }
}