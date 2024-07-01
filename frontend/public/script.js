document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    if (document.getElementById('register')) {
        document.getElementById('register').addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Register form submitted');

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const slackId = document.getElementById('slackId').value;
            const recaptchaToken = grecaptcha.getResponse();

            if (!recaptchaToken) {
                alert('Please complete the reCAPTCHA');
                return;
            }

            console.log('Register data:', { name, email, password, slackId, recaptchaToken });

            try {
                const res = await axios.post('http://localhost:5000/api/users/register', {
                    name, email, password, slackId, recaptchaToken
                });
                console.log('Registration response:', res.data);
                alert('Registration successful! You can now log in.');
                window.location.href = 'login.html';
            } catch (err) {
                console.error('Registration error:', err.response ? err.response.data : err);
                alert('Registration failed: ' + (err.response.data.msg || 'Unknown error'));
            }
        });
    }

    if (document.getElementById('login')) {
        document.getElementById('login').addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Login form submitted');

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const recaptchaToken = grecaptcha.getResponse();

            if (!recaptchaToken) {
                alert('Please complete the reCAPTCHA');
                return;
            }

            console.log('Login data:', { email, password, recaptchaToken });

            try {
                const res = await axios.post('http://localhost:5000/api/users/login', {
                    email, password, recaptchaToken
                });
                console.log('Login response:', res.data);
                alert('Login successful!');
                window.location.href = 'game.html';
            } catch (err) {
                console.error('Login error:', err.response ? err.response.data : err);
                alert('Login failed: ' + (err.response.data.msg || 'Unknown error'));
            }
        });
    }
});
