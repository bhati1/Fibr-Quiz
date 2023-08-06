const Question = require("../models/questionModels");
const Quiz = require('../models/quizModels')

// Post quiz
const addQuiz = async(req,res) => {

    try {
        // check if quiz already exists
        const quizExists = await Quiz.findOne({ name: req.body.name });
        if (quizExists) {
            return res
            .status(200)
            .send({ message: "quiz already exists", success: false });
        }
        req.body.questions = [];
        req.body.createdByUserId = req.body.userId;
        const newQuiz = new Quiz(req.body);
        await newQuiz.save();
        res.send({
            message: "quiz added successfully",
            data: newQuiz,
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        }); return;
}
}

// Get all Quizes
const getQuizes = async(req,res)=>{
    try {
        const quizs = await Quiz.find({});
        res.send({
            message: "quizs fetched successfully",
            data: quizs,
            success: true,
        });
} catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        }); return;
}
}

// get quize by id
const getQuiz = async(req, res)=>{
    try {
        const quiz = await Quiz.findById(req.body.quizId).populate("questions");
        res.send({
            message: "quiz fetched successfully",
            data: quiz,
            success: true,
        }); 
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        }); return;
    } 
}

// Get quizes by a particular user
const getQuizesbyUser = async(req, res)=>{
    try {
        const quiz = await Quiz.findById(req.body.userId).populate("name");
        res.send({
            message: "quiz fetched successfully",
            data: quiz,
            success: true,
        }); 
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        }); return;
    } 
}


const editQuiz = async(req,res)=>{
    try {
        await Quiz.findByIdAndUpdate(req.body.quizId, req.body);
        res.send({
            message: "quiz edited successfully",
            data: req.body,
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        }); return;
    }
    
}

const deleteQuiz = async(req,res)=>{
    try {
        await Quiz.findByIdAndDelete(req.body.quizId);
        res.send({
            message: "quiz deleted successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        }); return;
    }
}

const addQuestions = async(req,res)=>{
    try {
        // add question to Questions collection
        req.body.createdByUserId = req.body.userId;
        const newQuestion = new Question(req.body);
        const question = await newQuestion.save();
    
        // add question to quiz
        const quiz = await Quiz.findById(req.body.quizId);
        quiz.questions.push(question._id);
        await quiz.save();
        res.send({
            message: "Question added successfully",
            data: quiz.questions,
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        }); return;
    }
}

const editQuestion = async(req,res)=>{
    try {
        // edit question in Questions collection
        await Question.findByIdAndUpdate(req.body.questionId, req.body);
        res.send({
            message: "Question edited successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        }); return;
    }
}

const deleteQuestion = async(req,res)=>{
    try {
        // delete question in Questions collection
        await Question.findByIdAndDelete(req.body.questionId);

        // delete question in quiz
        const quiz = await Quiz.findById(req.body.quizId);
        quiz.questions = quiz.questions.filter(
        (question) => question._id != req.body.questionId
        );
        await quiz.save();
        res.send({
            message: "Question deleted successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        }); return;
    
    }
}

const getUserforQuiz = async(req, res)=>{
    try {
        const userId = await Quiz.findById(req.body.quizId).populate("createdByUserId");
        res.send({
            message: "user fetched for quiz successfully",
            data: userId,
            success: true,
        }); 
        
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        }); return;
    }

}
const getUserforQuestion = async(req, res)=>{
    try {
        const userId = await Question.findById(req.body.questionId).populate("createdByUserId")
        res.send({
            message: "user fetched for question successfully",
            data: userId,
            success: true,
        }); 
        
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        }); return;
    }

}

module.exports = {
    addQuiz,
    getQuiz,
    getQuizes,
    editQuiz,
    deleteQuiz,
    addQuestions,
    editQuestion,
    deleteQuestion,
    getQuizesbyUser,
    getUserforQuiz,
    getUserforQuestion

}