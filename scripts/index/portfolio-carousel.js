// Variables
const itemsPerView = 3;
let intervalDuration = 3000;
const images = document.querySelector('.portfolio-carousel__images');
const previousButton = document.getElementById('portfolio-previous-button');
const nextButton = document.getElementById('portfolio-next-button');
const slides = [];
const startButton = document.querySelector('#start-slideshow');
const stopButton = document.querySelector('#stop-slideshow');
const carousel = document.querySelector('.portfolio-carousel');

// Image URLs
const imageURLs = [
    '../assets/images/common/wedding-arch.jpg',
    '../assets/images/common/table-setting-white.jpg',
    '../assets/images/common/pastel-flowers-chairs.jpg',
    '../assets/images/common/table-setting-orange.jpg',
];

// Create carousel slides for each image
imageURLs.forEach(src => {
    const slide = document.createElement('div');
    slide.classList.add('portfolio-carousel__slide');
    const img = document.createElement('img');
    img.src = src;
    slide.appendChild(img);
    slides.push(slide);
});

// For infinite loop clone the last slides to the beginning
const clonesBefore = slides.slice(-itemsPerView).map(slide => slide.cloneNode(true));
clonesBefore.forEach(slide => {
    images.appendChild(slide);
});

// Append the original slides
slides.forEach(slide => {
    images.appendChild(slide);
});

// Clone the first slides to the end
const clonesAfter = slides.slice(0, itemsPerView).map(slide => slide.cloneNode(true));
clonesAfter.forEach(slide => {
    images.appendChild(slide);
});

// Start at the first real slide 
let index = itemsPerView;

// Reposition the carousel to the current slide index using a transition
function updateSlidePosition() { 
    const slideWidth = images.children[index]?.getBoundingClientRect().width;
    if (slideWidth) {
        images.style.transform = `translateX(${-slideWidth * index}px)`;
    }
}

// Set initial slide position
updateSlidePosition();

// Transition end event listener to loop the carousel
images.addEventListener('transitionend', () => {
    if (index >= imageURLs.length + itemsPerView) {
        index = itemsPerView;
        images.style.transition = 'none';
        updateSlidePosition();
        void images.offsetWidth;
        images.style.transition = 'transform 0.5s ease-in-out';
    } else if (index < itemsPerView) {
        index = imageURLs.length + index;
        images.style.transition = 'none';
        updateSlidePosition();
        void images.offsetWidth;
        images.style.transition = 'transform 0.5s ease-in-out';
    }
});

// Auto-slide functionality
let autoSlide = setInterval(() => {
    index++;
    images.style.transition = 'transform 0.5s ease-in-out';
    updateSlidePosition();
}, intervalDuration);

// Set initial button visibility
startButton.style.display = 'none';
stopButton.style.display = 'block';

// Start and Stop button event listeners
stopButton.addEventListener('click', () => {
    clearInterval(autoSlide);
    stopButton.style.display = 'none';
    startButton.style.display = 'block';
});

startButton.addEventListener('click', () => {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
        index++;
        images.style.transition = 'transform 0.5s ease-in-out';
        updateSlidePosition();
    }, intervalDuration);
    startButton.style.display = 'none';
    stopButton.style.display = 'block';
});

// Previous and next button event listeners
previousButton.addEventListener('click', () => {
    index--;
    images.style.transition = 'transform 0.5s ease-in-out';
    updateSlidePosition();
    clearInterval(autoSlide);
    autoSlide = null;
    stopButton.style.display = 'none';
    startButton.style.display = 'block';
});

nextButton.addEventListener('click', () => {
    index++;
    images.style.transition = 'transform 0.5s ease-in-out';
    updateSlidePosition();
    clearInterval(autoSlide);
    autoSlide = null;
    stopButton.style.display = 'none';
    startButton.style.display = 'block';
});

//INTENIONALLY COMMENTED OUT 

// const timerInput = document.getElementById('timer'); 
// const currentDurationDisplay = document.getElementById('current-duration');

// // User input timer
// function updateDurationDisplay(value) {
//     currentDurationDisplay.textContent = `${value} second${value === "1" ? "" : "s"}`;
// }

// // Input timer event listener
// timerInput.addEventListener('change', () => {
//     intervalDuration = timerInput.value * 1000;
//     updateDurationDisplay(timerInput.value);
//     if (autoSlide) {
//         clearInterval(autoSlide);
//         autoSlide = setInterval(() => {
//             index++; images.style.transition = "transform 0.5s ease-in-out";
//             updateSlidePosition();
//         }, intervalDuration);
//     }
// });
