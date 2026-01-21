
document.addEventListener('DOMContentLoaded', function() {
    
    
    const carouselTrack = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');

    if (!carouselTrack) return;

    const carouselSlides = Array.from(carouselTrack.children);
    const originalSlidesCount = carouselSlides.length;
    let isTransitioning = false;
    let currentIndex;

    const setupCarousel = () => {
        while (carouselTrack.firstChild) {
            carouselTrack.removeChild(carouselTrack.firstChild);
        }
        carouselSlides.forEach(slide => carouselTrack.appendChild(slide));
        const currentSlides = Array.from(carouselTrack.children);
        let visibleSlides = getVisibleSlides();
        for (let i = 0; i < visibleSlides; i++) {
            carouselTrack.appendChild(currentSlides[i].cloneNode(true));
        }
        for (let i = originalSlidesCount - 1; i >= originalSlidesCount - visibleSlides; i--) {
            carouselTrack.prepend(currentSlides[i].cloneNode(true));
        }
        currentIndex = visibleSlides;
        const slideWidth = currentSlides[0].getBoundingClientRect().width;
        carouselTrack.style.transition = 'none';
        carouselTrack.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }

    const getVisibleSlides = () => {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 900) return 2;
        return 3;
    }

    const moveCarouselTrack = () => {
        const slideWidth = carouselSlides[0].getBoundingClientRect().width;
        carouselTrack.style.transition = 'transform 0.5s ease-in-out';
        carouselTrack.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }

    nextButton.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        moveCarouselTrack();
    });

    prevButton.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        moveCarouselTrack();
    });

    carouselTrack.addEventListener('transitionend', () => {
        isTransitioning = false;
        const visibleSlides = getVisibleSlides();
        const slideWidth = carouselSlides[0].getBoundingClientRect().width;
        if (currentIndex >= originalSlidesCount + visibleSlides) {
            carouselTrack.style.transition = 'none';
            currentIndex = visibleSlides;
            carouselTrack.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
        }
        if (currentIndex < visibleSlides) {
            carouselTrack.style.transition = 'none';
            currentIndex = originalSlidesCount + currentIndex;
            carouselTrack.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
        }
    });

    setupCarousel();

    window.addEventListener('resize', setupCarousel);
});
