const express = require('express');

const checkAuth = require('../middlewares/auth.middleware');
const { changePassword } = require('../controllers/user.controller');

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: users
 *   description: User operations
 */


/**
 * @swagger
 * /users/change-password:
 *   patch:
 *     description: Change the user's password
 *     tags:
 *       - users
 *     requestBody:
 *       description: Old password and new password required to change the password.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: Current password of the user.
 *               newPassword:
 *                 type: string
 *                 description: New password for the user.
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid request or passwords do not match
 *       401:
 *         description: Unauthorized (Incorrect current password)
 *       500:
 *         description: Server error
 */

router.patch('/change-password', checkAuth, changePassword)

module.exports = router