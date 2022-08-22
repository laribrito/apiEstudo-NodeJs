import { Request, Response } from "express";
import { TokenService } from "../services/tokenService";

export class TokenController{
    async auth(req: Request, res: Response){
        const { password, email } = req.body
        const token = await new TokenService()
            .login({email, password})
            .catch((erro)=>{
                return res.status(422).json({message: erro.message, status: 1}).send()
            })
        return res.json({message: token, status: 0})
    }

    async logout(req: Request, res: Response){
        const token = req.headers['authorization']
        if (!token) return res.status(401).json({ message: "'token' é necessário", status: 1 });
        const resposta = await new TokenService()
            .logout({token})
            .catch((erro)=>{
                return res.status(422).json({message: erro.message, status: 1}).send()
            })
        return res.json({message: resposta, status: 0})
    }
}