document.addEventListener('DOMContentLoaded', function(){

    emailjs.init ('service_adbxu6c');
    //-------
    const contatoFormulario = document.getElementById('contato-formulario');
    const statusFormulario = this.getElementById('formulario-status');
    //--------

    contatoFormulario.addEventListener('submit', function(event){
        event.preventDefault();

        statusFormulario.textContent = 'Enviando...';
        statusFormulario.style.colo = '#333';

        emailjs.sendForm('xNJssMe-789Hh2ywx', 'template_utwglwx', this)
        .then(function(response){
            console.log('SUCESSO!', response.status, response.text);
            statusFormulario.textContent = 'Mensagem enviada com sucesso!';
            statusFormulario.style.color = 'green';

            contatoFormulario.reset();

        }, function(error){
            console.log('FALHOU...', error);
            statusFormulario.textContent = 'Ocorreu um erro. Tente Novamente.'
            statusFormulario.style.color = 'red';
        }
        )
    
    })



}
)