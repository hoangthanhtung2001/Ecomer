const Category = require('../models/Category')
const Products = require('../models/Products')

const categoryCtl = {
    getCategory:async(req,res)=>{
        try {
            const category = await Category.find()
            res.json(category)
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    createCategory:async(req,res)=>{
        try {
            const {name}=req.body;
            const category = await Category.findOne({name})
            if(category) return res.status(400).json({msg:"This catecory is already exits"})
            const newCategory = new Category({name})
            await newCategory.save()
            res.json({msg:"Created a Category"})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    deleteCategory:async(req,res)=>{
        try {
            const products = await Products.findOne({category:req.params.id})
            if(products) return res.status(400).json({msg:"Please delete all products with a relationship."})

            await Category.findByIdAndDelete(req.params.id)
            res.json({msg:"Deleted a Category"})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    updateCategory:async(req,res)=>{
        try {
            const {name} = req.body;
            await Category.findOneAndUpdate({_id:req.params.id},{name})
            res.json({msg:"Update Success"})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    }
}

module.exports = categoryCtl