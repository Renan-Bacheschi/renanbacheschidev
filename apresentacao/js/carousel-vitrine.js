
document.addEventListener('DOMContentLoaded', function() {
    
    
    const track = document.querySelector('.carousel-track'); 
    const prevButton = document.querySelector('.carousel-button.prev'); 
    const nextButton = document.querySelector('.carousel-button.next'); 

    if (!track) return; 

    const slides = Array.from(track.children); 
    const originalSlidesCount = slides.length; 
    let isTransitioning = false; 
    let currentIndex; 


    const setupCarousel = () => {

        while (track.firstChild) {
            track.removeChild(track.firstChild);
        }
        slides.forEach(slide => track.appendChild(slide)); 

        const currentSlides = Array.from(track.children);
        let slidesVisiveis = getSlidesVisiveis(); 

    
        for (let i = 0; i < slidesVisiveis; i++) {
            track.appendChild(currentSlides[i].cloneNode(true));
        }

        for (let i = originalSlidesCount - 1; i >= originalSlidesCount - slidesVisiveis; i--) {
            track.prepend(currentSlides[i].cloneNode(true));
        }

       
        currentIndex = slidesVisiveis;
        const slideWidth = currentSlides[0].getBoundingClientRect().width;
        track.style.transition = 'none'; 
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

   
    track.addEventListener('transitionend', () => {
        isTransitioning = false; 
        const slidesVisiveis = getSlidesVisiveis();
        const slideWidth = slides[0].getBoundingClientRect().width;

   
        if (currentIndex >= originalSlidesCount + slidesVisiveis) {
            track.style.transition = 'none'; 
            currentIndex = slidesVisiveis; 
            track.style.transform = `translateX(-${slideWidth * currentIndex}px)`; 
        }


        if (currentIndex < slidesVisiveis) {
            track.style.transition = 'none';
            currentIndex = originalSlidesCount + currentIndex; 
            track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
        }
    });
    
   
    setupCarousel();

    window.addEventListener('resize', setupCarousel);
});
