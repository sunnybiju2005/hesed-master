// Load events from localStorage and display on events page with search functionality and pagination

let currentPage = 1;
const eventsPerPage = 10;
let allEvents = [];
let filteredEvents = [];

$(document).ready(function() {
    loadEventsToPage();
    
    // Search functionality
    $('#eventSearch').on('input', function() {
        currentPage = 1; // Reset to first page on search
        filterEvents($(this).val());
    });
    
    // Listen for storage changes
    if (window.location.pathname.includes('events.html')) {
        $(window).on('storage', function(e) {
            if (e.originalEvent.key === 'events' || e.originalEvent.key === 'eventsPageUpdated') {
                currentPage = 1;
                loadEventsToPage();
            }
        });
    }
});

function loadEventsToPage() {
    allEvents = JSON.parse(localStorage.getItem('events') || '[]');
    const container = $('#eventsListContainer');
    const noEventsMsg = $('#noEventsMessage');
    
    if (allEvents.length === 0) {
        container.empty();
        container.html('<div class="column"><p style="text-align: center; font-size: 1.6rem; color: #666666; padding: 3rem;">No events available yet.</p></div>');
        noEventsMsg.hide();
        $('#paginationContainer').hide();
        return;
    }
    
    // Sort events by date (newest first)
    allEvents = allEvents.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
    });
    
    // Apply search filter if there's a search term
    const searchTerm = $('#eventSearch').val();
    if (searchTerm) {
        filterEvents(searchTerm);
    } else {
        filteredEvents = allEvents;
        displayEventsWithPagination();
    }
}

function displayEventsWithPagination() {
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
    
    if (totalPages === 0) {
        $('#eventsListContainer').empty();
        $('#noEventsMessage').show();
        $('#paginationContainer').hide();
        return;
    }
    
    // Ensure current page is valid
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    if (currentPage < 1) {
        currentPage = 1;
    }
    
    $('#noEventsMessage').hide();
    
    // Get events for current page
    const startIndex = (currentPage - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    const eventsToShow = filteredEvents.slice(startIndex, endIndex);
    
    // Display events
    displayEvents(eventsToShow);
    
    // Display pagination
    if (totalPages > 1) {
        displayPagination(totalPages);
    } else {
        $('#paginationContainer').hide();
    }
}

function displayEvents(events) {
    const container = $('#eventsListContainer');
    container.empty();
    
    events.forEach(function(event) {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        const mainImage = event.photos && event.photos.length > 0 ? event.photos[0] : 'images/thumbs/events/event-1000.jpg';
        
        const eventHtml = `
            <div class="column events-list__item" data-event-id="${event.id}">
                ${event.photos && event.photos.length > 0 ? `
                <div class="event-thumb" style="margin-bottom: 2rem;">
                    <img src="${mainImage}" alt="${event.name}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 4px;">
                </div>
                ` : ''}
                <h3 class="display-1 events-list__item-title">
                    <a href="events-single.html?id=${event.id}" title="${event.name}">${event.name}</a>
                </h3>
                <p>${event.description.substring(0, 150)}${event.description.length > 150 ? '...' : ''}</p>
                <ul class="events-list__meta">
                    <li class="events-list__meta-date">${formattedDate}</li>
                    ${event.photos && event.photos.length > 0 ? `<li>${event.photos.length} Photo${event.photos.length > 1 ? 's' : ''}</li>` : ''}
                    ${event.videos && event.videos.length > 0 ? `<li>${event.videos.length} Video${event.videos.length > 1 ? 's' : ''}</li>` : ''}
                </ul>
            </div>
        `;
        container.append(eventHtml);
    });
}

function displayPagination(totalPages) {
    const paginationList = $('#paginationList');
    paginationList.empty();
    $('#paginationContainer').show();
    
    // Previous button
    if (currentPage > 1) {
        paginationList.append(`<li><a class="pgn__prev" href="#0" onclick="goToPage(${currentPage - 1}); return false;">Prev</a></li>`);
    } else {
        paginationList.append(`<li><span class="pgn__prev" style="opacity: 0.5; cursor: not-allowed;">Prev</span></li>`);
    }
    
    // Page numbers
    let startPage = Math.max(1, currentPage - 4);
    let endPage = Math.min(totalPages, currentPage + 4);
    
    // Adjust if we're near the start
    if (currentPage <= 5) {
        endPage = Math.min(9, totalPages);
    }
    
    // Adjust if we're near the end
    if (currentPage > totalPages - 5) {
        startPage = Math.max(1, totalPages - 8);
    }
    
    // First page
    if (startPage > 1) {
        paginationList.append(`<li><a class="pgn__num" href="#0" onclick="goToPage(1); return false;">1</a></li>`);
        if (startPage > 2) {
            paginationList.append(`<li><span class="pgn__num dots">…</span></li>`);
        }
    }
    
    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            paginationList.append(`<li><span class="pgn__num current">${i}</span></li>`);
        } else {
            paginationList.append(`<li><a class="pgn__num" href="#0" onclick="goToPage(${i}); return false;">${i}</a></li>`);
        }
    }
    
    // Last page
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationList.append(`<li><span class="pgn__num dots">…</span></li>`);
        }
        paginationList.append(`<li><a class="pgn__num" href="#0" onclick="goToPage(${totalPages}); return false;">${totalPages}</a></li>`);
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationList.append(`<li><a class="pgn__next" href="#0" onclick="goToPage(${currentPage + 1}); return false;">Next</a></li>`);
    } else {
        paginationList.append(`<li><span class="pgn__next" style="opacity: 0.5; cursor: not-allowed;">Next</span></li>`);
    }
}

function goToPage(page) {
    currentPage = page;
    displayEventsWithPagination();
    // Scroll to top of events list
    $('html, body').animate({
        scrollTop: $('#eventsListContainer').offset().top - 100
    }, 500);
}

function filterEvents(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    
    if (!term) {
        filteredEvents = allEvents;
        displayEventsWithPagination();
        return;
    }
    
    filteredEvents = allEvents.filter(function(event) {
        const nameMatch = event.name.toLowerCase().includes(term);
        const descMatch = event.description.toLowerCase().includes(term);
        const dateMatch = event.date.includes(term) || new Date(event.date).toLocaleDateString().toLowerCase().includes(term);
        
        return nameMatch || descMatch || dateMatch;
    });
    
    displayEventsWithPagination();
}

