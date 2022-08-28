import { Request, Response } from "express";
import { ActivitiesService } from "../services/activitiesService";

export class ActivitiesController{
    async retornaAllActivities(req: Request, res: Response){
        const token = req.headers["authorization"]
        if (!token) return res.status(401).json({ message: "'token' é necessário", status: 1 });
        const retorno = await new ActivitiesService()
            .allActivities({token})
            .catch((erro) => {
                return res.status(422).json({message: erro.message, status: 1})
            })
        return res.json({message: retorno, status:0})
    }
    
    async retornaActivitiesUserLogado(req: Request, res: Response){
        const token = req.headers["authorization"]
        if (!token) return res.status(401).json({ message: "'token' é necessário", status: 1 });
        const retorno = await new ActivitiesService()
            .activitiesDoUserLogado({token})
            .catch((erro) => {
                return res.status(422).json({message: erro.message, status: 1})
            })
        return res.json({message: retorno, status: 0})
    }
}