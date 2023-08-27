const express = require('express');
const cors = require('cors');
const bodypaser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const router = require('./src/Router/Main');
const conect = require('./src/Config/conection');
const cookie_parser = require('cookie-parser');
dotenv.config();
const App = express();
App.use(cors({
    origin: process.env.URL_REACT,
    credentials: true ,
}));
App.use(cookie_parser());
App.use(express.json());
App.use(express.urlencoded({extended: false}));
App.use(bodypaser.json({
    limit: "50mb"
}));
App.use(morgan("common"));

App.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', process.env.URL_REACT);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    next();
});


//router
router(App);
//cenction database
conect();


App.listen(process.env.PORT,(req,res)=>{
    console.log(`Sever is listening in ${process.env.PORT}`);
});