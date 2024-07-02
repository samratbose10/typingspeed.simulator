document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const recaptchaResponse = grecaptcha.getResponse();

            if (!recaptchaResponse) {
                alert('Please complete the CAPTCHA');
                return;
            }

            try {
                const res = await axios.post('http://localhost:5000/api/users/login', {
                    email,
                    password,
                    recaptchaResponse
                });
                alert('Login successful!');
                window.location.href = 'game.html';
            } catch (err) {
                console.error('Login error:', err.response.data);
                alert('Login failed: ' + err.response.data.msg);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const slackId = document.getElementById('slackId').value;
            const recaptchaResponse = grecaptcha.getResponse();

            if (!recaptchaResponse) {
                alert('Please complete the CAPTCHA');
                return;
            }

            try {
                const res = await axios.post('http://localhost:5000/api/users/register', {
                    name,
                    email,
                    password,
                    slackId,
                    recaptchaResponse
                });
                alert('Registration successful! You can now log in.');
                window.location.href = 'login.html';
            } catch (err) {
                console.error('Registration error:', err.response.data);
                alert('Registration failed: ' + err.response.data.msg);
            }
        });
    }
});
