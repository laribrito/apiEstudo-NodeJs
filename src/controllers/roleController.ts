import { Request, Response } from "express";
import { RoleService } from "../services/roleService";

export class RoleController{
    async insereFuncao(req: Request, res: Response){
        const {role_name} = req.body
        const roleService = new RoleService()
        const role = await roleService
            .novaRole({role_name})
            .catch((erro)=>{
                return res.status(422).json({message: erro.message, status: 1})
            })
        return res.json({message: role, status: 0})
    }

    async atualizaFuncao(req: Request, res: Response){
        const { role_id, role_name } = req.body
        const roleService = new RoleService()
        const roleAtualizada = await roleService
            .atualizaRole({role_id, role_name})
            .catch((erro)=>{
                return res.status(422).json({message: erro.message, status: 1})
            })
        return res.json({message: roleAtualizada, status: 0})
    }

    async pegaUmaFuncao(req: Request, res: Response){
        const roleService = new RoleService()
        const role_name = req.params.termoBusca
        const role_id = parseInt(role_name)
        if(role_id){
            // termo de busca é um número
            const role = await roleService
            .pegaUmaRolePeloId({role_id})
            .catch((erro)=>{
                return res.json({message: erro.message, status: 1})
            })
            return res.json({message: role, status: 0})
        } else {
            // termo de busca é um nome
            const role = await roleService
            .pegaUmaRolePeloNome({role_name})
            .catch((erro)=>{
                return res.json({message: erro.message, status: 1})
            })
            return res.json({message: role, status: 0})
        }
    }

    async apagaUmaFuncao(req: Request, res: Response){
        const roleService = new RoleService()
        const role_name = req.params.termoBusca
        const role_id = parseInt(role_name)
        if(role_id){
            // termo de busca é um número
            const acao = await roleService
                .apagaUmaRolePeloId({role_id})
                .catch((erro)=>{
                    return res.json({message: erro.message, status: 1})
                })
                return res.json({message: acao, status: 0})
        } else {
            // termo de busca é um nome
            const acao = await roleService
                .apagaUmaRolePeloName({role_name})
                .catch((erro)=>{
                    return res.json({message: erro.message, status: 1})
                })
                return res.json({message: acao, status: 0})
        }
    }
}