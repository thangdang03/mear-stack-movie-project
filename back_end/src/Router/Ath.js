const express = require('express');
const router = express.Router();
const ath_controller = require('../Controller/ath')
const movie_midelware = require("../Midelware/veryfi")

router.post("/register",ath_controller.register);
router.post("/login",ath_controller.login);
router.post("/refesh",ath_controller.refesh_token);
router.post("/logout",movie_midelware.veryfi_token,ath_controller.logout);


module.exports = router;