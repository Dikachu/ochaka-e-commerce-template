// Preloader Disappear on Page Load
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hidden');
    setTimeout(() => {
        preloader.remove();
    }, 600); // Match this duration with the CSS transition duration
});




// Product Hover click functionality
const productCardImages = document.querySelectorAll('.product-card .product-image');

if (productCardImages) {
    productCardImages.forEach(card => {
        const imgSrc = card.getAttribute('image-src');
        const hoverImgSrc = card.getAttribute('hover-image-src');
        const currentImg = card.querySelector('img')

        card.addEventListener('mouseenter', (product) => {
            currentImg.style.transform = 'translateY(10px)'
            currentImg.style.opacity = '0'

            setTimeout(() => {
                currentImg.style.transform = 'translateY(0)'
                currentImg.style.opacity = '1'
                currentImg.src = hoverImgSrc
            }, 100);
        });

        card.addEventListener('mouseleave', (product) => {
            currentImg.style.transform = 'translateY(10px)'
            currentImg.style.opacity = '0'

            setTimeout(() => {
                currentImg.style.transform = 'translateY(0)';
                currentImg.style.opacity = '1'
                currentImg.src = imgSrc
            }, 100);
        });
    });
}


/**
 * Scroll to Top Button with Progress Indicator
 * 
 * Technical Approach:
 * 1. Show button after scrolling past first section (100vh)
 * 2. Calculate scroll progress as percentage
 * 3. Convert percentage to degrees (0-360) for conic-gradient
 * 4. Update CSS custom property --progress-angle dynamically
 * 5. Smooth scroll to top on click
 */

(function () {
    // Cache DOM elements to avoid repeated queries
    const goTopBtn = document.getElementById('goTop');
    const borderProgress = goTopBtn.querySelector('.border-progress');

    // Configuration
    const SHOW_AFTER_PX = (window.innerHeight / 2); // Show after scrolling one viewport height (one section)

    /**
     * Calculate scroll progress as a percentage
     * @returns {number} Progress from 0 to 100
     */
    function calculateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        return (scrollTop / scrollHeight) * 100;
    }

    /**
     * Update button visibility and progress indicator
     */
    function updateScrollButton() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Show/hide button based on scroll position
        if (scrollTop > SHOW_AFTER_PX) {
            goTopBtn.classList.add('show');
        } else {
            goTopBtn.classList.remove('show');
        }

        // Calculate and update progress angle (0-360 degrees)
        const progress = calculateScrollProgress();
        const progressAngle = (progress / 100) * 360;

        // Update CSS custom property for conic-gradient mask
        borderProgress.style.setProperty('--progress-angle', `${progressAngle}deg`);
    }

    /**
     * Smooth scroll to top of page
     */
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Event Listeners
    // Use passive scroll listener for better performance
    window.addEventListener('scroll', updateScrollButton, { passive: true });
    goTopBtn.addEventListener('click', scrollToTop);

    // Initial check on page load
    updateScrollButton();
})();



// Search Appear Functionalities
const searchBtns = document.querySelectorAll('.open-search-modal')
const searchModal = document.getElementById('search-modal');

searchBtns.forEach(btn => { handlePreviewToggle(btn, searchModal) });

// clear-search-history 
const clearSearchHistoryBtn = document.querySelector('.clear-search-history');
const historyItems = document.querySelectorAll('.history-item');

clearSearchHistoryBtn.addEventListener('click', () => {
    historyItems.forEach((item, itemIndex) => {
        item.style.transform = 'scale(0)';
        item.style.opacity = '0';

        item.style.transitionDelay = `0.${itemIndex}s`

        setTimeout(() => {
            item.remove();
            const emptyHistory = document.querySelector('.empty-history');
            emptyHistory.style.display = 'flex';
            clearSearchHistoryBtn.setAttribute('disabled', 'true');
            clearSearchHistoryBtn.style.opacity = '0.5';
            clearSearchHistoryBtn.style.pointerEvents = 'none';
            // clearSearchHistoryBtn.style.userSelect = 'none';
            clearSearchHistoryBtn.style.cursor = 'not-allowed';
        }, 1000);
    });
})



// Cart Modal Functionalities
// Cart Modal Functionality
const cartModal = document.getElementById('cart-modal');
const showCartBtns = document.querySelectorAll('.show-cart-btn');
const removeButtons = cartModal.querySelectorAll('.cart-item-remove');

// Free shipping threshold
const FREE_SHIPPING_THRESHOLD = 150;

// Function to calculate cart totals and update UI
function updateCartSummary() {
    const cartItems = cartModal.querySelectorAll('.cart-item:not(.removing)');
    let subtotal = 0;
    let itemCount = 0;

    // Calculate subtotal and count items
    cartItems.forEach(item => {
        const price = parseFloat(item.dataset.price);
        subtotal += price;
        itemCount++;
    });

    // Update item count
    const itemCountEl = cartModal.querySelector('.cart-item-count');
    itemCountEl.textContent = itemCount;

    // Update subtotal
    const subtotalEl = cartModal.querySelector('.cart-subtotal-price');
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

    // Calculate remaining amount for free shipping
    const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

    // Update progress bar
    const progressBar = cartModal.querySelector('.cart-progress-fill');
    const progressPercentage = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
    progressBar.style.width = `${progressPercentage}%`;

    // Update shipping message
    const shippingMessage = cartModal.querySelector('.cart-shipping-message');
    if (remaining > 0) {
        shippingMessage.innerHTML = `Add <span class="highlight-price">$${remaining.toFixed(2)}</span> to cart and get free shipping!`;
    } else {
        shippingMessage.innerHTML = `<span class="highlight-price">Congratulations!</span> You qualify for free shipping!`;
    }
}

// Handle remove item with slide animation
removeButtons.forEach(button => {
    button.addEventListener('click', function () {
        const cartItem = this.closest('.cart-item');

        // Add removing class for animation
        cartItem.classList.add('removing');

        // Remove item after animation completes
        setTimeout(() => {
            cartItem.remove();
            updateCartSummary();
        }, 300); // Match the CSS transition duration
    });
});

// Close modal when clicking close button and when clicking outside content (on overlay)
showCartBtns.forEach(btn => { handlePreviewToggle(btn, cartModal) });

// For demo: Open cart modal after 1 second
// Remove this in production and use your handlePreviewToggle function
document.addEventListener('DOMContentLoaded', function () {
    // Initialize cart summary on load
    updateCartSummary();
});


if (window.innerWidth <= 300) {
    document.body.innerHTML = "Awfr dem no dey use watch view my website guy. Try make some upgrade bra 😁✌️";
}







// Utility Functions
function handlePreviewToggle(openMenu, menu) {
    const closeMenu = menu.querySelector('.close-menu');

    openMenu.addEventListener('click', () => {
        // Hide any open preview before previewing the new one
        hideAllPreview()

        menu.classList.add('preview')
        document.body.classList.add('modal-available')

    });

    closeMenu.addEventListener('click', () => {
        menu.classList.remove('preview')
        document.body.classList.remove('modal-available')
    })

    document.addEventListener('keydown', function (e) {
        if (e && e.key === 'Escape') hideAllPreview();
    });

    menu.addEventListener('click', (e) => {
        if (!e.target.closest('[class*="content"]')) {
            menu.classList.remove('preview')
            document.body.classList.remove('modal-available')
        }
    })
}


function handleModalToggle(openModal, modalTitleContent, modalBodyContent) {
    const modal = document.getElementById('modal');
    const closeModal = modal.querySelector('.close-modal')
    const modalTitle = modal.querySelector('.modal-header h3')
    const modalBody = modal.querySelector('.modal-body')
    
    // Insert the current modal details content
    modalTitle.innerHTML = modalTitleContent
    modalBody.innerHTML = modalBodyContent

    openModal.addEventListener('click', () => {
        // Hide any open preview before previewing the new one
        hideAllPreview()

        modal.classList.add('preview')
        document.body.classList.add('modal-available')
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('preview')
        document.body.classList.remove('modal-available')
    })

    document.addEventListener('keydown', function (e) {
        if (e && e.key === 'Escape') hideAllPreview();
    });

    modal.addEventListener('click', (e) => {
        if (!e.target.closest('[class*="content"]')) {
            modal.classList.remove('preview')
            document.body.classList.remove('modal-available')
        }
    })

}

function hideAllPreview() {
    const openPreview = document.querySelector('[class*="preview"]')

    if (openPreview) {
        openPreview.classList.remove('preview');
        document.body.classList.remove('modal-available')
    }
}

