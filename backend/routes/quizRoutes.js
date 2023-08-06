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
const quizAuthMiddleware = require('../middlewares/createdbyUserQuizMiddleware')

router.post('/add', authMiddleware, addQuiz);

router.post('/get-all-quizes', authMiddleware, getQuizes)

router.post('/get-quiz-by-id', authMiddleware, getQuiz)

router.post('/get-quizes-by-user-id', authMiddleware, getQuizesbyUser)

router.post('/edit-quiz-by-id', authMiddleware, quizAuthMiddleware, editQuiz)

router.post('/delete-quiz-by-id', authMiddleware, quizAuthMiddleware, deleteQuiz)

router.post('/add-questions-to-exam', authMiddleware, quizAuthMiddleware, addQuestions)

router.post('/edit-questions-in-exam', authMiddleware, quizAuthMiddleware, editQuestion)

router.post('/delete-questions-in-exam', authMiddleware, quizAuthMiddleware,deleteQuestion)

router.post('/get-user-for-quiz-id', authMiddleware, quizAuthMiddleware, getUserforQuiz)

router.post('./get-user-for-question-id', authMiddleware, quizAuthMiddleware, getUserforQuestion)


module.exports = router