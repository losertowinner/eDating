const express = require('express');

const { logIn, signUp, logOut } = require('../controllers/auth.controller');

const router = express.Router()

router.post('/login', logIn)
router.post('/signup', signUp)
router.post('/logout', logOut)

module.exports = router