import { Request, Response } from "express";
import { ActivityService } from "../services/activityService";

export class ActivityController{
    async criaActivity(req: Request, res: Response){
        const {value, description, due_date, users_id} = req.body
        const token = req.headers["authorization"]
        if (!token) return res.status(401).json({ message: "'token' é necessário", status: 1 });
        const retorno = await new ActivityService()
            .setNewActivity({value, description, due_date, users_id}, {token})
            .catch((erro) => {
                return res.status(422).json({message: erro.message, status: 1})
            })
        return res.json({message: retorno, status:0})
    }
    
    async editaActivityDescription(req: Request, res: Response){
        const {activity_id, description} = req.body
        const token = req.headers["authorization"]
        if (!token) return res.status(401).json({ message: "'token' é necessário", status: 1 });
        const retorno = await new ActivityService()
            .editDescription({activity_id, description}, {token})
            .catch((erro) => {
                return res.status(422).json({message: erro.message, status: 1})
            })
        return res.json({message: retorno, status: 0})
    }

    async editaActivityDueDate(req: Request, res: Response){
        const {activity_id, due_date} = req.body
        const token = req.headers["authorization"]
        if (!token) return res.status(401).json({ message: "'token' é necessário", status: 1 });
        const retorno = await new ActivityService()
            .editDueDate({activity_id, due_date}, {token})
            .catch((erro) => {
                return res.status(422).json({message: erro.message, status: 1})
            })
        return res.json({message: retorno, status: 0})
    }
    
    async pegaUmaActivity(req: Request, res: Response){
        const activity_id = parseInt(req.params.activity_id)
        const token = req.headers["authorization"]
        if (!token) return res.status(401).json({ message: "'token' é necessário", status: 1 });
        const retorno = await new ActivityService()
            .getActivity({activity_id}, {token})
            .catch((erro) => {
                return res.status(422).json({message: erro.message, status: 1})
            })
        return res.json({message: retorno, status: 0})
    }

    async apagaUmaActivity(req: Request, res: Response){
        const activity_id = parseInt(req.params.activity_id)
        const token = req.headers["authorization"]
        if (!token) return res.status(401).json({ message: "'token' é necessário", status: 1 });
        const retorno = await new ActivityService()
            .deletaUmaActivity({activity_id}, {token})
            .catch((erro) => {
                return res.status(422).json({message: erro.message, status: 1})
            })
        return res.json({message: retorno, status: 0})
    }
}