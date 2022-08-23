import { User } from '../models/modelUser';
import Database from '../database/configDB';

class UserController{
    async createUser(req, res){
        const { name, isAdmin, email, password } = req.body;
        
        const newUser = new User();
        newUser.name = name;
        newUser.isAdmin = isAdmin;
        newUser.email = email;
        newUser.password = password;

        try{
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