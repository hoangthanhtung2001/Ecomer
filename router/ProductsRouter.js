const ProductClt = require('../controller/ProductsClt')

const route =require('express').Router()
const auth = require('../midalware/auth')
const admin = require('../midalware/admin')

route.get('/products',ProductClt.GetAllProduct)
route.get('/products/:id',ProductClt.GetProductDetails)

//auth
route.post('/add_cart/:id',auth,ProductClt.AddToCart)
route.get('/cart',auth,ProductClt.CartDetails)
route.delete('/cart/:id',auth, ProductClt.DeleteProductCart)
route.patch('/cart/:id',auth,ProductClt.AddQuantityCart)
//admin
route.patch("/edit/:id",auth,admin,ProductClt.EditProductInfor)
route.delete("/delete/:id",auth,admin,ProductClt.DeleteProduct)
route.post("/add",auth,admin,ProductClt.CreateProduct)
module.exports = route