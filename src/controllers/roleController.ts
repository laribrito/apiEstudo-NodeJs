import { Request, Response } from "express";
import { RoleService } from "../services/roleService";

export class RoleController{
    async insereFuncao(req: Request, res: Response){
        const {role_name} = req.body
        const roleService = new RoleService()
        const role = await roleService
            .novaRole({role_name})
            .catch((erro)=>{
                res
                    .status(422)
                    .json({
                        message: erro.message,
                        status: 1
                    })
                    .send()
            })
        return res.json({
            message: "Função criada com sucesso",
            status: 0,
            funcao: role
        })
    }

    async atualizaFuncao(req: Request, res: Response){
        const { id, role_name } = req.body
        const roleService = new RoleService()
        const roleAtualizada = await roleService
            .atualizaRole({id, role_name})
            .catch((erro)=>{
                res.status(422)
                .json({
                    message: erro.message,
                    status: 1
                })
                .send()
            })
        return res.json({
            message: "Função atualizada com sucesso",
            status: 0,
            funcaoAtualizada: roleAtualizada
        })
    }

    async pegaUmaFuncao(req: Request, res: Response){
        const roleService = new RoleService()
        const role_name = req.params.termoBusca
        const id = parseInt(role_name)
        if(id){
            // termo de busca é um número
            const role = await roleService
            .pegaUmaRolePeloId({id})
            .catch((erro)=>{
                res.json({
                    message: erro.message,
                    status: 1
                })
                .send()
            })
            return res.json({
                message: role,
                status: 0
            })
        } else {
            // termo de busca é um nome
            const role = await roleService
            .pegaUmaRolePeloNome({role_name})
            .catch((erro)=>{
                res.json({
                    message: erro.message,
                    status: 1
                })
                .send()
            })
            return res.json({
                message: role,
                status: 0
            })
        }
    }

    async apagaUmaFuncao(req: Request, res: Response){
        const roleService = new RoleService()
        const role_name = req.params.termoBusca
        const id = parseInt(role_name)
        if(id){
            // termo de busca é um número
            const acao = await roleService
                .apagaUmaRolePeloId({id})
                .catch(()=>{
                    res
                    .status(422)
                    .json({
                        message: "Algum erro teve",
                        status: 1
                    })
                    .send()
                })
            return res.json({
                message: acao,
                status: 0
            })
        } else {
            // termo de busca é um nome
            const acao = await roleService
                .apagaUmaRolePeloName({role_name})
                .catch(()=>{
                    res
                    .status(422)
                    .json({
                        message: "Algum erro teve",
                        status: 1
                    })
                    .send()
                })
            return res.json({
                message: acao,
                status: 0
            })
        }
    }
}