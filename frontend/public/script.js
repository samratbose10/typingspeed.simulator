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

    const emailInput = document.getElementById('login-email');
    const emailContainer = document.getElementById('email-container');
    const passwordContainer = document.getElementById('password-container');
    const loginButton = document.querySelector('button[type="submit"]');
    const initialText = document.getElementById('initial-text');
    const backgroundContainer = document.getElementById('background-container');

    if (emailInput) {
        emailInput.addEventListener('input', (e) => {
            if (e.target.value.includes('@')) {
                passwordContainer.classList.remove('hidden');
                backgroundContainer.classList.remove('unblurred');
                backgroundContainer.classList.add('blurred');
                setTimeout(() => {
                    passwordContainer.style.opacity = 1;
                    passwordContainer.style.transform = 'translateY(0)';
                    loginButton.classList.add('show');
                }, 10);
            }
        });

        setTimeout(() => {
            emailContainer.classList.remove('hidden');
            emailInput.focus();
        }, 6000);
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const recaptchaResponse = grecaptcha.getResponse();

            if (!recaptchaResponse) {
                alert('Please complete the reCAPTCHA.');
                return;
            }

            const requestData = { email, password, recaptcha: recaptchaResponse };
            console.log('Submitting login request with:', requestData);

            try {
                const res = await axios.post('http://localhost:5000/api/users/login', requestData);
                console.log('Login successful:', res.data);
                alert('Login successful!');
                window.location.href = 'game.html';
            } catch (err) {
                console.error('Login error:', err.response.data);
                alert('Login failed: ' + err.response.data.msg);
            }
        });
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
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

            const requestData = { name, email, password, slackId, recaptcha: recaptchaResponse };
            console.log('Submitting registration request with:', requestData);

            try {
                const res = await axios.post('http://localhost:5000/api/users/register', requestData);
                console.log('Registration successful:', res.data);
                alert('Registration successful! You can now log in.');
                window.location.href = 'login.html';
            } catch (err) {
                console.error('Registration error:', err.response.data);
                alert('Registration failed: ' + err.response.data.msg);
            }
        });
    }
});
