const router = require('express').Router()

const {
    addQuiz,
    getQuiz,
    getQuizes,
    editQuiz,
    deleteQuiz,
    addQuestions,
    editQuestion,
    deleteQuestion,
    getQuizesbyUser
} = require('../controller/quizController')


const authMiddleware = require('../middlewares/authMiddleware')

router.post('/add', authMiddleware, addQuiz);

router.post('/get-all-exams', authMiddleware, getQuizes)

router.post('/get-exam-by-id', authMiddleware, getQuiz)

router.post('/get-quizes-by-user-id', authMiddleware, getQuizesbyUser)

router.post('/edit-exam-by-id', authMiddleware, editQuiz)

router.post('/delete-exam-by-id', authMiddleware, deleteQuiz)

router.post('/add-questions-to-exam', authMiddleware, addQuestions)

router.post('/edit-questions-in-exam', authMiddleware, editQuestion)

router.post('/delete-questions-in-exam', authMiddleware, deleteQuestion)


module.exports = router