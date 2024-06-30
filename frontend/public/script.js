// regrestaionnn thing sam
if (document.getElementById('register')) {
    document.getElementById('register').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const slackId = document.getElementById('slackId').value;

        try {
            const res = await axios.post('http://localhost:5000/api/users/register', { name, email, password, slackId });
            console.log('Registration successful:', res.data);
            alert('Registration successful! You can now log in.');
            window.location.href = 'login.html';
        } catch (err) {
            console.error('Registration error:', err.response.data);
            alert('Registration failed: ' + (err.response.data.msg || 'Unknown error'));
        }
    });
}