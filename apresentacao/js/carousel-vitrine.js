/* ======================================================= */
/* ARQUIVO: carousel.js (Controle Remoto com Canais Infinitos) */
/* ======================================================= */

// A regra principal: "Não use o controle antes da TV estar ligada na tomada".
// O 'DOMContentLoaded' garante que o HTML (a TV) esteja pronto.
document.addEventListener('DOMContentLoaded', function() {
    
    // -------------------------------------------------------
    // PASSO 1: IDENTIFICAR AS PEÇAS DA NOSSA TV E CONTROLE
    // -------------------------------------------------------
    const track = document.querySelector('.carousel-track'); // A "fita de canais" que desliza
    const prevButton = document.querySelector('.carousel-button.prev'); // O botão de "Voltar Canal"
    const nextButton = document.querySelector('.carousel-button.next'); // O botão de "Avançar Canal"

    if (!track) return; // Se a TV não tem a fita de canais, o controle se desliga.

    const slides = Array.from(track.children); // A lista original de canais que você tem.
    const originalSlidesCount = slides.length; // Guardamos o número de canais originais (ex: 5).
    let isTransitioning = false; // Uma "luz de segurança" no controle. Fica acesa enquanto o canal está mudando.
    let currentIndex; // A "memória" do controle, para saber qual canal está na tela.

    // -------------------------------------------------------
    // PASSO 2: O "MODO MÁGICO" - CONFIGURAÇÃO INICIAL
    // -------------------------------------------------------
    // Esta função é o "setup" do nosso controle. É aqui que a mágica do loop infinito acontece.
    const setupCarousel = () => {
        // Limpa a fita de canais para recomeçar (útil se o tamanho da TV mudar).
        while (track.firstChild) {
            track.removeChild(track.firstChild);
        }
        slides.forEach(slide => track.appendChild(slide)); // Coloca os canais originais de volta.

        const currentSlides = Array.from(track.children);
        let slidesVisiveis = getSlidesVisiveis(); // Pergunta: "Quantos canais cabem na tela da TV agora?"

        // O GRANDE TRUQUE DE MÁGICA:
        // Clonamos os primeiros canais e colocamos no FINAL da fita.
        for (let i = 0; i < slidesVisiveis; i++) {
            track.appendChild(currentSlides[i].cloneNode(true));
        }
        // Clonamos os últimos canais e colocamos no COMEÇO da fita.
        for (let i = originalSlidesCount - 1; i >= originalSlidesCount - slidesVisiveis; i--) {
            track.prepend(currentSlides[i].cloneNode(true));
        }

        // A POSIÇÃO INICIAL SECRETA:
        // Ligamos a TV já mostrando os canais *reais*, que agora estão no meio da nossa fita mágica.
        currentIndex = slidesVisiveis;
        const slideWidth = currentSlides[0].getBoundingClientRect().width;
        track.style.transition = 'none'; // Fazemos o posicionamento inicial sem animação (instantâneo).
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }

    // Uma função auxiliar que mede o tamanho da tela da TV.
    const getSlidesVisiveis = () => {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 900) return 2;
        return 3;
    }

    // A função principal do controle: "Mudar de Canal".
    const moveTrack = () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transition = 'transform 0.5s ease-in-out'; // Liga a animação suave de deslize.
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }

    // -------------------------------------------------------
    // PASSO 3: CONECTAR OS BOTÕES FÍSICOS ÀS AÇÕES
    // -------------------------------------------------------
    // "Quando o usuário apertar o botão 'Avançar Canal'..."
    nextButton.addEventListener('click', () => {
        // Se a "luz de segurança" (isTransitioning) estiver acesa, não faz nada.
        // Isso impede que o usuário aperte o botão várias vezes e quebre a animação.
        if (isTransitioning) return;
        isTransitioning = true; // Acende a luz de segurança.
        currentIndex++; // Avança a memória do controle para o próximo canal.
        moveTrack(); // Executa a ação de "Mudar de Canal".
    });

    // "Quando o usuário apertar o botão 'Voltar Canal'..."
    prevButton.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--; // Volta a memória do controle para o canal anterior.
        moveTrack();
    });

    // -------------------------------------------------------
    // PASSO 4: O SENSOR MÁGICO DO "TELETRANSPORTE"
    // -------------------------------------------------------
    // O controle remoto tem um sensor especial ('transitionend') que detecta
    // quando a animação de "Mudar de Canal" TERMINOU.
    track.addEventListener('transitionend', () => {
        isTransitioning = false; // Apaga a "luz de segurança". O controle pode ser usado de novo.
        const slidesVisiveis = getSlidesVisiveis();
        const slideWidth = slides[0].getBoundingClientRect().width;

        // O "TELETRANSPORTE":
        // Se o sensor detectar que chegamos nos canais clonados do FINAL...
        if (currentIndex >= originalSlidesCount + slidesVisiveis) {
            track.style.transition = 'none'; // Desliga a animação.
            currentIndex = slidesVisiveis; // Pula a fita de volta para os canais reais do começo.
            track.style.transform = `translateX(-${slideWidth * currentIndex}px)`; // O pulo é invisível!
        }

        // Se o sensor detectar que chegamos nos canais clonados do COMEÇO...
        if (currentIndex < slidesVisiveis) {
            track.style.transition = 'none';
            currentIndex = originalSlidesCount + currentIndex; // Pula a fita para os canais reais do final.
            track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
        }
    });
    
    // -------------------------------------------------------
    // PASSO 5: CONFIGURAÇÃO FINAL
    // -------------------------------------------------------
    // Executa o "Modo Mágico" pela primeira vez.
    setupCarousel();
    // Diz ao controle para se reconfigurar sozinho se o tamanho da TV mudar.
    window.addEventListener('resize', setupCarousel);
});
