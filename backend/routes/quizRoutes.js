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
    getQuizesbyUser,
    getUserforQuestion,
    getUserforQuiz
} = require('../controller/quizController')


const authMiddleware = require('../middlewares/authMiddleware')

router.post('/add', authMiddleware, addQuiz);

router.post('/get-all-quizes', authMiddleware, getQuizes)

router.post('/get-quiz-by-id', authMiddleware, getQuiz)

router.post('/get-quizes-by-user-id', authMiddleware, getQuizesbyUser)

router.post('/edit-quiz-by-id', authMiddleware, editQuiz)

router.post('/delete-quiz-by-id', authMiddleware, deleteQuiz)

router.post('/add-questions-to-exam', authMiddleware, addQuestions)

router.post('/edit-questions-in-exam', authMiddleware, editQuestion)

router.post('/delete-questions-in-exam', authMiddleware, deleteQuestion)

router.post('/get-user-for-quiz-id', authMiddleware, getUserforQuiz)

router.post('./get-user-for-question-id', authMiddleware, getUserforQuestion)


module.exports = router