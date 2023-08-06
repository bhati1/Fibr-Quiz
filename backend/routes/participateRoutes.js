const router = require('express').Router()

const {
    participateinQuiz,
    getReportforUser,
    getReportforQuiz
    } = require('../controller/participantController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/add', authMiddleware, participateinQuiz)

router.post('/get-report-for-user', authMiddleware, getReportforUser)

// request can only be made by quiz creater
router.post('/get-report-for-quiz', authMiddleware, getReportforQuiz)

module.exports = router