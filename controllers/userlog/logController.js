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
    const newUser = new User({...req.body, password: hashedPassword});
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {expiresIn:'60*60*24*30' });
    res.cookie("token", token, { httpOnly: true });
    res.status(201).send('User registered successfully');
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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '60*60*24*30' });
    res.cookie("token", token, { httpOnly: true });
    res.status(200).send("User logged in successfully");
});
module.exports.logout = wrapAsync(async (req, res, next) => {
    // Logic to logout a user
    res.clearCookie("token");
    res.status(200).send("User logged out successfully");
});
module.exports.newAdmin = wrapAsync(async (req, res, next) => {
    // Logic to create a new admin user
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        throw new ExpressError(400,"User already exists");
    }
    const newUser = new User({...req.body, password: hashedPassword, role: 'admin'});
    await newUser.save();
    res.status(201).send('Admin user created successfully');
});
module.exports.newManager = wrapAsync(async (req, res, next) => {
    // Logic to create a new manager user
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        throw new ExpressError(400,"User already exists");
    }
    const newUser = new User({...req.body, password: hashedPassword, role: 'manager'});
    await newUser.save();
    res.status(201).send('Manager user created successfully');
});