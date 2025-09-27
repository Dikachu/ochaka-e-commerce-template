// Simple review carousel functionality
document.addEventListener('DOMContentLoaded', function () {
    const avatars = document.querySelectorAll('.avatar');
    const reviews = document.querySelectorAll('.review');

    avatars.forEach((avatar, index) => {
        avatar.addEventListener('click', function () {
            // Remove active class from all avatars
            avatars.forEach(av => av.classList.remove('active'));

            // Add active class to clicked avatar
            this.classList.add('active');
            

            // Update review content
            reviews.forEach((review)=> {                
                review.style.transform = `translateX(-${this.dataset.translate}%)`; 
            } )
        });
    });
});