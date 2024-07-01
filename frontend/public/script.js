document.addEventListener('DOMContentLoaded', () => {
    function createStar() {
        const star = document.createElement("div");
        star.classList.add("star");
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 2 + 3}s`;
        document.getElementById("space").appendChild(star);

        setTimeout(() => {
            star.remove();
        }, 5000);
    }

    setInterval(createStar, 100);

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

    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const slackId = document.getElementById('slackId').value;
        const recaptchaResponse = grecaptcha.getResponse();

        if (!recaptchaResponse) {
            alert('Please complete the reCAPTCHA.');
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/users/register', { name, email, password, slackId, recaptcha: recaptchaResponse });
            console.log('Registration successful:', res.data);
            alert('Registration successful! You can now log in.');
            window.location.href = 'login.html';
        } catch (err) {
            console.error('Registration error:', err.response.data);
            alert('Registration failed: ' + err.response.data.msg);
        }
    });
});
