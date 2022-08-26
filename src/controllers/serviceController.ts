import { Service } from '../models/modelService';
import Database from '../database/configDB';
import { format, isBefore, parseISO, addDays, isFuture, subWeeks } from 'date-fns';
import { Raw } from 'typeorm';

class ServiceController{
    async createService(req, res){
        const { name, description, location, price} = req.body;
        try{

            const service = new Service();
            service.name = name;
            service.description = description;
            service.location = location;
            service.price = price;

            const schedulingRepository = (await Database).getRepository(Service);
            await schedulingRepository.save(service);

            res.status(200).json({message: 'service created!'});
        }catch(err){

            console.log(err);
            res.status(500).json({message: 'error!'});
        }
    }

    async readAllService(req, res){
        try{
            const serviceRepository = await (await Database).getRepository(Service)
            const allService = await serviceRepository.find();

            res.status(200).json({res: allService});
        }catch(err){

            console.log(err);
            res.status(500).json({message: 'error!'});
        }
    }

    async readService(req, res){
        try{
            const serviceRepository = (await Database).getRepository(Service);
            const service = await serviceRepository.findOneBy({
                id: req.params.id
            })

            if(service == null){
                return res.status(404).json({message: 'service not found!'});
            }

            return res.status(200).json({res: service});
        }catch(err){
            console.log(err);
            return res.status(500).json({message: 'error'});
        }
    }

    async editService(req, res){
        const {idService, name, description, price, location} = req.body;

        try{
            if(!req.userReq.isAdmin){
                return res.status(401).json({message: 'Unauthorized'});
            }

            const serviceRepository = await (await Database).getRepository(Service)
            const serviceUpdate = await serviceRepository.findOneBy({ id: idService });

            if(serviceUpdate == null){
                return res.status(404).json({message: 'service not found'})
            }

            (name != "") && (serviceUpdate.name = name);
            (description != "") && (serviceUpdate.description = description);
            (price != "") && (serviceUpdate.price = price);
            (location != "") && (serviceUpdate.location = location);
            
            await serviceRepository.save(serviceUpdate);
            return res.status(200).json({message: 'success'})
        }catch(err){

            console.log(err);
            res.status(500).json({message: 'error!'});
        }
    }

    async deleteService(req, res){
        const { isAdmin } = req.userReq;

        try{
            const serviceRepository = await (await Database).getRepository(Service)
            const serviceRemove = await serviceRepository.findOneBy({id: req.body.id });
            
            if(serviceRemove == null){
                return res.status(404).json({message: 'service not found'});
            }

            if(!isAdmin){
                return res.status(401).json({message: 'Unauthorized'});
            }

            await serviceRepository.remove(serviceRemove);
            return res.status(200).json({message: 'success'});
        }catch(err){

            console.log(err);
            res.status(500).json({message: 'error!'});
        }
    }
}

export default new ServiceController();