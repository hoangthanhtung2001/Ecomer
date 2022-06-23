const UploadClt = require('../controller/UploadClt')
const route = require('express').Router()
const auth = require('../midalware/auth')
const upload = require('../midalware/upload')
route.post('/upload',upload,auth,UploadClt.UploadImg )

module.exports = route