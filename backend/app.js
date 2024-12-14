const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AppError = require(`${__dirname}/utils/AppError`)
const userRouter = require(`${__dirname}/routes/userRoutes`);
const leaveRouter = require(`${__dirname}/routes/leaveRoutes`);
const errorControllers = require(`${__dirname}/controller/errorCtrl`);
const app = express();
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({extended:false }))
app.use(cookieParser());
app.set('view engine','pug');

const DB =process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);

const dbConnect = async() => {
  try{
    await mongoose.connect(DB)
    console.log("db connected")
  } catch(err){
    console.log(err);
    }
  }
dbConnect();
app.use('/api/v1/users', userRouter);
app.use('/api/v1/leave', leaveRouter);
app.use('*', (req, res, next) => {
  
  next(new AppError(`${req.originalUrl} not found on this site`, 404));
});

app.use(errorControllers)
module.exports = app;
