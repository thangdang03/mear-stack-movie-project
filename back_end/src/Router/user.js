const express = require('express');
const router = express.Router();
const user_constroller = require('../Controller/user_controler');
const user_midelwarew = require('../Midelware/veryfi');
//get all user
router.get("/",user_midelwarew.admin_token,user_constroller.getalluser);

//get user by id
router.get("/:id",user_midelwarew.token_action_user,user_constroller.getauser);

// delte user
router.delete("/:id",user_midelwarew.token_action_user,user_constroller.deltteuser);

// uppdate user
router.put("/:id",user_midelwarew.token_action_user,user_constroller.updateuser);

//comment movie
router.post("/:id",user_midelwarew.token_action_user,user_constroller.comment_movie);

//delte comment
router.post("/comment/:id",user_midelwarew.token_action_user,user_constroller.detle_commnet);

// favourite movie
router.put("/facvourite/:id",user_midelwarew.veryfi_token,user_constroller.put_favourite);

// watched movie
router.put("/watched/:id",user_midelwarew.veryfi_token,user_constroller.put_watched);


module.exports = router