import { Request, Response } from "express" 
import { UsersService } from "../services/userService" 

export class UserController{
    async insereUser(req: Request, res: Response){
        const { name, email, password } = req.body 
        const userService = new UsersService() 
        const usuario = await userService
            .novoUsuario({name, email, password})
            .catch((erro) => {
                res
                  .status(422)
                  .json({
                    message: erro.message,
                  })
                  .send() 
              }) 
        return res.json(usuario) 
    }
}