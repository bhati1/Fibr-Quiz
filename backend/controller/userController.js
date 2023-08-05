const User = require('../models/userModels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//  POST user
const createUser = async(req, res) => {
    try {
        const userExists = await User.findOne({email: req.body.email})
        if(userExists)
        {
            return res.status(403).send({message: "User Already Exists", success: false});
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword

        const newUser = new User(req.body)
        await newUser.save()

        res.send({
            message: "New User created successfully",
            success: true
        })

    } catch (error) {

        res.status(500).send({
            message: error.message,
            data: error,
            success: false

        })
        
    }

}

// Login user
const loginUser = async(req, res) => {
    try {
        // check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res
            .status(200)
            .send({ message: "User does not exist", success: false });
        }
    
        // check password
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            return res
            .status(200)
            .send({ message: "Invalid password", success: false });
        }
    
        const token = jwt.sign(
            { userId: user._id }, 'hello',
            { expiresIn: "1d",});
    
        res.send({
            message: "User logged in successfully",
            success: true,
            data: token,
        });
    } catch (error) {
        res.status(500).send({
        message: error.message,
        data: error,
        success: false,
    });
    }    

}

const getUserInfo = async(req,res)=>{
    try {
        const user = await User.findById(req.body.userId);
        res.send({
        message: "User fetched successfully",
        success: true,
        data: user,
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
    createUser,
    loginUser,
    getUserInfo
}