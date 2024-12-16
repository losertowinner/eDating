const jwt = require('jsonwebtoken');

const User = require('../models/user');

const checkAuth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized - No token provided'
            })
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)

        if (!verified) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized - No token provided'
            })
        }

        const currentUser = await User.findById(verified.id);
        req.user = currentUser
        next();
    } catch (error) {
        console.log(`Error in auth middleware...${error}`)
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized'
            })
        } else {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
}


module.exports = checkAuth