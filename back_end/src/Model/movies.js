const mongoose=require("mongoose");
const Shema = mongoose.Schema;
const ObjectId =  Shema.ObjectId;

// movie
const Movies_Shema = new Shema({
    title:{
        type: String,
        required: true,
    },geren:{
        type:String,
        trim:true,
        required: true
    },nation:{
        type: String,
        default: " "
    },
    name:{
        type: String,
        required: true,
        unique: true
      },
    imgm:{
        imgmovie:{
            type:String,
        }
    },back_img:{
        type: String,
    },video:{
        type: String,
        required:true,
    },year:{
        type: Date,
        required: true,
    },
    view:{
        type: Number,
        required: true
    },
    comment:[{
        iduser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Acount"
        },content:{
            type: String,
        }
    }],
    director:{
        type: String,
        trim: true,
        ref:"Director"
    },
    peformer:[{
        type: String,
        trim:true,
        ref:"Performer"
    }]
},{
     timestamps : true,
     collection: 'Movies'
});




// peformer
const Performer_Shema = new Shema({
    name_performer:{
        type: String,
        required: true,
    },yearp:{
        type: String,
        default:" "
    },Movie:[{
        type: ObjectId,
        ref: "Movies"
    }]
},{
    timestamps : true,
    collection: 'Performers'
})



// director
const director_schema = new Shema({
    namedrector:{
        type: String,
        required: true
    },yeard:{
        type: String,
       default:" "
    },
    Movie:[{
        type: ObjectId,
        ref: "Movies"
    }]
},{
    timestamps : true,
    collection: 'Directors'
});


//acounts
const acountshema = new Shema({
    id:{
        type:ObjectId
    },
    username:{
        type: String,
        required: [true,"please add user name"],
        unique:true,
        minlength: 6,
        maxlength:50
    },email:{
        type: String,
        required: [true,"please add email"],
        minlength: 6,
        maxlength:200,
        unique:true
    },password:{
        type: String,
        required:[true,'phease add your password'],// khong duoc phep trong
        minlength: 6,// do dai toi thieu
        maxlength:100// do dai toi da
    },favorite_movie:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Movies",
    }]
    ,movies_watched:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Movies"
    }]
    ,profilePic:{
        type: String,
        default: "https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang-den.png"
    },isAdmin:{
        type:Boolean,
        default: false
    },bill:[{
        type: mongoose.Schema.ObjectId,
        ref:"Bill"
    }]
},{
    collection: 'Acounts',
    timestamps : true
});


const tiketshema = new Shema({
    name:{
        type: String,
        required: [true,"please add your name movie"]
    },
    decription:{
        type:String,
        required: [true,"please add your decription"]
    },
    premiere_date:{
        type: Date,
        required: [true,"please add premiere date "]
    }
    ,time:{
        type:String,
        required: [true,"please add  movie time"]
    },
    age:{
        type:String,
        reuqired:[true,"please add age limit"]
    },
    price:{
        type: String,
        required:[true,"please add your movie price"]
    },
    quantity:{
        type:String,
        required:[true,"please add your movie quantity"]
    },
    seat:{
        type: String,
        required:[true,"please add your seat"],
        unique: true
    },
    
});



const Acount = mongoose.model("Acount",acountshema);
const Performer = mongoose.model("Performer",Performer_Shema);
const Director = mongoose.model("Director",director_schema)
const Movies = mongoose.model("Movies",Movies_Shema);
const Tiket = mongoose.model("Tiket",tiketshema);


module.exports ={
    Movies,
    Director,
    Performer,
    Acount,
    Tiket,
}