const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const User = require('../models/User');
const OTP = require('../models/OTP'); 

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

router.post('/send-otp', async (req, res) => {
    const { email } = req.body;

    
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });


    const otpEntry = new OTP({ email, otp });
    await otpEntry.save();

    
    let mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Email Verification OTP',
        text: `Your OTP code is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending OTP');
        } else {
            res.status(200).send('OTP sent successfully');
        }
    });
});

router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    const otpEntry = await OTP.findOne({ email, otp });
    if (otpEntry) {

        await User.updateOne({ email }, { isVerified: true });
        await OTP.deleteMany({ email }); 
        res.status(200).send('OTP verified successfully');
    } else {
        res.status(400).send('Invalid OTP');
    }
});

module.exports = router;
