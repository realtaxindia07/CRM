const route=require("express").Router();
const { login, register, logout} = require('../controllers/userlog/logController');
const { isRegisterValid, isloginValid } = require('../middlewares/validation/user');
const { newAdmin, newManager } = require('../controllers/userlog/logController');
const { isAdmin, isManager, isloggedIn } = require('../middlewares/auth');

route.post('/register', isRegisterValid, register);
route.post('/login', isloginValid, login);
route.post('/logout',isloggedIn, logout);
route.post('/newAdmin',isloginValid, isloggedIn, isAdmin, newAdmin);
route.post('/newManager',isloginValid, isloggedIn, isManager, newManager);
 
module.exports = route;
