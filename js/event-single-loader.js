// Load single event details from localStorage

$(document).ready(function() {
    loadEventDetails();
});

function loadEventDetails() {
    // Get event ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get('id'));
    
    if (!eventId) {
        $('#eventContent').html('<p style="text-align: center; font-size: 1.6rem; color: #666666; padding: 3rem;">Event not found.</p>');
        return;
    }
    
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const event = events.find(e => e.id === eventId);
    
    if (!event) {
        $('#eventContent').html('<p style="text-align: center; font-size: 1.6rem; color: #666666; padding: 3rem;">Event not found.</p>');
        return;
    }
    
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    let contentHtml = '';
    
    // Main image or first photo
    if (event.photos && event.photos.length > 0) {
        contentHtml += `
            <div class="media-wrap event-thumb">
                <img src="${event.photos[0]}" alt="${event.name}" style="width: 100%; max-height: 500px; object-fit: cover; border-radius: 4px;">
            </div>
        `;
    }
    
    // Event title and description
    contentHtml += `
        <div class="event-content">
            <div class="event-title">
                <h2 class="display-1">${event.name}</h2>
            </div>
            
            <ul class="event-meta" style="margin-bottom: 2rem;">
                <li><strong>Date</strong>${formattedDate}</li>
            </ul>
            
            <p style="white-space: pre-wrap;">${event.description}</p>
    `;
    
    // Photo Gallery
    if (event.photos && event.photos.length > 1) {
        contentHtml += `
            <div style="margin-top: 4rem;">
                <h3 style="margin-bottom: 2rem;">Photo Gallery</h3>
                <div class="row block-large-1-3 block-tab-full" style="margin-bottom: 2rem;">
        `;
        
        event.photos.forEach(function(photo, index) {
            if (index > 0) { // Skip first photo as it's already shown
                contentHtml += `
                    <div class="column" style="margin-bottom: 2rem;">
                        <img src="${photo}" alt="${event.name} - Photo ${index + 1}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 4px; cursor: pointer;" onclick="openImageModal('${photo.replace(/'/g, "\\'")}')">
                    </div>
                `;
            }
        });
        
        contentHtml += `
                </div>
            </div>
        `;
    } else if (event.photos && event.photos.length === 1) {
        // If only one photo, show it in gallery section too
        contentHtml += `
            <div style="margin-top: 4rem;">
                <h3 style="margin-bottom: 2rem;">Photo Gallery</h3>
                <div class="row block-large-1-3 block-tab-full" style="margin-bottom: 2rem;">
                    <div class="column" style="margin-bottom: 2rem;">
                        <img src="${event.photos[0]}" alt="${event.name}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 4px; cursor: pointer;" onclick="openImageModal('${event.photos[0].replace(/'/g, "\\'")}')">
                    </div>
                </div>
            </div>
        `;
    }
    
    // Video Gallery
    if (event.videos && event.videos.length > 0) {
        contentHtml += `
            <div style="margin-top: 4rem;">
                <h3 style="margin-bottom: 2rem;">Videos</h3>
                <div class="row block-large-1-2 block-tab-full">
        `;
        
        event.videos.forEach(function(videoUrl) {
            let embedUrl = '';
            if (videoUrl.includes('youtube.com/watch') || videoUrl.includes('youtu.be/')) {
                const videoId = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
                if (videoId) {
                    embedUrl = `https://www.youtube.com/embed/${videoId[1]}`;
                }
            } else if (videoUrl.includes('vimeo.com/')) {
                const videoId = videoUrl.match(/vimeo\.com\/(\d+)/);
                if (videoId) {
                    embedUrl = `https://player.vimeo.com/video/${videoId[1]}`;
                }
            }
            
            if (embedUrl) {
                contentHtml += `
                    <div class="column" style="margin-bottom: 2rem;">
                        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                            <iframe src="${embedUrl}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allowfullscreen></iframe>
                        </div>
                    </div>
                `;
            }
        });
        
        contentHtml += `
                </div>
            </div>
        `;
    }
    
    contentHtml += `
        </div>
    `;
    
    $('#eventContent').html(contentHtml);
}

function openImageModal(imageSrc) {
    // Simple modal for viewing full-size images
    const modal = $('<div>').css({
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'width': '100%',
        'height': '100%',
        'background-color': 'rgba(0, 0, 0, 0.9)',
        'z-index': '10000',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'cursor': 'pointer'
    }).on('click', function() {
        $(this).remove();
    });
    
    const img = $('<img>').attr('src', imageSrc).css({
        'max-width': '90%',
        'max-height': '90%',
        'object-fit': 'contain'
    });
    
    modal.append(img);
    $('body').append(modal);
}

