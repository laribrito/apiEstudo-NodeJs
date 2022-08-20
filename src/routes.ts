import { Router } from "express";
import { UserController } from "./controllers/userController";

const rotas = Router();
const userController= new UserController();

rotas.get('/', (_request, res) => {
    res.json({
        message: 'Hello World!'
    });
});

rotas.post("/novo-usuario", userController.insereUser);
rotas.get("/usuarios", (_request, res)=>{
    res.json({
        message: 'retorna todos os usuarios'
    });
});

// rotas.post("/", (_request, res)=> {
//     const { nome } = _request.body;
//     console.log(nome);
//     console.log("-----------------------");
//     return res.json(nome);
    
// })

export {rotas};