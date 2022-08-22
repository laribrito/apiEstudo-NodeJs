import { Request, Response } from "express" 
import { UserService } from "../services/userService" 

export class UserController{
    async insereUser(req: Request, res: Response){
        const { name, email, password, role_id } = req.body 
        const usuario = await new UserService() 
            .novoUsuario({name, email, password, role_id})
            .catch((erro) => {
                return res.status(422).json({message: erro.message, status: 1})
            }) 
        return res.json({message: usuario, status: 0}) 
    }

    async buscaUsuarioPeloId(req: Request, res: Response){
        const termoBusca = req.params.termoBusca
        const user_id = parseInt(termoBusca)
        const token = req.headers['authorization']
        if (!token) return res.status(401).json({ message: "'token' é necessário", status: 1 });
        if(!user_id){
            // user_id é um NaN
            return res.json({message: false,status: 0})
        } else {
            // user_id é um Number
            const busca = await new UserService() 
                .buscaUsuarioPeloId({user_id}, {token})
                .catch((erro)=>{
                    res.status(422).json({message: erro.message, status: 1})
                });
            return res.json({message: busca, status: 0})
        }
    }

    async atualizaNome(req: Request, res: Response){
        const { name } = req.body
        const token = req.headers['authorization']
        if (!token) return res.status(401).json({ message: "'token' é necessário", status: 1 });
        const userAtualizado = await new UserService()
            .alteraNome({name}, {token})
            .catch((erro)=>{
                return res.status(422).json({ message: erro.message, status: 1})
            })
        return res.json({message: userAtualizado, status: 0})
    }

    async atualizaSenha(req: Request, res: Response){
        const { password } = req.body
        const token = req.headers['authorization']
        if (!token) return res.status(401).json({ message: "'token' é necessário", status: 1 });
        const userAtualizado = await new UserService()
            .alteraSenha({password}, {token})
            .catch((erro)=>{
                return res.status(422).json({ message: erro.message, status: 1})
            })
        return res.json({message: userAtualizado, status: 0}) 
    }

    async apagaUser(req: Request, res: Response){
        const token = req.headers['authorization']
        if (!token) return res.status(401).json({ message: "'token' é necessário", status: 1 });
        const busca = await new UserService() 
            .apagaUsuario({token})
            .catch((erro) => {
                return res.status(422).json({message: erro.message, status: 1})
            })
        return res.json({message: busca, status: 0})
    }
}