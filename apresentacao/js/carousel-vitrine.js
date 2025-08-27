/* =============================================== */
/* ARQUIVO: carousel.js (VERSÃO COM LOOP INFINITO) */
/* =============================================== */

document.addEventListener('DOMContentLoaded', function () {

    const track = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');

    if (!track) return;

    const slides = Array.from(track.children);
    const originalSlidesCount = slides.length;
    let isTransitioning = false; // "Trava" para evitar cliques múltiplos durante a animação
    let currentIndex;

    // Função para configurar o carrossel (clonar slides e posicionar)
    const setupCarousel = () => {
        // Limpa clones antigos para o caso de redimensionamento da janela
        while (track.firstChild) {
            track.removeChild(track.firstChild);
        }
        slides.forEach(slide => track.appendChild(slide));

        const currentSlides = Array.from(track.children);
        let slidesVisiveis = getSlidesVisiveis();

        // 1. O TRUQUE: Clonar os slides
        // Clona os primeiros slides e adiciona no final
        for (let i = 0; i < slidesVisiveis; i++) {
            track.appendChild(currentSlides[i].cloneNode(true));
        }
        // Clona os últimos slides e adiciona no começo
        for (let i = originalSlidesCount - 1; i >= originalSlidesCount - slidesVisiveis; i--) {
            track.prepend(currentSlides[i].cloneNode(true));
        }

        // 2. A POSIÇÃO INICIAL
        // Começamos nos primeiros slides *reais*, que agora estão no meio da "prateleira mágica".
        currentIndex = slidesVisiveis;
        const slideWidth = currentSlides[0].getBoundingClientRect().width;
        track.style.transition = 'none'; // Sem animação para o posicionamento inicial
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }

    const getSlidesVisiveis = () => {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 900) return 2;
        return 3;
    }

    const moveTrack = () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }

    // Eventos de clique
    nextButton.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        moveTrack();
    });

    prevButton.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        moveTrack();
    });

    // 3. O TELETRANSPORTE MÁGICO
    // Este evento é disparado QUANDO a animação de transição TERMINA.
    track.addEventListener('transitionend', () => {
        isTransitioning = false;
        const slidesVisiveis = getSlidesVisiveis();
        const slideWidth = slides[0].getBoundingClientRect().width;

        // Se chegamos nas cópias do final...
        if (currentIndex >= originalSlidesCount + slidesVisiveis) {
            track.style.transition = 'none'; // Desliga a animação
            currentIndex = slidesVisiveis; // Pula para os slides reais do começo
            track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
        }

        // Se chegamos nas cópias do começo...
        if (currentIndex < slidesVisiveis) {
            track.style.transition = 'none'; // Desliga a animação
            currentIndex = originalSlidesCount + currentIndex; // Pula para os slides reais do final
            track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
        }
    });

    // Configuração inicial e reajuste em caso de redimensionamento
    setupCarousel();
    window.addEventListener('resize', setupCarousel);
});
