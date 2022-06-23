const Product = require('../models/Products')
const mysql = require('mysql2')
const futureApis = require('./featureApis')
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
const ProductClt ={
    GetAllProduct: async(req,res)=>{
        try {
            const future = new futureApis(Product.find(),req.query).pageting().filtering()
            const result = await Promise.allSettled([
                future.query,
                Product.countDocuments()
            ])
            const products = result[0].status ==='fulfilled'?result[0].value:[]
            const count = result[1].status ==='fulfilled'?result[1].value:0
            res.json({products,count})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    GetProductDetails:async(req,res)=>{
        try {
            const product = await Product.findById(req.params.id)
            res.json({product})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    //auth
    AddToCart:async(req,res)=>{
        try {
            const product = await Product.findById(req.params.id)
            if(product){
                db.query(`INSERT INTO user.order (OrderId,OrderPrice, OrderImg, OrderName, id) VALUES ("${product._id}",${product.price},"${product.image}","${product.title}","${req.user.id}")`,(err)=>{
                    if(err) return res.status(400).json({msg:err.message})
                    db.query(`SELECT*FROM user.order WHERE id="${req.user.id}"`,async(err,data)=>{
                        if(err) return res.status(400).json({msg:err.message})            
                        res.json({msg:"Add To Cart Success",data})
                    })
                   
                    
                 })
            }
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    CartDetails:async(req,res)=>{
        try {
            db.query(`SELECT*FROM user.order WHERE id="${req.user.id}"`,async(err,data)=>{
                if(err) return res.status(400).json({msg:err.message})
                const count = data.length
                const total = data.reduce((total,obj)=> obj.OrderPrice+total,0)    
                const totalPrice  = parseFloat(total).toFixed(2)         
                res.json({data,count,totalPrice})
            })

        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    DeleteProductCart:async(req,res)=>{
        try {
            db.query(`DELETE FROM user.order WHERE OrderId="${req.params.id}" AND id="${req.user.id}"`,(err)=>{
                if(err) return res.status(400).json({msg:err.message})
                db.query(`SELECT*FROM user.order WHERE id="${req.user.id}"`,async(err,data)=>{
                    if(err) return res.status(400).json({msg:err.message})
                    const count = data.length
                    const totalPrice = data.reduce((total,obj)=> obj.OrderPrice+total,0)               
                    res.json({msg:"Delete Success",data})
                })
                
            })
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    AddQuantityCart:async(req,res)=>{
            const{quantity} = req.body
            const product = await Product.findById(req.params.id)
        try {
                db.query(`UPDATE user.order SET OrderQuantity=${quantity} WHERE id="${req.user.id}" AND OrderId="${product._id}"`,(err)=>{
                    if(err) return res.status(400).json({msg:err.message})
                    db.query(`SELECT OrderQuantity,OrderPrice FROM user.order WHERE id="${req.user.id}" AND OrderId="${product._id}"`,(err,data)=>{
                        if(err) return res.status(400).json({msg:err.message})
                        db.query(`UPDATE user.order SET OrderPrice=${data[0].OrderPrice}*${data[0].OrderQuantity} WHERE id="${req.user.id}" AND OrderId="${product._id}" `,(err)=>{
                            if(err) return res.status(400).json({msg:err.message})
                            res.json({msg:"Quantity Update Success"})
                        })
                    })
                })      
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    //admin
    EditProductInfor:async(req,res)=>{
        try {
            const {title,description,image,price,category} = req.body
            await Product.findByIdAndUpdate({_id:req.params.id},{title,description,image,price,category})
            res.json({msg:"Update Success"})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    DeleteProduct:async(req,res)=>{
        try {
            await Product.findByIdAndDelete({_id:req.params.id})
            res.json({msg:"Delete Success"})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    CreateProduct:async(req,res)=>{
        try {
            const {title,description,image,price,category} = req.body
            const newProduct = new Product({
                title,description,image,price,category
            })
            await newProduct.save()
            res.json({msg:"Create Success"})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    }
}

module.exports = ProductClt