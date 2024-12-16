const User = require('../models/user');

const changePassword = async (req, res) => {
    const { password, newPassword } = req.body

    if (!password || !newPassword) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        })
    }

    if (password === newPassword) {
        return res.status(400).json({
            success: false,
            message: 'Password and new password cannot be the same',
        });
    }

    try {
        const user = await User.findById(req.user.id).select('+password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect',
            });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password updated successfully',
        });
    } catch (error) {
        console.error(`Error in change password controller...${error}`);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
}

module.exports = {
    changePassword
}