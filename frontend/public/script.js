document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const recaptchaResponse = grecaptcha.getResponse();

    if (!recaptchaResponse) {
        alert('Please complete the reCAPTCHA.');
        return;
    }

    try {
        const res = await axios.post('http://localhost:5000/api/users/login', { email, password, recaptcha: recaptchaResponse });
        console.log('Login successful:', res.data);
        alert('Login successful!');
        window.location.href = 'game.html';
    } catch (err) {
        console.error('Login error:', err.response.data);
        alert('Login failed: ' + err.response.data.msg);
    }
});
