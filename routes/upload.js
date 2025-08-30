const router=require("express").Router();
const {excelController}=require("../controllers/upload/excelController");
const { isloggedIn ,isTeamLeader,isManager} = require('../middlewares/auth');

router.post("/excel", isloggedIn, excelController);

module.exports=router;