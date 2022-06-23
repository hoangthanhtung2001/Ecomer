const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const database_url = process.env.DATABASE
const host_url = process.env.HOST
const user_url = process.env.USER
const password_url = process.env.PASSWORD
const CLIENT_URL = process.env.CLIENT_URL
const db = mysql.createConnection({
    database:database_url,
    host:host_url,
    user:user_url,
    password:password_url
})
const sendMail = require('./SendMail')
const UserClt ={
    register:async(req,res)=>{
        try {
            const {name,email,password} = req.body;
            if(!name|| !email||!password) return res.status(400).json({msg:"Please Fill All File"})
            if(!validateEmail(email)) return res.status(400).json({msg:"Invalis Email"})
            if(password.length<6) return res.status(400).json({msg:"Password must be more 6 charector"})
            const sql = `SELECT * FROM user WHERE email ="${email}"`
            db.query(sql,(err,data)=>{
            if(err) throw err
            if(data.length>0) return res.status(400).json({msg:"This Email Is Already Exits "})
            const user = {name,email,password}
            const active_email = createActiveToken(user)
            const url = `${CLIENT_URL}/active/${active_email}`
            sendMail(email,url,"Active Email","Active Email")
            return res.json("Success")
           })
          
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    activationEmail:async(req,res)=>{
        try {
            const {active_email} = req.body
            const user = jwt.verify(active_email,process.env.ACTIVE_TOKEN)
            const {name,email,password} = user
            const passwordHash = await bcrypt.hash(password,12)
            const sql = `INSERT INTO user(name,email,password) VALUES("${name}","${email}","${passwordHash}")`
            db.query(sql,(err,data)=>{
                if(err) return res.status(400).json({msg:err.message})
                res.json({msg:"Success"})
            })
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    login:async(req,res)=>{
        try {
            const {email,password} = req.body;
            const sql =`SELECT * FROM user WHERE email="${email}"`
            db.query(sql,async(err,data)=>{
                if(err) throw err
                if(data.length===0) return res.status(400).json({msg:"This email does not exits"})
                const isMatch = await bcrypt.compare(password,data[0].password)
                if(!isMatch) return res.status(400).json({msg:"Password incorrect"})
                const refreshtoken = createRefreshToken(data[0])
                res.cookie("refresh_token",refreshtoken,{
                    httpOnly:true,
                    path:"/user/refresh_token",
                    maxAge:1000 * 60 * 60 * 24 * 30 //7days
                })
                res.json({msg:"Login Success"})
            })
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    getAccessToken:(req,res)=>{
        try {
            const refreshToken = req.cookies.refresh_token
            if(!refreshToken) return res.status(400).json("Please Login")
            jwt.verify(refreshToken,process.env.REFRESH_TOKEN,(err,user)=>{
                if(err) return res.status(400).json("Please Login")
                const accessToken = createAccessToken({id:user.id})
                res.json({accessToken})
            })
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    logout:async(req,res)=>{
        try {
            res.clearCookie("refresh_token",{path:"/user/refresh_token"})
            res.json({msg:"Logout Success"})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    forgotPassword:async(req,res)=>{
        try {
            const {email} = req.body
            const sql = `SELECT * FROM user WHERE email="${email}"`
            db.query(sql,async(err,data)=>{
                if(err) throw err
                if(data.length===0) return res.status(400).json({msg:"Invais Email"})
                const accessToken = createAccessToken({id:data[0].id})
                const url =`${CLIENT_URL}/forgot/${accessToken}`
                sendMail(email,url,"Re-send Password","ResestPassword")
                res.json({msg:"Please Check your mail"})
            })
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    resestPassword:async(req,res)=>{
        try {
            const {password} = req.body;
            const passwordHash = await bcrypt.hash(password,12)
            // const checkpassword = `SELECT * FROM user WHERE id="${req.user.id}"`
            // db.query(checkpassword,async(err,data)=>{
            //     if(err) throw err
            //     const isMatch = await bcrypt.compare(passwordHash,data[0].password)
            //     if(isMatch) return res.status(400).json({msg:"Please take new password"})
            // })
            const sql = `UPDATE user SET password ="${passwordHash}" WHERE id="${req.user.id}"`
            db.query(sql,(err,data)=>{
                if(err) throw err
                res.json({msg:"Update Success"})
            })
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    EditInfor:async(req,res)=>{
        try {
            const {name,avatar} = req.body
            if(name&&!avatar){
                db.query(`UPDATE user SET name="${name}" WHERE id="${req.user.id}"`,(err)=>{
                    if(err) throw err
                    res.json({msg:"Your info changed"})
                })
            }
            if(avatar&&!name){
                db.query(`UPDATE user SET avatar="${avatar}" WHERE id="${req.user.id}"`,(err)=>{
                    if(err) throw err
                    res.json({msg:"Your info changed"})
                })
            }
            if(avatar&&name){
                db.query(`UPDATE user SET name="${name}",avatar="${avatar}" WHERE id="${req.user.id}"`,(err)=>{
                    if(err) throw err
                    res.json({msg:"Your info changed"})
                })
            }
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    getInfor:async(req,res)=>{
        try {
            const sql =`SELECT * FROM user WHERE id ="${req.user.id}"`
            db.query(sql,(err,data)=>{
                if(err) throw err
                db.query(`SELECT*FROM user.order WHERE id="${req.user.id}"`,async(err,order)=>{
                    if(err) return res.status(400).json({msg:err.message})
                    const count = order.length
                    const totalPrice = order.reduce((total,obj)=> obj.OrderPrice+total,0)               
                    res.json({data,order,count,totalPrice})
                })
            })
           
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    //adminClt//
    getAllUser:async(req,res)=>{
        try {
            const sql =`SELECT * FROM user`
            db.query(sql,(err,data)=>{
                if(err) throw err
                res.json(data)
            })
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    EditUserRole:async(req,res)=>{
        try {
            const {role} = req.body
            db.query(`UPDATE user SET role=${role} WHERE id="${req.params.id}"`,(err,data)=>{
                if(err) return res.status(400).json({msg:err.message})
                console.log(data)
                res.json({msg:"Update Role Success"})
            })
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    DeleteUserInfor:async(req,res)=>{
        try {
            db.query(`DELETE FROM user WHERE id="${req.params.id}"`,(err,data)=>{
                if(err) return res.status(400).json({msg:err.message})
                console.log(data)
                res.json({msg:"Delete Success"})
            })
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    }

}


const createActiveToken = (payload)=>{
    return jwt.sign(payload, process.env.ACTIVE_TOKEN,{expiresIn:"5m"})
}
const createRefreshToken = (payload)=>{
    return jwt.sign(payload, process.env.REFRESH_TOKEN,{expiresIn:"7d"})
}
const createAccessToken = (payload)=>{
    return jwt.sign(payload, process.env.ACCESS_TOKEN,{expiresIn:"10m"})
}
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
module.exports = UserClt