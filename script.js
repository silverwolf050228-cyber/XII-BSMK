const wrapper = document.getElementById('sliderWrapper');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

let counter = 1; 
const size = 100; 

wrapper.style.transform = `translateX(-${counter * size}%)`;

function showSlide() {
    wrapper.style.transition = 'transform 0.5s ease-in-out';
    wrapper.style.transform = `translateX(-${counter * size}%)`;
    updateDots();
}

function changeSlide(direction) {
    if (counter >= slides.length - 1 || counter <= 0) return;
    counter += direction;
    showSlide();
}

function currentDotSlide(index) {
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
});