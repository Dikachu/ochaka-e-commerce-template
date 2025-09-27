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
    
    menu.addEventListener('click', (e) => {
        if (!e.target.closest('[class*="content"]')) {
            menu.classList.remove('preview')
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

