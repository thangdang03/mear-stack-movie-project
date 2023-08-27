const {Movies,Director,Performer,Acount} = require('../Model/movies');
const bcrypt = require('bcrypt');

class user_constroller{
    
    getalluser = async(req,res)=>{
        try {
            console.log(req.user)
            const user = await Acount.find().populate("favorite_movie","name id").populate("movies_watched","name id");
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
            return;
        }
    }

    getauser = async(req,res)=>{
        try {
            const user = await  Acount.findById(req.params.id).populate("favorite_movie","name back_img").populate("movies_watched","name back_img");
            res.status(200).json(user);
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
            return;
        }
    }

    deltteuser = async(req,res)=>{
        try {
            const delte = await Acount.findByIdAndDelete(req.params.id);
            console.log(req.user);
            res.status(200).json("delte successfully");
        } catch (error) {
            res.status(500).json("delte interupt");
            return;
        }
    }

    updateuser = async(req,res)=>{
        try {
            const pass = req.body.password;
            if(req.body.password){
                const halt =await bcrypt.genSalt(10);
                const hashpassword =   await bcrypt.hash(pass,halt);
                console.log(hashpassword);
                req.body.password = hashpassword;
            }
            const uppdate = await Acount.findOneAndUpdate({_id: req.params.id},{$set: req.body});
            const finduser = await Acount.findById(req.user._id);
            if(!uppdate){
              res.status(400).json(" can't update user");
              return;
            }
            res.status(200).json(finduser);
        } catch (error) {
            console.log(error)
            res.status(500).json("uppdate interupt");
            return;
        }
    }
     
   comment_movie=async(req,res)=>{
    try {
        console.log(req.body.movie)
        const getmovie = await Movies.findById(req.body.movie);
        if(!getmovie){
             res.status(400).json(" can not comment in movie");
             return;
        }
        const addcomment =await getmovie.updateOne({$push:{
            comment:{
                iduser: req.user._id,
                content: req.body.comment
            }
        }});
        res.status(200).json(getmovie);
    } catch (error) {
        console.log(error);
        res.status(500).json("comment interupt");
            return;
    }
   }

   detle_commnet=async(req,res)=>{
         try {
            console.log(req.data)
            const find_movie =await Movies.findById(req.body.movie);
            if(!find_movie){
                res.status(400).json("movie not find");
                return;
            }else{
                await find_movie.updateOne({$pull:{
                    comment:{_id:req.body.id_coment} 
                }})
                res.status(200).json("delte comment sucessfull");
            }
         } catch (error) {
            console.log(error);
              res.status(500).json("delte  interupt");
            return;
         }
   }
   
   
   put_favourite =async(req,res)=>{
    try {
        // find movie
        const movie =await Movies.findById(req.params.id);
        if(!movie){
            res.status(400).json('movie not find');
            return
        }
        const findfa = await Acount.findOne({_id : req.user._id , favorite_movie: req.params.id});
        if(!findfa){
            const user = await Acount.findByIdAndUpdate(req.user._id,{$push:{
                favorite_movie: movie._id
            }});
            const find = await Acount.findById(req.user._id)
            res.status(200).json(find);
            
        }else{
            res.status(400).json(" movie was add");
            return
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("cant put favourite movie");
        return;
    }
   }

   put_watched=async(req,res)=>{
        try {
            // find movie
            const movie =await Movies.findById(req.params.id);
            if(!movie){
                res.status(400).json('movie not find');
                return
            }
            const findfa = await Acount.findOne({_id : req.user._id , movies_watched: req.params.id});
            if(!findfa){
                const user = await Acount.findByIdAndUpdate(req.user._id,{$push:{
                    movies_watched: movie._id
                }});
                const find = await Acount.findById(req.user._id)
                res.status(200).json(find);
                
            }else{
                res.status(400).json(" movie was add");
                return
            }
        } catch (error) {
            console.log(error);
        res.status(500).json("cant put watched movie");
        return;
        }
   }
}

module.exports = new user_constroller