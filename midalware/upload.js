const fs = require('fs')


const upload = async(req,res,next)=>{
    try {
        if(!req.files || Object.keys(req.files).length ===0)
            return res.status(400).json({msg:"No file"})
        const file = req.files.file
        if(file.size >1024*1024){
            fileRemove(file.tempFilePath)
            return res.status(400).json({msg:"File To large"})
        }
        if(file.mimetype !=='image/jpeg' && file.mimetype !=='image/png'){
            fileRemove(file.tempFilePath)
            return res.status(400).json({msg:"File Format incorrect"})
        }
        next()
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}

const fileRemove = (path)=>{
     fs.unlink(path,err=>{
        if(err) throw err
    })
}

module.exports = upload