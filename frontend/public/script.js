//registerrrrrrrr............ (yaay)
if (document.getElementById('register')) {
    document.getElementById('register').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const res = await axios.post('http://localhost:5000/api/users/register', { name, email, password });
            console.log('Registration successful:', res.data);
            alert('Registration successful! You can now log in.');
            window.location.href = 'login.html';
        } catch (err) {
            console.error('Registration error:', err.response.data);
            alert('Registration failed: ' + (err.response.data.msg || 'Unknown error'));
        }
    });
}


if (document.getElementById('login')) {
    document.getElementById('login').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
            console.log('Login successful:', res.data);
            alert('OTP sent, please verify.');
            window.location.href = 'verify-otp.html';
        } catch (err) {
            console.error('Login error:', err.response.data);
            alert('Login failed: ' + (err.response.data.msg || 'Unknown error'));
        }
    });
}


if (document.getElementById('verify-otp')) {
    document.getElementById('verify-otp').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('otp-email').value;
        const otp = document.getElementById('otp').value;

        try {
            const res = await axios.post('http://localhost:5000/api/otp/verify-otp', { email, otp });
            console.log('OTP verification successful:', res.data);
            alert('OTP verification successful! You can now log in.');
            window.location.href = 'game.html';
        } catch (err) {
            console.error('OTP verification error:', err.response.data);
            alert('OTP verification failed: ' + (err.response.data.msg || 'Unknown error'));
        }
    });
}
