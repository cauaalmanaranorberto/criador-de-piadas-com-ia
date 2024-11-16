function fetchJoke(tema) {
    console.log('Fetching joke with theme:', tema);
    return fetch('https://hook.us2.make.com/u35yv9w6gi60lu7rw43rpg93rkzpfgic', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tema: tema })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Joke:', data);
        return data.piada;
    })
    .catch(error => {
        console.error('Error fetching joke:', error);
        throw error;
    });
}

new Vue({
    el: '#app',
    data: {
        comando: '',
        resultado: ''
    },
    methods: {
        executarComando() {
            fetchJoke(this.comando)
                .then(joke => {
                    this.resultado = joke;
                })
                .catch(error => {
                    this.resultado = 'Erro ao buscar piada';
                });
        }
    }
});