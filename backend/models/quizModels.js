const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    totalMarks: {
        type: Number,
        required: true,
        },

    passingMarks: {
        type: Number,
        required: true,
    },
    questions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "question",
        required: true,
    },
    },
    {
        timestamps: true,
    }
);

const Quiz = mongoose.model("quiz", examSchema);
module.exports = Quiz;