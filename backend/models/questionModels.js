const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    correctOptions: {
        type: [String],
        required: true,
    },
    options: {
        type: Object,
        required: true,
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quiz",
        required: true
    },
    }, 
    {
        timestamps: true,
    });

const Question = mongoose.model("question", questionSchema);
module.exports = Question;