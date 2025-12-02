"use strict";

// Load events from localStorage and display on events page with search functionality and pagination
var currentPage = 1;
var eventsPerPage = 10;
var allEvents = [];
var filteredEvents = [];
$(document).ready(function () {
  loadEventsToPage(); // Search functionality

  $('#eventSearch').on('input', function () {
    currentPage = 1; // Reset to first page on search

    filterEvents($(this).val());
  }); // Listen for Realtime Database changes

  if (window.location.pathname.includes('events.html')) {
    if (typeof db !== 'undefined') {
      db.ref('events').on('value', function (snapshot) {
        currentPage = 1;
        loadEventsToPage();
      });
    }
  }
});

function loadEventsToPage() {
  var container, noEventsMsg, searchTerm;
  return regeneratorRuntime.async(function loadEventsToPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          container = $('#eventsListContainer');
          noEventsMsg = $('#noEventsMessage');
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(getAllEventsFromFirebase());

        case 5:
          allEvents = _context.sent;

          if (!(allEvents.length === 0)) {
            _context.next = 12;
            break;
          }

          container.empty();
          container.html('<div class="column"><p style="text-align: center; font-size: 1.6rem; color: #666666; padding: 3rem;">No events available yet.</p></div>');
          noEventsMsg.hide();
          $('#paginationContainer').hide();
          return _context.abrupt("return");

        case 12:
          // Sort events by date (newest first)
          allEvents = allEvents.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
          }); // Apply search filter if there's a search term

          searchTerm = $('#eventSearch').val();

          if (searchTerm) {
            filterEvents(searchTerm);
          } else {
            filteredEvents = allEvents;
            displayEventsWithPagination();
          }

          _context.next = 24;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](2);
          console.error('Error loading events:', _context.t0);
          container.empty();
          container.html('<div class="column"><p style="text-align: center; font-size: 1.6rem; color: #dd4043; padding: 3rem;">Error loading events. Please refresh the page.</p></div>');
          noEventsMsg.hide();
          $('#paginationContainer').hide();

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 17]]);
}

function displayEventsWithPagination() {
  var totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  if (totalPages === 0) {
    $('#eventsListContainer').empty();
    $('#noEventsMessage').show();
    $('#paginationContainer').hide();
    return;
  } // Ensure current page is valid


  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  if (currentPage < 1) {
    currentPage = 1;
  }

  $('#noEventsMessage').hide(); // Get events for current page

  var startIndex = (currentPage - 1) * eventsPerPage;
  var endIndex = startIndex + eventsPerPage;
  var eventsToShow = filteredEvents.slice(startIndex, endIndex); // Display events

  displayEvents(eventsToShow); // Display pagination

  if (totalPages > 1) {
    displayPagination(totalPages);
  } else {
    $('#paginationContainer').hide();
  }
}

function displayEvents(events) {
  var container = $('#eventsListContainer');
  container.empty();
  events.forEach(function (event) {
    var eventDate = new Date(event.date);
    var formattedDate = eventDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    var mainImage = event.photos && event.photos.length > 0 ? event.photos[0] : 'images/thumbs/events/event-1000.jpg';
    var eventHtml = "\n            <div class=\"column events-list__item\" data-event-id=\"".concat(event.id, "\">\n                ").concat(event.photos && event.photos.length > 0 ? "\n                <div class=\"event-thumb\" style=\"margin-bottom: 2rem;\">\n                    <img src=\"".concat(mainImage, "\" alt=\"").concat(event.name, "\" style=\"width: 100%; height: 250px; object-fit: cover; border-radius: 4px;\">\n                </div>\n                ") : '', "\n                <h3 class=\"display-1 events-list__item-title\">\n                    <a href=\"events-single.html?id=").concat(event.id, "\" title=\"").concat(event.name, "\">").concat(event.name, "</a>\n                </h3>\n                <p>").concat(event.description.substring(0, 150)).concat(event.description.length > 150 ? '...' : '', "</p>\n                <ul class=\"events-list__meta\">\n                    <li class=\"events-list__meta-date\">").concat(formattedDate, "</li>\n                    ").concat(event.photos && event.photos.length > 0 ? "<li>".concat(event.photos.length, " Photo").concat(event.photos.length > 1 ? 's' : '', "</li>") : '', "\n                    ").concat(event.videos && event.videos.length > 0 ? "<li>".concat(event.videos.length, " Video").concat(event.videos.length > 1 ? 's' : '', "</li>") : '', "\n                </ul>\n            </div>\n        ");
    container.append(eventHtml);
  });
}

function displayPagination(totalPages) {
  var paginationList = $('#paginationList');
  paginationList.empty();
  $('#paginationContainer').show(); // Previous button

  if (currentPage > 1) {
    paginationList.append("<li><a class=\"pgn__prev\" href=\"#0\" onclick=\"goToPage(".concat(currentPage - 1, "); return false;\">Prev</a></li>"));
  } else {
    paginationList.append("<li><span class=\"pgn__prev\" style=\"opacity: 0.5; cursor: not-allowed;\">Prev</span></li>");
  } // Page numbers


  var startPage = Math.max(1, currentPage - 4);
  var endPage = Math.min(totalPages, currentPage + 4); // Adjust if we're near the start

  if (currentPage <= 5) {
    endPage = Math.min(9, totalPages);
  } // Adjust if we're near the end


  if (currentPage > totalPages - 5) {
    startPage = Math.max(1, totalPages - 8);
  } // First page


  if (startPage > 1) {
    paginationList.append("<li><a class=\"pgn__num\" href=\"#0\" onclick=\"goToPage(1); return false;\">1</a></li>");

    if (startPage > 2) {
      paginationList.append("<li><span class=\"pgn__num dots\">\u2026</span></li>");
    }
  } // Page number buttons


  for (var i = startPage; i <= endPage; i++) {
    if (i === currentPage) {
      paginationList.append("<li><span class=\"pgn__num current\">".concat(i, "</span></li>"));
    } else {
      paginationList.append("<li><a class=\"pgn__num\" href=\"#0\" onclick=\"goToPage(".concat(i, "); return false;\">").concat(i, "</a></li>"));
    }
  } // Last page


  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      paginationList.append("<li><span class=\"pgn__num dots\">\u2026</span></li>");
    }

    paginationList.append("<li><a class=\"pgn__num\" href=\"#0\" onclick=\"goToPage(".concat(totalPages, "); return false;\">").concat(totalPages, "</a></li>"));
  } // Next button


  if (currentPage < totalPages) {
    paginationList.append("<li><a class=\"pgn__next\" href=\"#0\" onclick=\"goToPage(".concat(currentPage + 1, "); return false;\">Next</a></li>"));
  } else {
    paginationList.append("<li><span class=\"pgn__next\" style=\"opacity: 0.5; cursor: not-allowed;\">Next</span></li>");
  }
}

function goToPage(page) {
  currentPage = page;
  displayEventsWithPagination(); // Scroll to top of events list

  $('html, body').animate({
    scrollTop: $('#eventsListContainer').offset().top - 100
  }, 500);
}

function filterEvents(searchTerm) {
  var term = searchTerm.toLowerCase().trim();

  if (!term) {
    filteredEvents = allEvents;
    displayEventsWithPagination();
    return;
  }

  filteredEvents = allEvents.filter(function (event) {
    var nameMatch = event.name.toLowerCase().includes(term);
    var descMatch = event.description.toLowerCase().includes(term);
    var dateMatch = event.date.includes(term) || new Date(event.date).toLocaleDateString().toLowerCase().includes(term);
    return nameMatch || descMatch || dateMatch;
  });
  displayEventsWithPagination();
}