// Load church images gallery from Firebase Realtime Database with pagination on images.html

let currentPage = 1;
const imagesPerPage = 10;
let allImages = [];
let filteredImages = [];

$(document).ready(function() {
    loadImagesToGallery();
    
    // Listen for Realtime Database changes
    if (window.location.pathname.includes('images.html')) {
        if (typeof db !== 'undefined') {
            db.ref('churchImages').on('value', function(snapshot) {
                currentPage = 1;
                loadImagesToGallery();
            });
        }
    }
});

async function loadImagesToGallery() {
    try {
        allImages = await getAllChurchImagesFromFirebase();
        filteredImages = [...allImages];
        
        if (allImages.length === 0) {
            $('#imagesGallery').hide();
            $('#noImagesMessage').show();
            $('#paginationContainer').hide();
            return;
        }
        
        $('#imagesGallery').show();
        $('#noImagesMessage').hide();
        
        // Reset to page 1 if current page is out of bounds
        const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = 1;
        }
        
        displayImagesWithPagination();
    } catch (error) {
        console.error('Error loading church images:', error);
        $('#imagesGallery').hide();
        $('#noImagesMessage').show();
        $('#paginationContainer').hide();
    }
}

function displayImagesWithPagination() {
    displayImages();
    if (filteredImages.length > imagesPerPage) {
        displayPagination();
        $('#paginationContainer').show();
    } else {
        $('#paginationContainer').hide();
    }
}

function displayImages() {
    const gallery = $('#imagesGallery');
    gallery.empty();
    
    const startIndex = (currentPage - 1) * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;
    const pageImages = filteredImages.slice(startIndex, endIndex);
    
    pageImages.forEach(function(imageData) {
        const imageHtml = `
            <div class="column">
                <div class="item-entry" data-aos="fade-up">
                    <a href="#" class="item-entry__thumb-link" onclick="openImageModal('${imageData.url}', '${(imageData.title || 'Church Image').replace(/'/g, "\\'")}'); return false;">
                        <img src="${imageData.url}" alt="${imageData.title || 'Church Image'}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; cursor: pointer; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    </a>
                    ${imageData.title ? `<h3 style="margin-top: 1.5rem; font-size: 1.6rem; text-align: center;">${imageData.title}</h3>` : ''}
                </div>
            </div>
        `;
        gallery.append(imageHtml);
    });
}

function displayPagination() {
    const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
    const paginationList = $('#paginationList');
    paginationList.empty();
    
    // Previous button
    if (currentPage > 1) {
        paginationList.append(`
            <li>
                <a class="pgn__prev" href="#0" onclick="goToPage(${currentPage - 1}); return false;">Prev</a>
            </li>
        `);
    } else {
        paginationList.append(`
            <li>
                <span class="pgn__num disabled">Prev</span>
            </li>
        `);
    }
    
    // Page numbers
    const maxVisiblePages = 9;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    if (startPage > 1) {
        paginationList.append(`
            <li>
                <a class="pgn__num" href="#0" onclick="goToPage(1); return false;">1</a>
            </li>
        `);
        if (startPage > 2) {
            paginationList.append(`
                <li>
                    <span class="pgn__num dots">…</span>
                </li>
            `);
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            paginationList.append(`
                <li>
                    <span class="pgn__num current">${i}</span>
                </li>
            `);
        } else {
            paginationList.append(`
                <li>
                    <a class="pgn__num" href="#0" onclick="goToPage(${i}); return false;">${i}</a>
                </li>
            `);
        }
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationList.append(`
                <li>
                    <span class="pgn__num dots">…</span>
                </li>
            `);
        }
        paginationList.append(`
            <li>
                <a class="pgn__num" href="#0" onclick="goToPage(${totalPages}); return false;">${totalPages}</a>
            </li>
        `);
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationList.append(`
            <li>
                <a class="pgn__next" href="#0" onclick="goToPage(${currentPage + 1}); return false;">Next</a>
            </li>
        `);
    } else {
        paginationList.append(`
            <li>
                <span class="pgn__num disabled">Next</span>
            </li>
        `);
    }
}

function goToPage(page) {
    const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        displayImagesWithPagination();
        // Scroll to top of gallery
        $('html, body').animate({
            scrollTop: $('#imagesGallery').offset().top - 100
        }, 500);
    }
}

function openImageModal(imageUrl, imageTitle) {
    // Create modal overlay
    const modal = $('<div>')
        .css({
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
        })
        .on('click', function() {
            modal.remove();
        });
    
    // Create modal content
    const modalContent = $('<div>')
        .css({
            'max-width': '90%',
            'max-height': '90%',
            'position': 'relative'
        });
    
    const img = $('<img>')
        .attr('src', imageUrl)
        .attr('alt', imageTitle)
        .css({
            'max-width': '100%',
            'max-height': '90vh',
            'object-fit': 'contain',
            'border-radius': '8px'
        });
    
    const title = $('<h3>')
        .text(imageTitle)
        .css({
            'color': '#ffffff',
            'text-align': 'center',
            'margin-top': '2rem',
            'font-size': '2rem'
        });
    
    const closeBtn = $('<span>')
        .text('×')
        .css({
            'position': 'absolute',
            'top': '-40px',
            'right': '0',
            'color': '#ffffff',
            'font-size': '4rem',
            'font-weight': 'bold',
            'cursor': 'pointer',
            'line-height': '1'
        })
        .on('click', function(e) {
            e.stopPropagation();
            modal.remove();
        });
    
    modalContent.append(img);
    if (imageTitle && imageTitle !== 'Church Image') {
        modalContent.append(title);
    }
    modalContent.append(closeBtn);
    modal.append(modalContent);
    
    $('body').append(modal);
    
    // Close on ESC key
    $(document).on('keydown.modal', function(e) {
        if (e.key === 'Escape') {
            modal.remove();
            $(document).off('keydown.modal');
        }
    });
}
