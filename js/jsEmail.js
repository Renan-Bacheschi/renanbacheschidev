// Encapslumento e alterações de chaves para segurança dos dados.
(function() {

    if (typeof emailjsConfig === 'undefined') {
        console.warn('Aviso: Configurações do EmailJS não encontradas. Verifique o arquivo config.js.');
        return;
    }

    // Chave Pública encapsulada
    emailjs.init(emailjsConfig.publicKey);

    document.addEventListener('DOMContentLoaded', function(){
        const contactForm = document.getElementById('contato-formulario');
        const statusForm = document.getElementById('status-formulario');
        const emailInput = document.getElementById('email');

        if (!contactForm) return;

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Regex
            const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

            if(!emailRegex.test(emailInput.value)) {
                statusForm.textContent = 'Por favor, insira um e-mail válido.';
                statusForm.style.color = 'red';
                return;
            }

            statusForm.textContent = 'Enviando...';
            statusForm.style.color = '#333';

            // Envio do formulário usando as IDs protegidas no emailjsConfig
            emailjs.sendForm(emailjsConfig.serviceId, emailjsConfig.templateId, this)
                .then(function(){
                    statusForm.textContent = 'Mensagem enviada com sucesso!';
                    statusForm.style.color = 'green';
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('Falha no envio:', error);
                    statusForm.textContent = 'Ocorreu um erro, tente novamente.';
                    statusForm.style.color = 'red';
                });  
        });
    });
})();