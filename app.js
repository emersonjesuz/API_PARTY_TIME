const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

// DB connection

const conn = require("./db/conn");

conn();

const routes = require('./routes/router')

app.use('/api', routes)

app.listen(3000, ()=>{
    return;
});


//PtzRaT0qOlp5jaVF
//PtzRaT0qOlp5javF
//mongodb+srv://josiemerson2013:<password>@cluster0.yspedgg.mongodb.net/?retryWrites=true&w=majority