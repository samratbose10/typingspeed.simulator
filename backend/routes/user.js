const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const User = require('../models/User')

const router = express.Router()

const RECAPTCHA_SECRET_KEY = 'your-secret-key'

async function verifyRecaptcha(token) {
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`)
    return response.data.success
}

router.post('/register', async (req, res) => {
    const { name, email, password, slackId, recaptchaToken } = req.body

    try {
        const isHuman = await verifyRecaptcha(recaptchaToken)
        if (!isHuman) {
            return res.status(400).json({ msg: 'reCAPTCHA verification failed' })
        }

        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ msg: 'User already exists' })
        }

        user = new User({
            name,
            email,
            password,
            slackId,
            isVerified: false
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        res.status(200).send('Registration successful!')
    } catch (err) {
        console.error('Server error during registration:', err.message)
        res.status(500).send('Server error')
    }
})

router.post('/login', async (req, res) => {
    const { email, password, recaptchaToken } = req.body

    try {
        const isHuman = await verifyRecaptcha(recaptchaToken)
        if (!isHuman) {
            return res.status(400).json({ msg: 'reCAPTCHA verification failed' })
        }

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
            if (err) throw err
            res.json({ token })
        })
    } catch (err) {
        console.error('Server error during login:', err.message)
        res.status(500).json({ msg: 'Server error' })
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password')
        res.json(users)
    } catch (err) {
        console.error('Server error fetching users:', err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router
