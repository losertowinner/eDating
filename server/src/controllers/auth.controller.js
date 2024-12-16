const jwt = require('jsonwebtoken');

const User = require('../models/user');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
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

const logIn = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            })
        }

        const token = signToken(user._id)

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV == 'production'
        })

        res.status(200).json({
            success: true,
            access_token: token
        })

    } catch (error) {
        console.log(`Error in login controller...${error}`)
        res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

const logOut = async (req, res) => {
    res.clearCookie("jwt")

    res.status(200).json({
        success: true,
        message: 'Logout successfully'
    })
}


module.exports = {
    signUp,
    logIn,
    logOut,
}