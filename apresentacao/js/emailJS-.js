    document.addEventListener('DOMContentLoaded', function() {
        emailjs.init('xNJssMe-789Hh2ywx');

        const contatoFormulario = document.getElementById('contato-formulario');
        const statusFormulario = document.getElementById('status-formulario');

        contatoFormulario.addEventListener('submit', function(event) {
            event.preventDefault();

            statusFormulario.textContent = 'Enviando...';
            statusFormulario.style.color = '#333';

            emailjs.sendForm('service_adbxu6c', 'template_utwglwx', this)
                .then(function(response) {
                    console.log('SUCESSO!', response.status, response.text);
                    statusFormulario.textContent = 'Mensagem enviada com sucesso!';
                    statusFormulario.style.color = 'green';
                    contatoFormulario.reset();
                }, function(error) {
                    console.log('FALHOU...', error);
                    statusFormulario.textContent = 'Ocorreu um erro. Tente Novamente.';
                    statusFormulario.style.color = 'red';
                });
        });
    });

