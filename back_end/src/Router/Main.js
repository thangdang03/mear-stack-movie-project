const user = require("./user");
const ath = require("./Ath");
const Movies = require("./Movies_rt");
const Performer = require("./performer_rt");
const Director = require("./Director");

const Router=(App)=>{
    App.use("/",ath);
    App.use("/user",user);
    App.use("/movies",Movies);
    App.use("/performer",Performer);
    App.use("/director",Director);
}

module.exports = Router