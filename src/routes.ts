import { Router } from "express";
import { RoleController } from "./controllers/roleController";
import { UserController } from "./controllers/userController";
import { RolesController } from "./controllers/rolesController";

const rotas = Router();
const usersController= new UserController();
const roleController= new RoleController();
const rolesController= new RolesController();

rotas.get('/', (_request, res) => {
    res.json({
        message: 'Hello World!'
    });
});

// Users
rotas.post("/novo-usuario", usersController.insereUser);
rotas.get("/usuarios", (_request, res)=>{
    res.json({
        message: 'retorna todos os usuarios'
    });
});

// Roles
rotas.post("/nova-funcao", roleController.insereFuncao)
rotas.post("/atualiza-funcao", roleController.atualizaFuncao)
rotas.get("/funcoes", rolesController.retornaTodasRoles)
rotas.get("/funcao/:termoBusca", roleController.pegaUmaFuncao)
rotas.get("/apaga-funcao/:termoBusca", roleController.apagaUmaFuncao)

export {rotas};