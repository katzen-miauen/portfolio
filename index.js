document.addEventListener("DOMContentLoaded", function() {
    initializeSliders();
    setupSmoothScroll();
    setupHeaderBackgroundToggle();
});

let slideIndices = {};

function initializeSliders() {
    const sliders = document.querySelectorAll(".slider");
    sliders.forEach(slider => {
        const sliderId = slider.id;
        slideIndices[sliderId] = 0;
        showSlide(sliderId, slideIndices[sliderId]);
    });
}

function showSlide(sliderId, index) {
    const slides = document.querySelectorAll(`#${sliderId} .slide`);
    if (index >= slides.length) {
        slideIndices[sliderId] = 0;
    } else if (index < 0) {
        slideIndices[sliderId] = slides.length - 1;
    } else {
        slideIndices[sliderId] = index;
    }

    slides.forEach(slide => {
        slide.style.display = "none";
    });
    slides[slideIndices[sliderId]].style.display = "block";
}

function prevSlide(sliderId) {
    showSlide(sliderId, slideIndices[sliderId] - 1);
}

function nextSlide(sliderId) {
    showSlide(sliderId, slideIndices[sliderId] + 1);
}

function setupSmoothScroll() {
    const menuLinks = document.querySelectorAll('.menu-link');

    menuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const offset = -60; // Adjust this value as needed

            window.scrollTo({
                top: targetElement.offsetTop + offset,
                behavior: 'smooth'
            });
        });
    });
}

function setupHeaderBackgroundToggle() {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const links = document.querySelectorAll('header a');

    window.addEventListener('scroll', function() {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (footerRect.top+windowHeight-60 <= windowHeight) {
            header.style.background = 'none';
            links.forEach(link => {
                link.style.color = 'rgb(203, 203, 203)';
            });
        } else {
            header.style.background = ''; // Reset to original background style
            links.forEach(link => {
                link.style.color = ''; // Reset to original link color
            });
        }
    });
}