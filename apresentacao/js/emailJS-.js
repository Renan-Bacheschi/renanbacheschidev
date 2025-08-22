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
})