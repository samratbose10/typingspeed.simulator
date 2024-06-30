const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password, slackId } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
            slackId,
            isVerified: false
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(200).send('Registration successful!');
    } catch (err) {
        console.error('Server error during registration:', err.message);
        res.status(500).send('Server error');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Send OTP for verification
        const otpRes = await axios.post('http://localhost:5000/api/otp/send-otp', { email });
        if (otpRes.status === 200) {
            res.status(200).send('OTP sent, please verify.');
        } else {
            res.status(500).send('Error sending OTP');
        }
    } catch (err) {
        console.error('Server error during login:', err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error('Server error fetching users:', err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
