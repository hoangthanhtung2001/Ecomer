const userClt = require('../controller/UserClt')
const route = require('express').Router()
const auth = require('../midalware/auth')
const admin = require('./../midalware/admin')

route.post("/register", userClt.register)
route.post('/active',userClt.activationEmail)
route.post('/login',userClt.login)
route.post('/refresh_token',userClt.getAccessToken)
route.post('/logout',userClt.logout)
route.post('/forgot',userClt.forgotPassword)
route.post('/resest', auth,userClt.resestPassword)
route.patch('/update_infor', auth,userClt.EditInfor)
route.get('/infor',auth,userClt.getInfor)

//Admin Router//
route.get('/all',auth,admin,userClt.getAllUser)
route.patch('/role/:id',auth,admin,userClt.EditUserRole)
route.delete('/delete/:id',auth,admin,userClt.DeleteUserInfor)
module.exports = route