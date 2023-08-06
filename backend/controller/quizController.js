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
        const newQuiz = new Quiz(req.body);
        await newQuiz.save();
        res.send({
            message: "quiz added successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
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
        });
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
        });
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
        });
    } 
}


const editQuiz = async(req,res)=>{
    try {
        await Quiz.findByIdAndUpdate(req.body.quizId, req.body);
        res.send({
            message: "quiz edited successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
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
        });
    }
}

const addQuestions = async(req,res)=>{
    try {
        // add question to Questions collection
        const newQuestion = new Question(req.body);
        const question = await newQuestion.save();
    
        // add question to quiz
        const quiz = await Quiz.findById(req.body.quizId);
        quiz.questions.push(question._id);
        await quiz.save();
        res.send({
            message: "Question added successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
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
        });
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
        });
    
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
    getQuizesbyUser

}