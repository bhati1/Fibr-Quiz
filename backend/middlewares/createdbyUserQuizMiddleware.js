const Quiz = require('../models/quizModels')
module.exports = async(req,res,next)=>{

    try {
        const quiz = await Quiz.findById(req.body.quizId);
    const createdByUserId = quiz.createdByUserId
    if(createdByUserId != req.body.userId)
    {
        res.status(401).send({
            message: "Not authorised Edit/Delete/update for the quiz",
            data: createdByUserId,
            success: false,
        }); return;
    }
    next();
        
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        }); return;
        
    }

    
}