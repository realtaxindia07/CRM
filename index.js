const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const cookieParser = require('cookie-parser');
const multer = require('multer');
const xlsx = require('xlsx');

require("dotenv").config();


const app=express();


app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5174','http://localhost:5173','http://localhost:5000','http://127.0.0.1:5500'],
    credentials: true
}));
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
app.use((req, res, next) => {
    // Middleware to log request details
    console.log(`Request cookie: ${req.cookies? JSON.stringify(req.cookies) : 'No cookies'}`);
    console.log(`Request URL: ${req.originalUrl}`);
    console.log(`Request Method: ${req.method}`);
    // console.log(`Request Body: `, req.body);
    next();
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// app.post('/upload', upload.single('excelFile'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//     }
//     // console.log(req.file[0]);
//     // The file buffer is in req.file.buffer
//     try {
//     const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });

//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];

//     const data = xlsx.utils.sheet_to_json(worksheet);

//     // console.log(data);
// const validData = [];
//     const errors = [];

//     data.forEach((row, index) => {
//       const { error, value } = userSchema.validate(row, { abortEarly: false });

//       if (error) {
//         errors.push({
//           row: index + 2,
//           errors: error.details.map(d => d.message),
//         });
//       } else {
//         validData.push(value);
//       }
//     });

//     if (errors.length > 0) {
//       return res.status(400).json({ message: 'Validation failed', errors });
//     }

//     // await User.insertMany(validData);
//     res.status(200).json({ message: 'Data uploaded successfully', count: validData.length });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   } finally {
//     // Cleanup uploaded file
//     fs.unlink(filePath, () => {});
//   }

//     res.json(data); // Send JSON response
// });


// Routes
app.get("/", (req, res) => {
    console.log("hello world")
    res.send("hello world");
});
app.use("/upload",upload.single('excelFile'), require("./routes/upload"));
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