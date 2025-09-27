// Header functionality
document.addEventListener('DOMContentLoaded', function () {
    // Preload images for better performance
    const imageUrls = ['assets/images/hero/hero-1.jpeg', 'assets/images/hero/hero-2.jpeg', 'assets/images/hero/hero-3.jpeg'];
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });

    new HeroSlider();


    const sliderContainer = document.querySelector('.comparison-container');
    if (sliderContainer) {
        new BeforeAfterSlider(sliderContainer);
    }

    // Initialize carousel when DOM is loaded
    new ReviewsCarousel();
});

class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.nav-dot');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds

        this.init();
    }

    init() {
        // Add click listeners to navigation dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Start autoplay
        this.startAutoPlay();

        // Pause autoplay on hover
        const slider = document.querySelector('.hero-slider');
        slider.addEventListener('mouseenter', () => this.pauseAutoPlay());
        slider.addEventListener('mouseleave', () => this.startAutoPlay());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }

    goToSlide(slideIndex) {
        // Remove active classes
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].setAttribute('aria-selected', 'false');

        // Update current slide
        this.currentSlide = slideIndex;

        // Add active classes
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].setAttribute('aria-selected', 'true');
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    pauseAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}


const topCollections = document.querySelector('.collection-grid')
const collections = document.querySelectorAll('.collection-item')


// collections.forEach((collection, collectionIndex) => {
//     // collection.setAttribute('data-translate', collectionIndex * 274)

//     console.log(collections[0].offsetWidth + 20);

//     // const collectionItemWidth = 
//     collection.style.transform = `translateX(-${collections[0].offsetWidth + 20})`

// })



document.addEventListener('DOMContentLoaded', function () {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.product-tabs .tab-btn');
    const productCards = document.querySelectorAll('.product-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all tabs
            tabBtns.forEach(tab => tab.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Here you would typically filter products based on category
            const category = this.dataset.category;

            productCards.forEach((product) => {
                const productCat = product.dataset.category;
                product.style.transform = 'translateY(10px)'
                product.style.opacity = '0'

                setTimeout(() => {
                    product.style.display = 'none';
                }, 500);

                if (category === productCat) {
                    product.style.transform = 'translateY(0)'
                    product.style.opacity = '1'
                    setTimeout(() => {
                        product.style.display = '';
                    }, 500);
                }
            })
        });
    });
});



// Before/After Comparison Slider Functionality
class BeforeAfterSlider {
    constructor(container) {
        this.container = container;
        this.handle = container.querySelector('#sliderHandle');
        this.afterImage = container.querySelector('.after-image');
        this.isDragging = false;
        this.containerRect = null;

        this.init();
    }

    init() {
        // Set initial position to 50%
        this.updateSlider(50);

        // Mouse events
        this.handle.addEventListener('mousedown', this.startDrag.bind(this));
        document.addEventListener('mousemove', this.drag.bind(this));
        document.addEventListener('mouseup', this.endDrag.bind(this));

        // Touch events for mobile
        this.handle.addEventListener('touchstart', this.startDrag.bind(this));
        document.addEventListener('touchmove', this.drag.bind(this));
        document.addEventListener('touchend', this.endDrag.bind(this));

        // Handle container click
        this.container.addEventListener('click', this.handleClick.bind(this));

        // Update on window resize
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    startDrag(e) {
        this.isDragging = true;
        this.containerRect = this.container.getBoundingClientRect();
        // this.handle.style.cursor = 'col-resize';
        e.preventDefault();
    }

    drag(e) {
        if (!this.isDragging) return;

        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const containerLeft = this.containerRect.left;
        const containerWidth = this.containerRect.width;

        let percentage = ((clientX - containerLeft) / containerWidth) * 100;
        percentage = Math.max(0, Math.min(100, percentage));

        this.updateSlider(percentage);
        e.preventDefault();
    }

    endDrag() {
        this.isDragging = false;
    }

    handleClick(e) {
        if (this.isDragging || e.target === this.handle || e.target.closest('.slider-handle')) return;

        this.containerRect = this.container.getBoundingClientRect();
        const containerLeft = this.containerRect.left;
        const containerWidth = this.containerRect.width;

        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        let percentage = ((clientX - containerLeft) / containerWidth) * 100;
        percentage = Math.max(0, Math.min(100, percentage));

        this.updateSlider(percentage);
    }

    handleResize() {
        this.containerRect = this.container.getBoundingClientRect();
    }

    updateSlider(percentage) {
        // Update handle position
        this.handle.style.left = `${percentage}%`;

        // Update after image reveal (clip-path)
        this.afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    }
}


// testimonials 
class ReviewsCarousel {
    constructor() {
        this.track = document.getElementById('reviewsTrack');
        this.prevArrow = document.getElementById('prevArrow');
        this.nextArrow = document.getElementById('nextArrow');
        this.cards = this.track.children;
        this.currentIndex = 0;
        this.cardsToShow = this.getCardsToShow();
        this.maxIndex = Math.max(0, this.cards.length - this.cardsToShow);

        this.init();
    }

    getCardsToShow() {
        const width = window.innerWidth;
        // Ensure consistency with CSS media queries
        if (width <= 767) return 1; // Corrected breakpoint to 767px for consistency
        if (width <= 1199) return 2;
        return 2; // Showing 2 items is best for 48.5% width + 3% gap = 100%
    }

    init() {
        this.updateArrows();
        this.prevArrow.addEventListener('click', () => this.prevSlide());
        this.nextArrow.addEventListener('click', () => this.nextSlide());

        // Handle resize
        window.addEventListener('resize', () => {
            const oldCardsToShow = this.cardsToShow;
            this.cardsToShow = this.getCardsToShow();

            // If the number of cards shown changes, recalculate maxIndex and reposition
            if (oldCardsToShow !== this.cardsToShow) {
                this.maxIndex = Math.max(0, this.cards.length - this.cardsToShow);
                // Ensure currentIndex doesn't go beyond the new max
                this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
            }

            this.updatePosition();
            this.updateArrows();
        });

        this.updatePosition(); // Initial positioning
        this.initTouchSupport();
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            // Slide back by the number of cards we intend to show, or 1 for smooth single card slide.
            // Since the user is using currentIndex++, we will stick to 1 card at a time.
            this.currentIndex--;
            this.updatePosition();
            this.updateArrows();
        }
    }

    nextSlide() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
            this.updatePosition();
            this.updateArrows();
        }
    }

    /**
     * FIX: Reads the computed pixel value of the CSS gap for perfect alignment.
     */
    updatePosition() {
        // 1. Get the computed style of the track element (where the gap is defined)
        const computedStyle = window.getComputedStyle(this.track);

        // 2. Read the resolved pixel value of the column gap from CSS. 
        // This handles the conversion of 3% into a precise pixel number (e.g., 15.6px).
        // We use columnGap as it is the most specific property for the horizontal gap.
        const gapStyle = computedStyle.columnGap;

        // 3. Convert the pixel string value (e.g., "15.6px") to a number.
        const gapInPixels = parseFloat(gapStyle) || 0;

        // 4. Get the full pixel width of one card.
        const cardWidth = this.cards[0].offsetWidth;

        // 5. Calculate the total shift required (Card Width + Gap, multiplied by hidden card count).
        const shiftPerIndex = cardWidth + gapInPixels;
        const translateX = -(this.currentIndex * shiftPerIndex);

        // 6. Apply the transformation using the precise pixel value.
        this.track.style.transform = `translateX(${translateX}px)`;
    }

    updateArrows() {
        this.prevArrow.disabled = this.currentIndex === 0;
        this.nextArrow.disabled = this.currentIndex >= this.maxIndex;
    }

    // ... initTouchSupport remains the same ...
    initTouchSupport() {
        let startX = 0;
        let isDragging = false;
        let currentTranslateX = 0; // Store the initial translate position

        // Helper to get the current computed translation
        const getTranslateX = (element) => {
            const style = window.getComputedStyle(element);
            const matrix = style.transform || style.webkitTransform || style.mozTransform;
            if (matrix && matrix !== 'none') {
                const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
                // The X translation is the 4th element in the 2D matrix (index 4)
                return parseFloat(matrixValues[4]);
            }
            return 0;
        };

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            currentTranslateX = getTranslateX(this.track);
            isDragging = true;
            // Temporarily remove transition for smooth dragging
            this.track.style.transition = 'none';
        }, { passive: true });

        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const diffX = e.touches[0].clientX - startX;
            const newTranslateX = currentTranslateX + diffX;
            this.track.style.transform = `translateX(${newTranslateX}px)`;
        }, { passive: true });

        this.track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            this.track.style.transition = 'transform 0.4s ease'; // Restore transition

            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            // Re-calculate the target index based on swipe direction
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            } else {
                // Snap back to the current index if swipe was too short
                this.updatePosition();
            }
        }, { passive: true });

        // Mouse support for desktop testing
        let mouseStartX = 0;
        let isMouseDragging = false;

        this.track.addEventListener('mousedown', (e) => {
            mouseStartX = e.clientX;
            currentTranslateX = getTranslateX(this.track);
            isMouseDragging = true;
            this.track.style.cursor = 'grabbing';
            this.track.style.transition = 'none';
        });

        this.track.addEventListener('mousemove', (e) => {
            if (!isMouseDragging) return;
            e.preventDefault();
            const diffX = e.clientX - mouseStartX;
            const newTranslateX = currentTranslateX + diffX;
            this.track.style.transform = `translateX(${newTranslateX}px)`;
        });

        this.track.addEventListener('mouseup', (e) => {
            if (!isMouseDragging) return;
            isMouseDragging = false;
            this.track.style.cursor = 'grab';
            this.track.style.transition = 'transform 0.4s ease'; // Restore transition

            const endX = e.clientX;
            const diff = mouseStartX - endX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            } else {
                // Snap back
                this.updatePosition();
            }
        });

        this.track.addEventListener('mouseleave', () => {
            isMouseDragging = false;
            this.track.style.cursor = 'grab';
        });

        this.track.style.cursor = 'grab';
    }
}



// document.addEventListener('DOMContentLoaded', function () {
//     const reviewsContainer = document.querySelector('.reviews-container');
//     const prevArrow = document.querySelector('.prev-arrow');
//     const nextArrow = document.querySelector('.next-arrow');
//     const slides = document.querySelectorAll('.review-slide');

//     let currentSlide = 0;
//     const totalSlides = slides.length;

//     // Function to update slide position
//     function updateSlidePosition() {
//         const translateX = -currentSlide * 100;
//         reviewsContainer.style.transform = `translateX(${translateX}%)`;

//         // Update active slide class
//         slides.forEach((slide, index) => {
//             slide.classList.toggle('active', index === currentSlide);
//         });

//         // Update navigation arrows state
//         prevArrow.disabled = currentSlide === 0;
//         nextArrow.disabled = currentSlide === totalSlides - 1;
//     }

//     // Previous arrow click handler
//     prevArrow.addEventListener('click', function () {
//         if (currentSlide > 0) {
//             currentSlide--;
//             updateSlidePosition();
//         }
//     });

//     // Next arrow click handler
//     nextArrow.addEventListener('click', function () {
//         if (currentSlide < totalSlides - 1) {
//             currentSlide++;
//             updateSlidePosition();
//         }
//     });

//     // Initialize carousel
//     updateSlidePosition();

//     // Touch/swipe support for mobile
//     let startX = 0;
//     let startY = 0;
//     let endX = 0;
//     let endY = 0;
//     const minSwipeDistance = 50;

//     reviewsContainer.addEventListener('touchstart', function (e) {
//         startX = e.touches[0].clientX;
//         startY = e.touches[0].clientY;
//     });

//     reviewsContainer.addEventListener('touchend', function (e) {
//         endX = e.changedTouches[0].clientX;
//         endY = e.changedTouches[0].clientY;

//         const deltaX = endX - startX;
//         const deltaY = endY - startY;

//         // Only handle horizontal swipes
//         if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
//             if (deltaX > 0 && currentSlide > 0) {
//                 // Swipe right - previous slide
//                 currentSlide--;
//                 updateSlidePosition();
//             } else if (deltaX < 0 && currentSlide < totalSlides - 1) {
//                 // Swipe left - next slide
//                 currentSlide++;
//                 updateSlidePosition();
//             }
//         }
//     });

//     // Keyboard navigation
//     document.addEventListener('keydown', function (e) {
//         if (e.key === 'ArrowLeft' && currentSlide > 0) {
//             currentSlide--;
//             updateSlidePosition();
//         } else if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
//             currentSlide++;
//             updateSlidePosition();
//         }
//     });

//     // Auto-play functionality (optional)
//     let autoPlayInterval;
//     const autoPlayDelay = 5000; // 5 seconds

//     function startAutoPlay() {
//         autoPlayInterval = setInterval(() => {
//             if (currentSlide < totalSlides - 1) {
//                 currentSlide++;
//             } else {
//                 currentSlide = 0;
//             }
//             updateSlidePosition();
//         }, autoPlayDelay);
//     }

//     function stopAutoPlay() {
//         clearInterval(autoPlayInterval);
//     }

//     // Start auto-play
//     startAutoPlay();

//     // Pause auto-play on hover
//     const reviewsSection = document.querySelector('.customer-reviews-section');
//     reviewsSection.addEventListener('mouseenter', stopAutoPlay);
//     reviewsSection.addEventListener('mouseleave', startAutoPlay);

//     // Pause auto-play when user interacts
//     [prevArrow, nextArrow].forEach(arrow => {
//         arrow.addEventListener('click', () => {
//             stopAutoPlay();
//             setTimeout(startAutoPlay, autoPlayDelay);
//         });
//     });
// });


