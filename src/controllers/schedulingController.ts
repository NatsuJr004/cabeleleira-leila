import { Scheduling } from '../models/modelScheduling';
import Database from '../database/configDB';
import { format, isBefore, parseISO, addDays, isFuture, subWeeks } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { createHash } from '../utils/hash';
import { Raw } from 'typeorm';

class SchedulingController{
    async createScheduling(req, res){
        const { idUser, title, description, appointmentDate, appointmentTime} = req.body;
        try{
            if(!isFuture(parseISO(appointmentDate))){
                return res.status(403).json({message: 'inform a future date!'})
            }

            const scheduling = new Scheduling();
            scheduling.title = title;
            scheduling.description = description;
            scheduling.serviceStatus = "pending";
            scheduling.user = idUser;
            scheduling.appointmentDate = appointmentDate;
            scheduling.appointmentTime = appointmentTime;
            scheduling.lastChanged = format(new Date(), 'yyyy-MM-dd');

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
        const { isAdmin } = req.userReq;

        try{
            const schedulingRepository = await (await Database).getRepository(Scheduling)
            const schedulingUpdate = await schedulingRepository.findOneBy({ id: idScheduling });

            if(schedulingUpdate == null){
                return res.status(404).json({message: 'scheduling not found'})
            }

            if(!isAdmin){
                return res.status(401).json({message: 'Unauthorized'});
            }
            
            schedulingUpdate.serviceStatus = serviceStatus;
            schedulingUpdate.lastChanged = format(new Date(), 'yyyy-MM-dd');
            
            await schedulingRepository.save(schedulingUpdate);
            return res.status(200).json({message: 'success'})
        }catch(err){

            console.log(err);
            res.status(500).json({message: 'error!'});
        }
    }

    async editScheduling(req, res){
        const {idScheduling, title, description, appointmentDate, appointmentTime} = req.body;

        try{
            const schedulingRepository = await (await Database).getRepository(Scheduling)
            const schedulingUpdate = await schedulingRepository.findOneBy({ id: idScheduling });

            if(schedulingUpdate == null){
                return res.status(404).json({message: 'scheduling not found'})
            }
            
            if(!isBefore(parseISO(schedulingUpdate.lastChanged), new Date())){
                return res.status(403).json({message: 'Change denied'});
            }

            if(!isFuture(parseISO(appointmentDate))){
                return res.status(403).json({message: 'inform a future date!'})
            }

            schedulingUpdate.title = title;
            schedulingUpdate.description = description;
            schedulingUpdate.appointmentDate = appointmentDate;
            schedulingUpdate.appointmentTime = appointmentTime;

            schedulingUpdate.lastChanged = format(addDays(new Date(), 2), 'yyyy-MM-dd');
            
            await schedulingRepository.save(schedulingUpdate);
            return res.status(200).json({message: 'success'})
        }catch(err){

            console.log(err);
            res.status(500).json({message: 'error!'});
        }
    }

    async historyScheduling(req, res){
        const {id} = req.userReq;

        try{
            const schedulingRepository = (await Database).getRepository(Scheduling);
            const allScheduling = await schedulingRepository.find({
                relations: {
                    user: true
                },
                select: {
                    user: {
                        id: true
                    }
                },
                where: {
                    appointmentDate: Raw((AppointmentDate) => `${AppointmentDate} > :date`, { date: (subWeeks(new Date(), 1)) }),
                    user: {
                        id: id
                    }
                },
                
            });

            return res.status(200).json({message: 'success', res: allScheduling});
        }catch(err){

            console.log(err);
            res.status(500).json({message: 'error!'});
        }
    }

    async deleteScheduling(req, res){
        const { id, isAdmin } = req.userReq;

        try{
            const schedulingRepository = await (await Database).getRepository(Scheduling)
            const schedulingRemove = await schedulingRepository.find({
                where: {
                    id: req.body.id
                },
                relations: {
                    user: true
                },
                select: {
                    user: {
                        id: true,
                        isAdmin: true,
                    }
                }
            });
            
            if(schedulingRemove.length == 0){
                return res.status(404).json({message: 'scheduling not found'});
            }

            if(!isAdmin){
                if( schedulingRemove[0].user.id !== id ){
                    return res.status(401).json({message: 'Unauthorized'});
                }else{
                    await schedulingRepository.remove(schedulingRemove);
                    return res.status(200).json({message: 'success'});
                }
            }

            await schedulingRepository.remove(schedulingRemove);
            return res.status(200).json({message: 'success'});
        }catch(err){

            console.log(err);
            res.status(500).json({message: 'error!'});
        }
    }

}

export default new SchedulingController();