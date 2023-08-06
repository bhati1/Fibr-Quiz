const Participant = require("../models/participantModels");
const Quiz = require('../models/quizModels')



// participate in the quiz
const participateinQuiz = async(req,res)=>{
    try {
        const newParticipant = new Participant(req.body);
        await newParticipant.save();
        res.send({
            message: "Attempted successfully",
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

const getReportforUser = async(req,res)=>{
    try {
        const reports = await Participant.find({ userId: req.body.userId })
            .populate("quiz")
            .populate("userId")
            .sort({ createdAt: -1 });
        res.send({
            message: "Attempts fetched successfully",
            data: reports,
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

const getReportforQuiz = async(req, res)=>{
    try {
        const reports = await Participant.find({ quizId: req.body.quizId })
            .populate("result")
            .populate("userId")
            .sort({ createdAt: -1 });
        res.send({
            message: "Attempts fetched successfully",
            data: reports,
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
    getReportforUser,
    participateinQuiz,
    getReportforQuiz
}



