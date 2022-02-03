const express = require('express');

const {
    signInUser,
    signUpUser,
} = require('../controllers/users');

const router = express.Router();

router.post('/users/signin', signInUser).post('/users/signup', signUpUser);

module.exports = router;
