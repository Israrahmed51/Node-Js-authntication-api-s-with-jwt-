const express=require('express')
const app=express()
const mongoose=require('mongoose')
const authRoute=require('./route/auth');
const dotenv=require('dotenv').config();
const postsRoute = require('./route/posts');



mongoose.connect("mongodb://localhost:27017/uiui"

,{ useNewUrlParser: true, useUnifiedTopology:true}).then(()=>{
    console.log("db is seccecfully creteted")
})

app.use(express.json())
app.use('/api/posts',postsRoute)




app.use('/api/user',authRoute)
app.listen(101)