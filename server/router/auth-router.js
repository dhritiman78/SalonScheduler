const express = require('express')
const router = express.Router()
const authcontrollers = require('../controllers/auth-controller')
router.route('/login').post(authcontrollers.login)
router.route('/registration').post(authcontrollers.registration)

// Export the router
module.exports = router