const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose')
const path = require('path');
const app = express();
const fs = require('fs');
const cors = require('cors')

const entRoutes = require('./Routes/entrepreneur');
const conversationRoutes = require('./Routes/conversation')
const investorRoutes = require('./Routes/investor')
const messagesRoutes = require('./Routes/message')

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use('/frontendimages',express.static(path.join(__dirname, 'frontend_images')));
app.use('/pitches',express.static(path.join(__dirname, 'pitches')));
app.use('/uploads/images', express.static(path.join(__dirname,'uploads', 'images')));
app.use('/messages', messagesRoutes)
app.use('/conversation', conversationRoutes)
app.use('/entrepreneur', entRoutes);
app.use('/investor', investorRoutes)

app.use((error,req,res,next) => {
    if(req.file){
        console.log("consists")
        fs.unlink(req.file.path, err => {
          console.log(err)
        })
      }
      if (res.headerSent) {
        return next(error);
      }
      res.status(error.code || 500);
      res.json({ message: error.message || "An unknown error occoured" });
})

mongoose.connect('mongodb+srv://incognitoproj:oYqQXYTb8U7DvJRq@cluster0.tymagje.mongodb.net/database?retryWrites=true&w=majority')
.then(result =>{
    app.listen(8080);
}).catch(err => console.log(err))

//mongodb+srv://kartikeyavishnoi29:JHXVEBvm0xVGucMt@restapicluster.yc3pnsf.mongodb.net/messages?retryWrites=true&w=majority
//