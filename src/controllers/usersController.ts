import { UsersService } from "../services/usersService";
import { Request, Response } from "express";

export class UsersController{
    async retornaTodosUsers(req: Request, res: Response){
        const token = req.headers['authorization']
        if (!token) return res.status(401).json({ message: "'token' é necessário", status: 1 });
        const lista_users = await new UsersService()
                .retornaUsuarios({token})
                .catch((erro)=>{
                    return res.json({message: erro.message, status: 1})
                })
        return res.json({message: lista_users,status: 0})
    }

    async buscaUsuarios(req: Request, res: Response){
        const termoBusca = req.params.termoBusca
        const token = req.headers['authorization']
        if (!token) return res.status(401).json({ message: "'token' é necessário", status: 1 });
        const lista_users = await new UsersService()
                .buscaUsuarios({termoBusca}, {token})
                .catch((erro)=>{
                    return res.json({message: erro.message, status: 1})
                })
        return res.json({message: lista_users, status: 0})
    }
}