const express =require("express");
const router = express.Router();
const performer_controller = require('../Controller/Performer');
const user_midelwarew = require('../Midelware/veryfi');
router.get("/",user_midelwarew.veryfi_token,performer_controller.getall);
router.get("/:id",user_midelwarew.veryfi_token,performer_controller.getaperformer);
router.post("/",user_midelwarew.veryfi_token ,performer_controller.add_performer);

router.delete("/:id",user_midelwarew.admin_token,performer_controller.dlete_peformer);

router.put("/:id",user_midelwarew.veryfi_token,performer_controller.uppdate_performer);


module.exports = router;