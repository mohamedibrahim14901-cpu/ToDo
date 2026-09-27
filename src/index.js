require('dotenv').config();

const express = require('express');
const app = express();

const mongoose= require('mongoose');

const port= process.env.PORT;

const ToDosRoutes = require("./routes/todos.js");

const cors = require("cors")
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Mongo DB connected Successfully");
    })
.catch((err)=>{
        console.log(`error connecting to DB : ${err}`);
    })

app.use(express.json())
app.use('/api',ToDosRoutes);


//logger
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
})




app.listen(port,()=>{
    console.log(`Server is working properly on port ${port}`);
    
})






