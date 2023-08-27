const {Movies,Director,Performer,Acount} = require('../Model/movies');
const mongoose = require('mongoose');
class performer_controller{
    getall=async(req,res)=>{
        try {
            const getdata = await Performer.find().populate("Movie","name title");
            if(!getdata){
                res.status(400).json("can't get all performer");
            }
            res.status(200).json(getdata);
        } catch (error) {
            res.status(500).json(error);
            return;
        }
    }

    getaperformer = async(req,res)=>{
        try {
            const performer = await  Performer.findById(req.params.id).populate("Movie","name title back_img");

            if(!performer){
                res.status(400).json(` can not get with ${req.params.id}`);
                return;
            }
            res.status(200).json(performer);
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
            return;
        }
    }

    add_performer=async(req,res)=>{
        try {
            if(!req.body.name_performer){
                res.status(400).json("you have add a name performer");
                return;
            }
            const find_per = await Performer.findOne({name_performer: req.body.name_performer});
            if(find_per){
                res.status(400).json(" the performer have database");
                 return;
            }else{
                const create = await Performer.create(req.body);
                if(req.body.movie){
                    const movie_f = await Movies.findById({_id: req.body.movie});
                    if(!movie_f){
                        res.status(400).json(" movie is not declare");
                        return;
                    }
                   const findmovie = await Movies.updateOne({_id: req.body.movie},{$push:{peformer: create._id}});
                   await create.updateOne({$push:{Movie: movie_f._id}});
                };
                res.status(200).json(" add sucessfully");
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
            return;
        }
    }

    uppdate_performer=async(req,res)=>{
        try {
            const find_performer = await Performer.findById(req.params.id);
            if(!find_performer){
                res.status(400).json(" the performer is not defile ");
                return;
            }
            await find_performer.updateOne(req.body);
            
            if(req.body.movie){
                let check ;
                await Movies.updateMany({name: req.body.movie},{$push:{peformer: find_performer._id}});
                
                if(typeof(req.body.movie))
                find_performer.Movie.map(async(data)=>{
                if(data.toString() === req.body.movie === true){
                    check = true
                }
               });
                if(find_performer.Movie[0] === undefined){
                    await find_performer.updateOne({$push:{Movie: req.body.movie}});     
                }
                if(check=false){
                    await find_performer.updateOne({$push:{Movie: req.body.movie}});     
                }
            }
            res.status(200).json("upp date sucsessfully");
        } catch (error) {
            res.status(500).json(error);
            return;
        }
    }
    
    dlete_peformer = async(req,res)=>{
        try {
            const find_per = await Performer.findByIdAndDelete(req.params.id);
            if(!find_per){
                res.status(400).json("can not find performer");
                return;
            }
            const get = await Movies.updateMany({peformer: find_per._id},{$pull:{peformer: find_per._id}});
            res.status(200).json("detel sucessfully");
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
            return;
        }
    }
}

module.exports = new performer_controller;