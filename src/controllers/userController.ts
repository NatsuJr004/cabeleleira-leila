import { User } from '../models/modelUser';
import Database from '../database/configDB';
import { createHash, compareHash } from '../utils/hash';
import jwt from 'jsonwebtoken';

class UserController{
    async createUser(req, res){
        const { name, email, password } = req.body;
        
        try{
            const newUser = new User();
            newUser.name = name;
            newUser.isAdmin = false;
            newUser.email = email;
            
            const hashPassowd = await createHash(password);
            
            if(!hashPassowd[0]){
                console.log(hashPassowd[1]);
                return  res.status(500).json({message: 'error!'}); 
            }
            
            newUser.password = hashPassowd[1];
            
            const userRepository = (await Database).getRepository(User);
            await userRepository.save(newUser);
            return res.status(200).json({message: 'success!'});
        }catch(err){
            
            console.log(err);
            return  res.status(500).json({message: 'error!'});
        }

    }

    async loginUser(req, res){
        const { email, password } = req.body;

        try{
            const userRepository = (await Database).getRepository(User);
            const user = await userRepository.findOneBy({email: email});
            
            if(user == null){
                return res.status(401).json({message: 'Invalid ail or password!'});
            }

            if(!await compareHash(password, user.password)){
                return res.status(401).json({message: 'Invalid ail or password!'});
            }

            await jwt.sign(
                {
                    id: user.id,
                    name: user.name,
                    isAdmin: user.isAdmin
                },
                process.env.JWT_KEY,
                { expiresIn: '24h' },
                (err, token) => {
                    if(err){
                        return res.status(500).json({message: 'Error in server!'});
                    }
                    return res.status(200).json({
                            message: 'success',
                            token: token
                        })
                }
            )
        }catch(err){

            console.log(err);
            return  res.status(500).json({message: 'error!'});
        }
    }

    async readAllUsers(req, res){
        try{
            const userRepository = (await Database).getRepository(User);
            const allUsers = await userRepository.find({
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            });

            return res.status(200).json({res: allUsers});
        }catch(err){

            console.log(err);
            return  res.status(500).json({message: 'error!'});
        }
    }

    async updateUser(req, res){
        const { id, isAdmin } = req.body;

        if(!req.userReq.isAdmin){
            return res.status(401).json({message: 'Unauthorized'});
        }

        try{
            const userRepository = (await Database).getRepository(User);
            const userUpdate = await userRepository.findOneBy({
                id: id
            })

            if(userUpdate == null){
                return res.status(404).json({message: 'user not found'})
            }
            
            userUpdate.isAdmin = isAdmin;

            await userRepository.save(userUpdate);
            return res.status(200).json({message: 'changed data'});
        }catch(err){

            console.log(err);
            return res.status(500).json({message: 'error'});
        }
    }

    async editDataUser(req, res){
        const { id, name, email } = req.body;

        if(id != req.userReq.id){
            return res.status(401).json({message: 'Unauthorized'})
        }

        try{
            const userRepository = (await Database).getRepository(User);
            const userUpdate = await userRepository.findOneBy({
                id: id
            })

            if(userUpdate == null){
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
        if(!req.userReq.isAdmin){
            return res.status(401).json({message: 'Unauthorized'})
        }

        try{
            const userRepository = (await Database).getRepository(User);
            const userRemove = await userRepository.findOneBy({id: req.body.id});

            if(userRemove == null){
                return res.status(404).json({message: 'user not found'});
            }

            await userRepository.remove(userRemove);
            return res.status(200).json({message: 'success'})
        }catch(err){

            console.log(err);
            res.status(500).json({message: 'error'});
        }
    }
}
export default new UserController();