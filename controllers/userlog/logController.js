const {wrapAsync} = require("../../utils/wrapAsync");
const ExpressError = require("../../utils/CustomError");
const User = require("../../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = wrapAsync(async (req, res, next) => {
    // Logic to register a user
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        throw new ExpressError(400,"User already exists");
    }
    const newUser = new User({...req.body, password: hashedPassword, role: 'user' });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {expiresIn:'14d' });
    res.cookie("token", token, { httpOnly: true , sameSite: 'None' ,secure: true});
    res.status(201).send(newUser);
});

module.exports.login = wrapAsync(async (req, res, next) => {
    // Logic to login a user
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        throw new ExpressError(400, "Invalid email or password");
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        throw new ExpressError(400, "Invalid email or password");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '14d' });

    res.cookie("token", token, { httpOnly: true, sameSite: 'None',maxAge: 14 * 24 * 60 * 60 * 1000 ,secure: true});

    // console.log(res);
    res.status(200).send( user);
});
module.exports.logout = wrapAsync(async (req, res, next) => {
    // Logic to logout a user
    // console.log(req.cookies);
    res.clearCookie("token");
    res.status(200).send("User logged out successfully");
});
module.exports.newAdmin = wrapAsync(async (req, res, next) => {
    // Logic to create a new admin user
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
        throw new ExpressError(404, "User not found");
    }
    let role=req.body.role;
    existingUser.role = role || 'user';
    await existingUser.save();
    res.status(201).send(`${existingUser.role} user created successfully`);
});
module.exports.newManager = wrapAsync(async (req, res, next) => {
    // Logic to create a new manager user
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
        throw new ExpressError(404, "User not found");
    }
    let role = req.body.role;
    if (role === 'admin' ) {
        throw new ExpressError(400, "Invalid role");
    }
    existingUser.role = role || 'user';
    await existingUser.save();
    res.status(201).send(`${existingUser.role} user created successfully`);
});
module.exports.newTeamLeader = wrapAsync(async (req, res, next) => {
    // Logic to create a new team lead user
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
        throw new ExpressError(404, "User not found");
    }
    let role = req.body.role;
    if (role === 'admin' || role === 'manager') {
        throw new ExpressError(400, "Invalid role");
    }
    existingUser.role = role || 'user';
    await existingUser.save();
    res.status(201).send(`${existingUser.role} user created successfully`);
});
