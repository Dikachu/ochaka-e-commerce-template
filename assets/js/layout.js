// Header functionality
document.addEventListener('DOMContentLoaded', function () {
    // Initialize header functionality
    initDropdowns();
    initStickyHeader();

    // Initialize on load
    initMobileAccordion();
});

/**
 * Initialize main header functionality
 */
function initHeader() {
    // Handle cart button click
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function () {
            // Cart functionality would go here
            console.log('Cart clicked');
        });
    }

    // Handle search button click
    const searchBtn = document.querySelector('.action-btn[aria-label="Search"]');
    if (searchBtn) {
        searchBtn.addEventListener('click', function () {
            // Search functionality would go here
            console.log('Search clicked');
        });
    }

    // Handle wishlist button click
    const wishlistBtn = document.querySelector('.action-btn[aria-label="Wishlist"]');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function () {
            // Wishlist functionality would go here
            console.log('Wishlist clicked');
        });
    }

    // Handle user account button click
    const userBtn = document.querySelector('.action-btn[aria-label="User Account"]');
    if (userBtn) {
        userBtn.addEventListener('click', function () {
            // User account functionality would go here
            console.log('User account clicked');
        });
    }
}

/**
 * Initialize dropdown functionality for currency, language, and page selectors
 */
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        const items = dropdown.querySelectorAll('.dropdown-item');

        if (!toggle || !menu) return;

        // Toggle dropdown on click
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Close other dropdowns
            closeAllDropdowns(dropdown);

            // Toggle current dropdown
            dropdown.classList.toggle('open');
        });

        // Handle dropdown item selection
        items.forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();

                // Remove active class from all items
                items.forEach(i => i.classList.remove('active'));

                // Add active class to clicked item
                this.classList.add('active');

                // Update toggle text and flag for currency dropdown
                if (dropdown.classList.contains('currency-dropdown')) {
                    const flag = this.querySelector('.flag-icon');
                    const text = this.querySelector('span').textContent;
                    const toggleFlag = toggle.querySelector('.flag-icon');
                    const toggleText = toggle.querySelector('span');

                    if (flag && toggleFlag) {
                        toggleFlag.src = flag.src;
                        toggleFlag.alt = flag.alt;
                    }
                    if (toggleText) {
                        toggleText.textContent = text;
                    }
                }

                // Update toggle text for language dropdown
                if (dropdown.classList.contains('language-dropdown')) {
                    const text = this.textContent;
                    const toggleText = toggle.querySelector('span');

                    if (toggleText) {
                        toggleText.textContent = text;
                    }
                }

                // Close dropdown
                dropdown.classList.remove('open');
            });
        });
    });

    // Handle page dropdown specifically
    const pageDropdown = document.querySelector('.main-header.second .page-dropdown');
    const pageDropdownToggle = pageDropdown.querySelector('.nav-link');
    if (pageDropdown && pageDropdownToggle) {
        pageDropdownToggle.addEventListener('click', function () {
            pageDropdown.classList.toggle('show');
        });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function () {
        closeAllDropdowns();
    });

    // Close dropdowns on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeAllDropdowns();
        }
    });
}

/**
 * Close all dropdowns except the specified one
 * @param {Element} except - Dropdown element to keep open
 */
function closeAllDropdowns(except = null) {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        if (dropdown !== except) {
            dropdown.classList.remove('open');
        }
    });
}

/**
 * Initialize sticky header functionality
 */
function initStickyHeader() {
    const firstHeader = document.querySelector('.main-header.first');
    const stickyHeader = document.querySelector('.main-header.second');

    function handleHeaderOnScroll() {
        if (window.innerWidth <= 1199) {
            stickyHeader.classList.remove('header-sticky')
            firstHeader.classList.add('header-sticky')
        } else {
            stickyHeader.classList.add('header-sticky')
            firstHeader.classList.remove('header-sticky')
        }
    }

    handleHeaderOnScroll();

    const openMenu = document.querySelector('.show-menu');
    const menu = document.querySelector('.main-header.second');

    handlePreviewToggle(openMenu, menu);


    function handleScroll() {
        const header = document.querySelector('.header-sticky');

        if (!header) return;

        let lastScrollTop = 0;
        const scrollThreshold = 100;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add sticky class when scrolled down
        if (scrollTop > scrollThreshold) {
            header.classList.add('show');
        } else {
            header.classList.remove('show');
        }

        lastScrollTop = scrollTop;
    }

    window.addEventListener('resize', () => {
        handleHeaderOnScroll();
        handleScroll();
    })

    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(function () {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}


// Mobile Accordion Functionality
function initMobileAccordion() {
    if (window.innerWidth <= 767) {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                
                const section = this.closest('.collapsible-section');
                const isActive = section.classList.contains('active');
                
                // Close all sections
                document.querySelectorAll('.collapsible-section').forEach(s => {
                    s.classList.remove('active');
                    s.setAttribute('aria-expanded', 'false');
                });
                
                // Toggle current section
                if (!isActive) {
                    section.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }
}



// Re-initialize on window resize
window.addEventListener('resize', function() {
    // Remove existing event listeners and re-initialize if needed
    if (window.innerWidth <= 767) {
        initMobileAccordion();
    } else {
        // Remove mobile accordion classes on desktop
        document.querySelectorAll('.collapsible-section').forEach(section => {
            section.classList.remove('active');
        });
    }
});