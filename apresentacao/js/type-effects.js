document.addEventListener('DOMContentLoaded', function() {

    const optionsSubtitle = {
        strings: ["Desenvolvedor Front-end."],
        typeSpeed: 70,
        loop: true
    };

    const optionsNome = {
        strings: ["Renan."],
        typeSpeed: 150,
        loop: false,
        showCursor: false,
        onComplete: function() {
            // Apenas iniciamos a segunda animação, sem guardar em constante
            new Typed('#typing-efeito', optionsSubtitle);
        }
    };

    // Apenas iniciamos a primeira animação, sem guardar em constante
    new Typed('#typing-name', optionsNome);

});