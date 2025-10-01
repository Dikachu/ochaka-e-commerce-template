
// Thumbnail gallery functionality
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.getElementById('main-product-image');

if (thumbnails && mainImage) {
    thumbnails.forEach(thumbnail => {
        if (!thumbnail) return;
        thumbnail.addEventListener('click', function () {
            // Update active state
            thumbnails.forEach(item => { if (item) item.classList.remove('active'); });
            this.classList.add('active');

            // Update main image
            const img = this.querySelector('img');
            if (img && mainImage) {
                const imageSrc = img.src;
                mainImage.src = imageSrc;
            }
        });
    });
}

// Quantity selector functionality
const decreaseBtn = document.getElementById('decrease-qty');
const increaseBtn = document.getElementById('increase-qty');
const qtyInput = document.getElementById('qty-input');

if (decreaseBtn && qtyInput) {
    decreaseBtn.addEventListener('click', function () {
        const currentValue = parseInt(qtyInput.value);
        if (currentValue > 1) {
            qtyInput.value = currentValue - 1;
        }
    });
}

if (increaseBtn && qtyInput) {
    increaseBtn.addEventListener('click', function () {
        const currentValue = parseInt(qtyInput.value);
        qtyInput.value = currentValue + 1;
    });
}

// Tab functionality
const tabItems = document.querySelectorAll('.tab-item');
const tabPanels = document.querySelectorAll('.tab-panel');

if (tabItems && tabPanels) {
    tabItems.forEach(item => {
        if (!item) return;
        item.addEventListener('click', function () {
            // Update active tab
            tabItems.forEach(tab => { if (tab) tab.classList.remove('active'); });
            this.classList.add('active');

            // Show active panel
            const tabId = this.getAttribute('data-tab');
            tabPanels.forEach(panel => { if (panel) panel.classList.remove('active'); });
            const targetPanel = document.getElementById(tabId);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });
}


const openReviewBtn = document.getElementById('openReviewModal');
const modalTitle = "Write A Review";
const modalContent = `
<form id="reviewForm">
    <div class="form-group">
        <label for="reviewerName">Name</label>
        <input type="text" id="reviewerName" name="reviewerName" required>
    </div>
    <div class="form-group">
        <label for="reviewerRating">Rating</label>
        <select id="reviewerRating" name="reviewerRating" required>
            <option value="">Select</option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Average</option>
            <option value="2">2 - Poor</option>
            <option value="1">1 - Terrible</option>
        </select>
    </div>
    <div class="form-group">
        <label for="reviewerText">Review</label>
        <textarea id="reviewerText" name="reviewerText" rows="4" required></textarea>
    </div>
    <button type="submit" class="review-btn btn">Submit Review</button>
</form>
`
handleModalToggle(openReviewBtn, modalTitle, modalContent)

// Prevent form submit default (for demo)
// const reviewForm = document.getElementById('reviewForm');
// if (reviewForm) {
//     reviewForm.addEventListener('submit', function (e) {
//         e.preventDefault();
//         closeReviewModal();
//         alert('Thank you for your review!');
//     });
// }