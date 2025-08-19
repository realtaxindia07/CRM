const route=require("express").Router();
const { login, register, logout} = require('../controllers/userlog/logController');
const { isRegisterValid, isloginValid } = require('../middlewares/validation/user');
const { newAdmin, newManager } = require('../controllers/userlog/logController');
const { isAdmin, isManager, isloggedIn } = require('../middlewares/auth');
const User = require('../models/userSchema'); // Assuming you have a User model defined

route.get('/', (req, res) => {
    User.find({})
        .then(users => res.send(users))
        .catch(err => res.status(500).send(err));
});
route.post('/register', isRegisterValid, register);
route.post('/login', isloginValid, login);
route.delete('/logout', logout);
route.post('/newAdmin', isRegisterValid,isloggedIn, isAdmin, newAdmin);
route.post('/newManager',isRegisterValid, isloggedIn, isManager, newManager);
 
module.exports = route;
 