import { Router } from "express";
import { RoleController } from "./controllers/roleController";
import { UserController } from "./controllers/userController";
import { RolesController } from "./controllers/rolesController";
import { UsersController } from "./controllers/usersController";
import { TokenController } from "./controllers/tokenController";

const rotas = Router();
const tokenController= new TokenController();
const userController= new UserController();
const usersController= new UsersController();
const roleController= new RoleController();
const rolesController= new RolesController();

rotas.get('/', (_request, res) => {
    res.json({
        message: 'Hello World!'
    });
});

// Autenticação (token)
rotas.post("/login", tokenController.auth)
rotas.post("/logout", tokenController.logout)

// Users
rotas.post("/user", userController.insereUser);
rotas.post("/user/put-n", userController.atualizaNome);
rotas.post("/user/put-pw", userController.atualizaSenha);
rotas.post("/user/delete", userController.apagaUser);
rotas.get("/user/:termoBusca", userController.buscaUsuarioPeloId);
rotas.get("/users/:termoBusca", usersController.buscaUsuarios);
rotas.get("/users", usersController.retornaTodosUsers);

// Roles
rotas.post("/role", roleController.insereFuncao)
rotas.post("/role/put", roleController.atualizaFuncao)
rotas.get("/roles", rolesController.retornaTodasRoles)
rotas.get("/role/:termoBusca", roleController.pegaUmaFuncao)
rotas.get("/role/delete/:termoBusca", roleController.apagaUmaFuncao)

export {rotas};