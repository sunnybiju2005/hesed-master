// Load church images from Firebase Realtime Database and create animated carousel on About page

$(document).ready(function() {
    loadChurchImagesToCarousel();
    
    // Listen for Realtime Database changes to update carousel dynamically
    if (window.location.pathname.includes('about.html') || window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        if (typeof db !== 'undefined') {
            db.ref('churchImages').on('value', function(snapshot) {
                loadChurchImagesToCarousel();
            });
        }
    }
});

async function loadChurchImagesToCarousel() {
    const track = $('#churchImagesTrack');
    const container = track.closest('.church-images-carousel-container');
    
    if (track.length === 0) {
        return; // Carousel doesn't exist on this page
    }
    
    // Clear existing content
    track.empty();
    
    try {
        const churchImages = await getAllChurchImagesFromFirebase();
        
        if (churchImages.length === 0) {
            // No images - hide carousel (no default/template images)
            if (container.length) container.hide();
            return;
        }
        
        if (container.length) container.show();
        
        // Create duplicate set for seamless loop (scrolls left to right)
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
        
        // Set initial position for left-to-right scroll and restart animation
        track.css({
            'animation': 'none',
            'transform': 'translateX(-50%)'
        });
        setTimeout(function() {
            track.css('animation', 'scrollImagesRight 30s linear infinite');
        }, 10);
    } catch (error) {
        console.error('Error loading church images:', error);
        if (container.length) container.hide();
    }
}
