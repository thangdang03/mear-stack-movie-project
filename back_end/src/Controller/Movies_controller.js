const {Movies,Director,Performer,Acount} = require('../Model/movies');

class Movie_controller{
    getallMovies=async(req,res)=>{
        try {
           const movie = await Movies.find().populate("peformer","name_performer yearp -_id").populate("director","namedrector -_id").populate("comment.iduser","username")
           if(!movie){
               res.status(400).json("can not get movies");
               return;
           }
           res.status(200).json(movie);
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
            return;
        }
    } 

    getaMovie=async(req,res)=>{
        try {
            const getmovie = await Movies.findById(req.params.id).populate("peformer","name_performer yearp ").populate("director","namedrector ").populate("comment.iduser","username ");
            if(!getmovie){
                res.status(400).json("the movie is not valid");
                return;
            }
            res.status(200).json(getmovie);
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
            return;
        }
    }
     

    // them 1 bo phim 
    addamovie=async(req,res)=>{
        console.log(req.body)
        try {
            if(!req.body.title || !req.body.geren || !req.body.name|| !req.body.back_img ||
               !req.body.video || !req.body.year ||!req.body.view){
                res.status(400).json(" tile , geren , name,img,back_img,video,year or view is undefile");
                return;
            }
            const ress = await Movies.create(req.body);
            
            const arr_ger = req.body.geren.split(",");
            
            // them dien vien
            const arrr = req.body.performer.split(",");
            if(arrr){
                arrr.map(async(data)=>{
                    const find_id_per = await Performer.findOne({name_performer: data});
                    if(!find_id_per){
                        const create = await Performer.create({
                            name_performer: data
                        });
                        await create.updateOne({$push:{
                            Movie: ress._id
                        }});
                        await Movies.findByIdAndUpdate(ress._id,{$push:{peformer: create._id}});
                    }else{
                        await Movies.findByIdAndUpdate(ress._id,{$push:{peformer: find_id_per._id}});
                        await find_id_per.updateOne({$push:{Movie: ress._id}});   
                    }
                })
            }

            // them dao dien 
            if(req.body.director){
                const find_id_diretor = await Director.findOne({name: req.body.director});

                if(!find_id_diretor){
                      const create_dir = await Director.create({
                        namedrector: req.body.director
                      });
                      await create_dir.updateOne({$push:{
                        Movie: ress._id
                      }});
                      await Movies.findByIdAndUpdate(ress.id,{director: create_dir._id});
                }else{
                    await find_id_diretor.updateOne({$push:{
                        Movie: ress._id
                      }});
                      await Movies.findByIdAndUpdate(ress.id,{director: find_id_diretor._id});
                }
            }
            res.status(200).json(" upp date successfully");
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
            return;
        }
    }
    
    // xoa 1 bo phim 
    delte_movie = async(req,res)=>{
        try {
            const find = await Movies.findByIdAndDelete(req.params.id);
            await Performer.updateMany({Movie: find._id},{$pull:{Movie: find._id}});
            await Director.updateOne({Movie: find._id},{$pull:{Movie: find._id}});
            res.status(200).json("delte sucessfully");
        } catch (error) {
            res.status(500).json(error);
            return;
        }
    }

    // uppdate movie 

}

module.exports = new Movie_controller