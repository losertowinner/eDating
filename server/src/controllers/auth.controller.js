const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })
}

const signUp = async (req, res) => {
    const { username, email, password } = req.body

    try {
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const newUser = await User.create({
            username,
            email,
            password
        })

        const token = signToken(newUser._id);
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV == 'production'
        })

        res.status(201).json({
            success: true,
            data: newUser
        })
    } catch (error) {
        console.log(`Error in signup controller...${error}`)
        res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

const logIn = async () => {

}

const logOut = async () => {

}


module.exports = {
    signUp,
    logIn,
    logOut,
}