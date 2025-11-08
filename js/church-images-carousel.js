// Load church images and create animated carousel on About page

$(document).ready(function() {
    loadChurchImagesToCarousel();
    
    // Listen for storage changes to update carousel dynamically
    if (window.location.pathname.includes('about.html')) {
        $(window).on('storage', function(e) {
            if (e.originalEvent.key === 'churchImages' || e.originalEvent.key === 'aboutPageImagesUpdated') {
                loadChurchImagesToCarousel();
            }
        });
    }
});

function loadChurchImagesToCarousel() {
    const churchImages = JSON.parse(localStorage.getItem('churchImages') || '[]');
    const track = $('#churchImagesTrack');
    
    if (track.length === 0) {
        return; // Carousel doesn't exist on this page
    }
    
    // Clear existing content
    track.empty();
    
    if (churchImages.length === 0) {
        track.hide();
        return;
    }
    
    track.show();
    
    // Create duplicate set for seamless loop
    const allImages = [...churchImages, ...churchImages];
    
    allImages.forEach(function(imageData) {
        const img = $('<img>')
            .attr('src', imageData.url)
            .attr('alt', imageData.title || 'Church Image')
            .css({
                'flex-shrink': '0',
                'width': '300px',
                'height': '200px',
                'object-fit': 'cover',
                'border-radius': '8px',
                'box-shadow': '0 4px 15px rgba(0, 0, 0, 0.1)',
                'cursor': 'pointer'
            })
            .on('click', function() {
                window.location.href = 'images.html';
            });
        
        track.append(img);
    });
    
    // Restart animation
    track.css('animation', 'none');
    setTimeout(function() {
        track.css('animation', 'scrollImages 30s linear infinite');
    }, 10);
}

