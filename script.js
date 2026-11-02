document.addEventListener("DOMContentLoaded", function() {
    const wrapper = document.getElementById('sliderWrapper');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    let counter = 1; 
    const size = 100; 

    // Set posisi awal aman setelah halaman siap
    wrapper.style.transform = `translateX(-${counter * size}%)`;

    function showSlide() {
        wrapper.style.transition = 'transform 0.5s ease-in-out';
        wrapper.style.transform = `translateX(-${counter * size}%)`;
        updateDots();
    }

    window.changeSlide = function(direction) {
        if (counter >= slides.length - 1 || counter <= 0) return;
        counter += direction;
        showSlide();
    }

    window.currentDotSlide = function(index) {
        counter = index;
        showSlide();
    }

    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));

        let dotIndex = counter - 1;
        if (counter === slides.length - 1) dotIndex = 0; 
        if (counter === 0) dotIndex = dots.length - 1;   

        if (dots[dotIndex]) {
            dots[dotIndex].classList.add('active');
        }
    }

    wrapper.addEventListener('transitionend', () => {
        if (slides[counter] && slides[counter].children[0]) {
            if (slides[counter].children[0].alt.includes('Foto 1 Clone')) {
                wrapper.style.transition = 'none';
                counter = 1;
                wrapper.style.transform = `translateX(-${counter * size}%)`;
            }

            if (slides[counter].children[0].alt.includes('Foto 5 Clone')) {
                wrapper.style.transition = 'none';
                counter = slides.length - 2;
                wrapper.style.transform = `translateX(-${counter * size}%)`;
            }
        }
    });

    // Tambahan Auto-Play yang Aman
    let autoSlideInterval = setInterval(() => {
        if (counter >= slides.length - 1) {
            counter = 1;
            wrapper.style.transition = 'none';
            wrapper.style.transform = `translateX(-${counter * size}%)`;
        }
        counter++;
        showSlide();
    }, 3000);

    const sliderContainer = document.querySelector('.slide-foto');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        sliderContainer.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => {
                if (counter >= slides.length - 1) {
                    counter = 1;
                    wrapper.style.transition = 'none';
                    wrapper.style.transform = `translateX(-${counter * size}%)`;
                }
                counter++;
                showSlide();
            }, 3000);
        });
    }
});