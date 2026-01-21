// Encapslumento e alterações de chaves para segurança dos dados.
(function() {

    if (typeof EMAILJS_CONFIG === 'undefined') {
        console.warn('Aviso: Configurações do EmailJS não encontradas. Verifique o arquivo config.js.');
        return;
    }

    // Chave Pública encapsulada
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

    document.addEventListener('DOMContentLoaded', function(){
        const contatoFormulario = document.getElementById('contato-formulario');
        const statusFormulario = document.getElementById('status-formulario');
        const emailInput = document.getElementById('email');

        if (!contatoFormulario) return;

        contatoFormulario.addEventListener('submit', function(event) {
            event.preventDefault();

            //  Regex
            const emailRegex = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);

            if(!emailRegex.test(emailInput.value)) {
                statusFormulario.textContent = 'Por favor, insira um e-mail válido.';
                statusFormulario.style.color = 'red';
                return;
            }

            statusFormulario.textContent = 'Enviando...';
            statusFormulario.style.color = '#333';

            // Envio do formulário usando as IDs protegidas no EMAILJS_CONFIG
            emailjs.sendForm(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, this)
                .then(function(){
                    statusFormulario.textContent = 'Mensagem enviada com sucesso!';
                    statusFormulario.style.color = 'green';
                    contatoFormulario.reset();
                })
                .catch(function(error) {
                    console.error('Falha no envio:', error);
                    statusFormulario.textContent = 'Ocorreu um erro, tente novamente.';
                    statusFormulario.style.color = 'red';
                });  
        });
    });
})();