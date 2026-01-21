document.addEventListener('DOMContentLoaded', function() {

    const optionsSubtitle = {
        strings: ["Desenvolvedor Full Stack."],
        typeSpeed: 70,
        loop: false,
        showCursor: false
    };

    const optionsNome = {
        strings: ["Renan."],
        typeSpeed: 150,
        loop: false,
        showCursor: false,
        onComplete: function() {   
            new Typed('#typing-efeito', optionsSubtitle);
        }
    };

    new Typed('#typing-name', optionsNome);

});