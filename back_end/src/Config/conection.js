const mongoose = require("mongoose");

const conect = async()=>{
    try {
        const conection = await mongoose.connect(process.env.MOGO_CONECT);
        console.log("conect successfully");
    } catch (error) {
        console.log(" interupt conect");
    }
}

module.exports = conect;