function registerUser(nome, email, senha, conf_senha) {
    console.log('Sending registration data:', { nome, email, senha, conf_senha });
    fetch('https://hook.us2.make.com/hj54w3yufwikhztosc022101i5c9w90q', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            "nome": nome, 
            "email": email, 
            "senha": senha, 
            "conf_senha": conf_senha 
        })
    })
    .then(response => response.text())
    .then(text => {
        try {
            const cleanedText = text.replace(/,\s*}$/, '}');
            const data = JSON.parse(cleanedText);
            console.log('Registration:', data);
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error parsing JSON:', error, 'Response text:', text);
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
    });
}

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const conf_senha = document.getElementById('conf_senha').value;

    registerUser(nome, email, senha, conf_senha);
});

function showForm(formId) {
    const forms = document.querySelectorAll('.form');
    forms.forEach(form => form.classList.remove('active'));

    document.getElementById(formId).classList.add('active');
}

showForm('loginForm');

function voltarPagina() {
    window.location.href = 'index.html';
}
