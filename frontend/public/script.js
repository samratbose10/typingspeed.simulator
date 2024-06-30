if (document.getElementById('register')) {
    document.getElementById('register').addEventListener('submit', async (e) => {
        e.preventDefault()
        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const recaptchaToken = grecaptcha.getResponse()

        try {
            const res = await axios.post('http://localhost:5000/api/users/register', { name, email, password, recaptchaToken })
            alert('Registration successful! You can now log in.')
            window.location.href = 'login.html'
        } catch (err) {
            alert('Registration failed: ' + (err.response.data.msg || 'Unknown error'))
        }
    })
}

if (document.getElementById('login')) {
    document.getElementById('login').addEventListener('submit', async (e) => {
        e.preventDefault()
        const email = document.getElementById('login-email').value
        const password = document.getElementById('login-password').value
        const recaptchaToken = grecaptcha.getResponse()

        try {
            const res = await axios.post('http://localhost:5000/api/users/login', { email, password, recaptchaToken })
            alert('Login successful!')
            window.location.href = 'game.html'
        } catch (err) {
            alert('Login failed: ' + (err.response.data.msg || 'Unknown error'))
        }
    })
}
