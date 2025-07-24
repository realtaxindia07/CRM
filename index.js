const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const cookieParser = require('cookie-parser');
require("dotenv").config();


const app=express();


app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB

async function db(){
    try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected..");
    } catch (err) {
        console.error("Database connection error: ", err.message);
    }
}
db();

// Routes
app.get("/", (req, res) => {
    res.send("hello world");
});
app.use("/user", require("./routes/user"));
app.use("/dashboard", require("./routes/dashboard"));


// app.all("*", (req, res) => {
//     res.status(404).send("page not found");
// });

app.use((err, req, res, next) => {
    // console.log("Error occurred: ",err.status, err.message);
    res.status(err.status||500).send(err.message||"Something went wrong!");
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on ${process.env.PORT || 3000}..`);
});