const Payments = require('../models/PaymentModels')
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

const Products = require('../models/Products')

const paymentClt = {
    getPayments:async(req,res)=>{
        try {
            const payments = await Payments.find()
            res.json(payments)
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    createPayment:async(req,res)=>{
        try {
            db.query(`SELECT * FROM user.user WHERE id="${req.user.id}"`,async(err,data)=>{
                if(err) return res.status(400).json({msg:err.message})
                if(!data[0]) return res.status(400).json({msg:"User doest not exist"})
                const {cart,paymentID,address} = req.body
                const {id,name,email} = data[0]
                const newPayment = new Payments({
                    user_id: id,name,email,cart,paymentID,address
                })
                cart.filter(item=>{
                    return sold(item.id,item.quantity,item.sold)
                })
                await newPayment.save()
                res.json({msg:"Payment Success"})
            })
           
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    }
}

const sold = async (id, quantity, oldSold) =>{
    await Products.findOneAndUpdate({_id: id}, {
        sold: quantity + oldSold
    })
}

module.exports = paymentClt