const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');

const signInUser = async (request, response) => {
    const { email, password } = request.body;

    try {
        const existingUser = await User.findOne({ email });
        
        if(!existingUser) return response.status(404).json({ message: 'User doesn\'t exists.' });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return response.status(400).json({ message: 'Invalid password.' });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        response.status(200).json({ result: existingUser, token });
    } catch (error) {
        response.status(500).json({ message: 'Something went wrong.' });
    };
};

const signUpUser = async (request, response) => {
    const { firstName, lastName, confirmPassword, email, password } = request.body;

    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return response.status(400).json({ message: 'User already exists.' });

        if(password !== confirmPassword) return response.status(400).json({ message: 'Passwords doesn\'t match.' });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        response.status(200).json({ result, token });
    } catch (error) {
        response.status(500).json({ message: 'Something went wrong' });
    };
};

module.exports = {
    signInUser,
    signUpUser,
}
