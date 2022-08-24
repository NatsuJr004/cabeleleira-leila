import { Scheduling } from '../models/modelScheduling';
import Database from '../database/configDB';
import { createHash } from '../utils/hash';
import { off } from 'process';
// import { createQueryBuilder } from 'typeorm';

class SchedulingController{
    async createScheduling(req, res){
        const { idUser, title, description} = req.body;
        try{
            const scheduling = new Scheduling();
            scheduling.title = title;
            scheduling.description = description;
            scheduling.serviceStatus = "pending";
            scheduling.user = idUser;

            const schedulingRepository = (await Database).getRepository(Scheduling);
            await schedulingRepository.save(scheduling);

            res.status(200).json({message: 'appointment made!'});
        }catch(err){

            console.log(err);
            res.status(500).json({message: 'error!'});
        }
    }

    async readAllScheduling(req, res){
        try{
            const schedulingRepository = await (await Database).getRepository(Scheduling)
            const allScheduling = await schedulingRepository.find({
                relations: {
                    user: true
                },
                select: {
                    user: {
                        id: true,
                        name: true,
                        email: true, 
                    }
                }
            })

            res.status(200).json({res: allScheduling});
        }catch(err){

            console.log(err);
            res.status(500).json({message: 'error!'});
        }
    }

    async updateScheduling(req, res){
        const {idScheduling, serviceStatus} = req.body;

        try{
            const schedulingRepository = await (await Database).getRepository(Scheduling)
            const schedulingUpdate = await schedulingRepository.findOneBy({ id: idScheduling });

            if(schedulingUpdate == null){
                return res.status(404).json({message: 'scheduling not found'})
            }
            
            schedulingUpdate.serviceStatus = serviceStatus;

            await schedulingRepository.save(schedulingUpdate);

            return res.status(200).json({message: 'success'})
        }catch(err){

            console.log(err);
            res.status(500).json({message: 'error!'});
        }
    }

    async deleteScheduling(req, res){
        try{
            const schedulingRepository = await (await Database).getRepository(Scheduling)
            const schedulingRemove = await schedulingRepository.findOneBy({id: req.body.id});
            
            if(schedulingRemove == null){
                return res.status(500).json({message: 'scheduling not found'});
            }
            
            await schedulingRepository.remove(schedulingRemove);
            return res.status(200).json({message: 'success'})
        }catch(err){

            console.log(err);
            res.status(500).json({message: 'error!'});
        }
    }

}

export default new SchedulingController();