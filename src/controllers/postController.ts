import { Request, Response } from "express";
import { PostService } from "../services/postService";

export class PostController{
    async criaPost(req: Request, res: Response){
        const {description} = req.body
        const token = req.headers["authorization"]
        if (!token) return res.status(401).json({ message: "'token' é necessário", status: 1 });
        const retorno = await new PostService()
            .criaPost({description}, {token})
            .catch((erro) => {
                return res.status(422).json({message: erro.message, status: 1})
            })
        return res.json({message: retorno, status:0})
    }

    async editarPost(req: Request, res: Response){
        const {post_id, description} = req.body
        const token = req.headers["authorization"]
        if (!token) return res.status(401).json({ message: "'token' é necessário", status: 1 });
        const retorno = await new PostService()
            .editaPost({post_id, description}, {token})
            .catch((erro) => {
                return res.status(422).json({message: erro.message, status: 1})
            })
        return res.json({message: retorno, status: 0})
    }

    async pegaUmPost(req: Request, res: Response){
        const post_id = req.params.post_id
        const token = req.headers["authorization"]
        if (!token) return res.status(401).json({ message: "'token' é necessário", status: 1 });
        const retorno = await new PostService()
            .pegaUmPost({post_id}, {token})
            .catch((erro) => {
                return res.status(422).json({message: erro.message, status: 1})
            })
        return res.json({message: retorno, status: 0})
    }

    async apagaUmPost(req: Request, res: Response){
        const post_id = req.params.post_id
        const token = req.headers["authorization"]
        if (!token) return res.status(401).json({ message: "'token' é necessário", status: 1 });
        const retorno = await new PostService()
            .deletaUmPost({post_id}, {token})
            .catch((erro) => {
                return res.status(422).json({message: erro.message, status: 1})
            })
        return res.json({message: retorno, status: 0})
    }
}