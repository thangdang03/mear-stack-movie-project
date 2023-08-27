const {Movies,Director,Performer,Acount} = require('../Model/movies');

class Director_controller{
    getall= async(req,res)=>{
        try {
            const allu= await Director.find().populate("Movie","name title back_img")
            if(!allu){
                res.status(400).json(" can not get Directors");
                return;
            }
            res.status(200).json(allu);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    getadirector=async(req,res)=>{
        try {
            console.log("check");
            const get_id = await Director.findById(req.params.id).populate("Movie","name title back_img");
            if(!get_id){
                res.status(400).json(" can not get a director");
                return;
            }
            res.status(200).json(get_id);
        } catch (error) {
            
            res.status(500).json(error);
        }
    }

    delte_Director=async(req,res)=>{
        try {
            const find = await Director.findById(req.params.id);
            if(!find){
                res.status(400).json(" Director is not defile");
                return;
            }
            await Movies.updateMany({director: find._id.toString()},{$set:{director: " "}});
            await find.deleteOne();
            res.status(200).json("delte sucessfully");
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    }
}

module.exports = new Director_controller;