document.addEventListener('DOMContentLoaded', function(){

    //Chaves e Ids EmailJS
    const public_key = 'xNJssMe-789Hh2ywx';
    const service_Id = 'service_adbxu6c';
    const template_Id = 'template_utwglwx';

    emailjs.init(public_key);

    // elementos DOM selecionados
    const contatoFormulario = document.getElementById('contato-formulario');
    const statusFormulario = document.getElementById('status-formulario');
    const emailInput = document.getElementById('email');

    // Escuta e prevent

    contatoFormulario.addEventListener('submit', function(event) {
        event.preventDefault();

        // REGEX validacao de e-mail
        const emailRegex = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);

        // caso nao seja valido
        if(!emailRegex.test(emailInput.value)) {
            statusFormulario.textContent = 'Por favor, insira um e-mail válido.';
            statusFormulario.style.color = 'red';
            return;
        }

        statusFormulario.textContent = 'Enviando...';
        statusFormulario.style.color = '#333';

        // função sendForm

        emailjs.sendForm(service_Id, template_Id, this)
            .then(function(){
                statusFormulario.textContent = 'Mensagem enviada com sucesso!';
                statusFormulario.style.color = 'green'
                contatoFormulario.reset();
            })
            .catch(function(error) {
                console.log('Falhou...', error);
                statusFormulario.textContent = 'Ocorreu um erro tente novamente...'
                statusFormulario.style.color = 'red';
            });  

    });
});