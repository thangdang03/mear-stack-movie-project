const express = require('express');
const router = express.Router();
const Director_controller = require("../Controller/Director_controller");
const user_midelware = require("../Midelware/veryfi")
router.get("/",user_midelware.veryfi_token,Director_controller.getall);

router.get("/:id",user_midelware.veryfi_token,Director_controller.getadirector);

router.delete("/:id",user_midelware.veryfi_token,Director_controller.delte_Director);

module.exports = router;