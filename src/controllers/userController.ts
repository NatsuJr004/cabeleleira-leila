import { User } from '../models/modelUser';
import Database from '../database/configDB';
import { createHash } from '../utils/hash';

class UserController{
    async createUser(req, res){
        const { name, isAdmin, email, password } = req.body;
        
        try{
            const newUser = new User();
            newUser.name = name;
            newUser.isAdmin = isAdmin;
            newUser.email = email;
            
            const hashPassowd = await createHash(password);
            
            if(!hashPassowd[0]){
                console.log(hashPassowd[1]);
                return  res.status(500).json({message: 'error!'}); 
            }
            
            newUser.password = hashPassowd[1];
            
            const userRepository = (await Database).getRepository(User);
            await userRepository.save(newUser);
            return res.status(200).json({message: 'funcionou!'});
        }catch(err){
            
            console.log(err);
            return  res.status(500).json({message: 'error!'});
        }

    }

    async readAllUsers(req, res){
        try{
            const userRepository = (await Database).getRepository(User);
            const allUsers = await userRepository.find();

            return res.status(200).json({res: allUsers});
        }catch(err){

            console.log(err);
            return  res.status(500).json({message: 'error!'});
        }
    }

    async updateUser(req, res){
        const { id, name, email } = req.body;

        try{
            const userRepository = (await Database).getRepository(User);
            const userUpdate = await userRepository.findOneBy({
                id: id
            })

            if(userUpdate == null){
                console.log('usuario não encontrado!');
                return res.status(404).json({message: 'user not found'})
            }
            
            userUpdate.name = name;
            userUpdate.email = email;

            await userRepository.save(userUpdate);
            return res.status(200).json({message: 'changed data'});
        }catch(err){

            console.log(err);
            return res.status(500).json({message: 'error'});
        }
    }

    async readUser(req, res){
        try{
            const userRepository = (await Database).getRepository(User);
            const user = await userRepository.findOneBy({
                id: req.params.id
            })

            if(user == null){
                return res.status(404).json({message: 'user not found!'});
            }

            return res.status(200).json({res: user});
        }catch(err){
            console.log(err);
            return res.status(500).json({message: 'error'});
        }
    }

    async deleteUser(req, res){
        try{
            const userRepository = (await Database).getRepository(User);
            const userRemove = await userRepository.findOneBy({id: req.body.id});
            await userRepository.remove(userRemove);
            return res.status(200).json({message: 'success'})
        }catch(err){

            console.log(err);
            res.status(500).json({message: 'error'});
        }
    }
}
export default new UserController();