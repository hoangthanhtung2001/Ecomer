const route = require('express').Router()

const paymentClt = require('../controller/paymentsClt')
const auth = require('../midalware/auth')
const admin = require('../midalware/admin')

route.route('/payment')
    .get(auth,admin,paymentClt.getPayments)
    .post(auth,paymentClt.createPayment)

module.exports = route