const mysql = require('mysql2')
const database_url = process.env.DATABASE
const host_url = process.env.HOST
const user_url = process.env.USER
const password_url = process.env.PASSWORD

const db = mysql.createConnection({
    database:database_url,
    host:host_url,
    user:user_url,
    password:password_url
})

const admin = async(req,res,next)=>{
    try {
        const sql = `SELECT * FROM user WHERE id="${req.user.id}"`
        db.query(sql,(err,data)=>{
            if(err) throw err
            if(data[0].role !==1) return res.status(400).json({msg:"Admin access diended"})
            next()
        })
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}

module.exports = admin