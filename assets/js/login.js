function loginUser(email, senha) {
    console.log('Sending login data:', { email, senha });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    fetch('https://hook.us2.make.com/w477lqahuysbymwoefaf4q89iow7ibxl', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha }),
        signal: controller.signal
    })
    .then(response => {
        clearTimeout(timeoutId);
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error('Failed to login, status code: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Login successful:', data);
        window.location.href = 'gerador.html';
    })
    .catch(error => {
        if (error.name === 'AbortError') {
            console.error('Login request timed out');
            alert('Login request timed out. Please try again.');
        } else {
            console.error('Error during login:', error);
            alert('Login failed: ' + error.message);
        }
    });
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    loginUser(email, senha);
}

