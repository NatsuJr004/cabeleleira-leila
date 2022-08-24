import { Scheduling } from '../models/modelScheduling';
import { User } from '../models/modelUser';
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
            scheduling.scheduleState = "pending";
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

}

export default new SchedulingController();