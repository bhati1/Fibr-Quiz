const router = require('express').Router()

const {
    createUser,
    loginUser
    } = require('../controller/userController')
const authMiddleware = require('../middlewares/authMiddleware')

//  user registeration
// POST
router.post('/register', createUser)


// Login
router.post('/login', loginUser)


module.exports = router