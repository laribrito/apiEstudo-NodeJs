import { Request, Response } from "express";
import { PostsService } from "../services/postsService";

export class PostsController{
    async retornaTodosOsPosts(req: Request, res: Response){
        const token = req.headers["authorization"]
        if (!token) return res.status(401).json({ message: "'token' é necessário", status: 1 });
        const retorno = await new PostsService()
            .todosPosts({token})
            .catch((erro) => {
                return res.status(422).json({message: erro.message, status: 1})
            })
        return res.json({message: retorno, status:0})
    }

    
    async retornaPostsDeUmUser(req: Request, res: Response){
        const user_id = req.params.user_id
        const token = req.headers["authorization"]
        if (!token) return res.status(401).json({ message: "'token' é necessário", status: 1 });
        const retorno = await new PostsService()
            .postsDeUmUsuario({user_id}, {token})
            .catch((erro) => {
                return res.status(422).json({message: erro.message, status: 1})
            })
        return res.json({message: retorno, status: 0})
    }
    
    async retornaPostsUserLogado(req: Request, res: Response){
        const token = req.headers["authorization"]
        if (!token) return res.status(401).json({ message: "'token' é necessário", status: 1 });
        const retorno = await new PostsService()
            .postsDoUserLogado({token})
            .catch((erro) => {
                return res.status(422).json({message: erro.message, status: 1})
            })
        return res.json({message: retorno, status: 0})
    }
}