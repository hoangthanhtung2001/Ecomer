const fs = require('fs')
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET
})
const UploadClt = {
    UploadImg:async(req,res)=>{
        try {
            const file = req.files.file;
            cloudinary.v2.uploader.upload(file.tempFilePath,{folder:"avatar"},async(err,result)=>{
                if(err){
                    fileRemove(file.tempFilePath)
                    return err
                }
                res.json({url:result.secure_url})
            })
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    }
}

const fileRemove =(path)=>{
    fs.unlink(path,err=>{
        if(err) throw err
    })
}

module.exports = UploadClt