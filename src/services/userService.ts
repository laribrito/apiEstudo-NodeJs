import { Users } from '../entities/users' 
import { AppDataSource } from './../db_connection' 

interface IUsersRequest{
    name: string 
    email: string 
    password: string 
}

export class UsersService{
    async novoUsuario({name, email, password}:IUsersRequest){
        const repository = AppDataSource.getRepository(Users) 
        // ERRO: todos os campos são obrigatórios
        if(!name){
            throw new Error('Nome é obrigatório') 
        } else if(!email){
            throw new Error('Email é obrigatório') 
        } else if(!password){
            throw new Error('Senha é obrigatória') 
        }

        // ERRO: esse usuario já existe
        const busca = await repository.findOne({where: {email: email}})
        if(busca){
            throw new Error('Esse usuário já existe. Cadastre um outro email') 
        }
        
        // SUCESSO
        const user = repository.create({name, email, password}) 
        await repository.save(user) 
        return user 
    }   
}