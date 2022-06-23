const route = require('express').Router()

const categoryCtl = require('../controller/categoryCls')
const auth = require('../midalware/auth')
const admin = require('../midalware/admin')

route.route('/category')
    .get(categoryCtl.getCategory)
    .post(auth,admin,categoryCtl.createCategory)
route.route('/category/:id')
    .delete(auth,admin,categoryCtl.deleteCategory)
    .patch(auth,auth,categoryCtl.updateCategory)
module.exports = route