import { Router } from "express";
import { RoleController } from "./controllers/roleController";
import { UserController } from "./controllers/userController";
import { RolesController } from "./controllers/rolesController";
import { UsersController } from "./controllers/usersController";
import { TokenController } from "./controllers/tokenController";
import { PostController } from "./controllers/postController";
import { PostsController } from "./controllers/postsController";
import { ActivityController } from "./controllers/activityController";
import { ActivitiesController } from "./controllers/activitiesController";

const rotas = Router();
const tokenController= new TokenController();
const userController= new UserController();
const usersController= new UsersController();
const roleController= new RoleController();
const rolesController= new RolesController();
const postController = new PostController();
const postsController = new PostsController();
const actvController = new ActivityController();
const actvsController = new ActivitiesController();

rotas.get('/', (_request, res) => {
    res.json({
        message: 'Hello World!'
    });
});

// Autenticação (token)
rotas.post("/login", tokenController.auth)
rotas.delete("/logout", tokenController.logout)

// Users
rotas.post("/user", userController.insereUser);
rotas.put("/user/put-n", userController.atualizaNome);
rotas.put("/user/put-pw", userController.atualizaSenha);
rotas.delete("/user/delete", userController.apagaUser);
rotas.get("/user/:termoBusca", userController.buscaUsuarioPeloId);
rotas.get("/users/:termoBusca", usersController.buscaUsuarios);
rotas.get("/users", usersController.retornaTodosUsers);

// Roles
rotas.post("/role", roleController.insereFuncao)
rotas.put("/role/put", roleController.atualizaFuncao)
rotas.get("/roles", rolesController.retornaTodasRoles)
rotas.get("/role/:termoBusca", roleController.pegaUmaFuncao)
rotas.delete("/role/delete/:termoBusca", roleController.apagaUmaFuncao)

// Posts
rotas.post("/post", postController.criaPost)
rotas.put("/post/put", postController.editarPost)
rotas.get("/post/:post_id", postController.pegaUmPost)
rotas.delete("/post/delete/:post_id", postController.apagaUmPost)
rotas.get("/posts/all", postsController.retornaTodosOsPosts)
rotas.get("/posts/:user_id", postsController.retornaPostsDeUmUser)
rotas.get("/posts/", postsController.retornaPostsUserLogado)

// Activities
rotas.post("/activity", actvController.criaActivity)
rotas.put("/activity/put/description", actvController.editaActivityDescription)
rotas.put("/activity/put/date", actvController.editaActivityDueDate)
rotas.get("/activity/:activity_id", actvController.pegaUmaActivity)
rotas.delete("/activity/:activity_id", actvController.apagaUmaActivity)
rotas.get("/activities/all", actvsController.retornaAllActivities)
rotas.get("/activities/", actvsController.retornaActivitiesUserLogado)

export {rotas};