const router = require('express').Router()

const {
    createUser,
    loginUser
    } = require('../controller/userController')

//  user registeration
// POST
router.post('/register', createUser)


// Login
router.post('/login', loginUser)


module.exports = router