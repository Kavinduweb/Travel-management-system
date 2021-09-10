const express = require("express");
const mongoose = require("mongoose");
const bodyParser =require("body-parser");
const cors = require("cors");
 require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());




const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopologyL: true,
    useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () =>{
    console.log("Mongodb connection success!");
})


const AddRouter = require("./routes/Registers.js");


app.use("/Register",AddRouter);



const paymentRouter = require("./routes/payments.js");

http://localhost:8070/payment

app.use("/payment",paymentRouter);

const travelPackageRouter=require("./routes/travelPackage.js");
app.use("/travelpackages",travelPackageRouter);

const inquiryRouter=require("./routes/inquiry.js");
app.use("/inquiry",inquiryRouter);

const inquiryAdminRouter=require("./routes/InquiryAdmin.js");
app.use("/inquiryAdmin",inquiryAdminRouter);

const UserRoute = require("./routes/UserProfile.js");
app.use("/User",UserRoute);

const adminlogRouter = require("./routes/AdminLogin");
app.use("/Admin",adminlogRouter);

const deleteuserrouter = require("./routes/Admin_Panel_ProfileManagement");
app.use("/access",deleteuserrouter);

const hotelBookingRouter = require("./routes/HotelBooking");
app.use("/hotelbooking",hotelBookingRouter);

const packageBookingRouter=require("./routes/Packagebooking.js");
app.use("/packagebooking",packageBookingRouter);



app.listen(PORT, () =>{
    console.log(`The port is : ${PORT}`);
})
