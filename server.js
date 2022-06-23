require("dotenv").config({path:"./db.env"});
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const mysql = require("mysql2")
const app = express()

app.use(express.json())
app.use(cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials:true
}))
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true
}))
//Connect to db
app.use("/user",require('./router/user'))
app.use('/api',require('./router/uploadRoute'))
app.use('api',require('./router/CategoryRoute'))
app.use('/api',require('./router/PaymentRoute'))
app.use('/',require('./router/ProductsRouter'))
const url = process.env.MONGO_URL
mongoose.connect(url,err=>{
    if(err) throw err
    console.log("DB Connect")
})
//Connect to MySQL
const database_url = process.env.DATABASE
const host_url = process.env.HOST
const user_url = process.env.USER
const password_url = process.env.PASSWORD
mysql.createConnection({
    database:database_url,
    host:host_url,
    user:user_url,
    password:password_url
}).connect(err=>{
    if(err) throw err
    console.log("MySQL Connect")
})


const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`App is running at http://localhost:${PORT}`)
})