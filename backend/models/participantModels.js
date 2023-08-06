const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quiz",
        required: true
    },
    result: {
        type: Object,
        required: true,
    }
    }, 
    {
        timestamps: true,
    });

const Participant = mongoose.model("participant", participantSchema);
module.exports = Participant;