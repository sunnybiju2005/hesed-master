"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Load church images gallery from Firebase Realtime Database with pagination on images.html
var currentPage = 1;
var imagesPerPage = 10;
var allImages = [];
var filteredImages = [];
$(document).ready(function () {
  loadImagesToGallery(); // Listen for Realtime Database changes

  if (window.location.pathname.includes('images.html')) {
    if (typeof db !== 'undefined') {
      db.ref('churchImages').on('value', function (snapshot) {
        currentPage = 1;
        loadImagesToGallery();
      });
    }
  }
});

function loadImagesToGallery() {
  var totalPages;
  return regeneratorRuntime.async(function loadImagesToGallery$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(getAllChurchImagesFromFirebase());

        case 3:
          allImages = _context.sent;
          filteredImages = _toConsumableArray(allImages);

          if (!(allImages.length === 0)) {
            _context.next = 10;
            break;
          }

          $('#imagesGallery').hide();
          $('#noImagesMessage').show();
          $('#paginationContainer').hide();
          return _context.abrupt("return");

        case 10:
          $('#imagesGallery').show();
          $('#noImagesMessage').hide(); // Reset to page 1 if current page is out of bounds

          totalPages = Math.ceil(filteredImages.length / imagesPerPage);

          if (currentPage > totalPages && totalPages > 0) {
            currentPage = 1;
          }

          displayImagesWithPagination();
          _context.next = 23;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          console.error('Error loading church images:', _context.t0);
          $('#imagesGallery').hide();
          $('#noImagesMessage').show();
          $('#paginationContainer').hide();

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 17]]);
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
  var gallery = $('#imagesGallery');
  gallery.empty();
  var startIndex = (currentPage - 1) * imagesPerPage;
  var endIndex = startIndex + imagesPerPage;
  var pageImages = filteredImages.slice(startIndex, endIndex);
  pageImages.forEach(function (imageData) {
    var imageHtml = "\n            <div class=\"column\">\n                <div class=\"item-entry\" data-aos=\"fade-up\">\n                    <a href=\"#\" class=\"item-entry__thumb-link\" onclick=\"openImageModal('".concat(imageData.url, "', '").concat((imageData.title || 'Church Image').replace(/'/g, "\\'"), "'); return false;\">\n                        <img src=\"").concat(imageData.url, "\" alt=\"").concat(imageData.title || 'Church Image', "\" style=\"width: 100%; height: 300px; object-fit: cover; border-radius: 8px; cursor: pointer; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); transition: transform 0.3s;\" onmouseover=\"this.style.transform='scale(1.05)'\" onmouseout=\"this.style.transform='scale(1)'\">\n                    </a>\n                    ").concat(imageData.title ? "<h3 style=\"margin-top: 1.5rem; font-size: 1.6rem; text-align: center;\">".concat(imageData.title, "</h3>") : '', "\n                </div>\n            </div>\n        ");
    gallery.append(imageHtml);
  });
}

function displayPagination() {
  var totalPages = Math.ceil(filteredImages.length / imagesPerPage);
  var paginationList = $('#paginationList');
  paginationList.empty(); // Previous button

  if (currentPage > 1) {
    paginationList.append("\n            <li>\n                <a class=\"pgn__prev\" href=\"#0\" onclick=\"goToPage(".concat(currentPage - 1, "); return false;\">Prev</a>\n            </li>\n        "));
  } else {
    paginationList.append("\n            <li>\n                <span class=\"pgn__num disabled\">Prev</span>\n            </li>\n        ");
  } // Page numbers


  var maxVisiblePages = 9;
  var startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  var endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (startPage > 1) {
    paginationList.append("\n            <li>\n                <a class=\"pgn__num\" href=\"#0\" onclick=\"goToPage(1); return false;\">1</a>\n            </li>\n        ");

    if (startPage > 2) {
      paginationList.append("\n                <li>\n                    <span class=\"pgn__num dots\">\u2026</span>\n                </li>\n            ");
    }
  }

  for (var i = startPage; i <= endPage; i++) {
    if (i === currentPage) {
      paginationList.append("\n                <li>\n                    <span class=\"pgn__num current\">".concat(i, "</span>\n                </li>\n            "));
    } else {
      paginationList.append("\n                <li>\n                    <a class=\"pgn__num\" href=\"#0\" onclick=\"goToPage(".concat(i, "); return false;\">").concat(i, "</a>\n                </li>\n            "));
    }
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      paginationList.append("\n                <li>\n                    <span class=\"pgn__num dots\">\u2026</span>\n                </li>\n            ");
    }

    paginationList.append("\n            <li>\n                <a class=\"pgn__num\" href=\"#0\" onclick=\"goToPage(".concat(totalPages, "); return false;\">").concat(totalPages, "</a>\n            </li>\n        "));
  } // Next button


  if (currentPage < totalPages) {
    paginationList.append("\n            <li>\n                <a class=\"pgn__next\" href=\"#0\" onclick=\"goToPage(".concat(currentPage + 1, "); return false;\">Next</a>\n            </li>\n        "));
  } else {
    paginationList.append("\n            <li>\n                <span class=\"pgn__num disabled\">Next</span>\n            </li>\n        ");
  }
}

function goToPage(page) {
  var totalPages = Math.ceil(filteredImages.length / imagesPerPage);

  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    displayImagesWithPagination(); // Scroll to top of gallery

    $('html, body').animate({
      scrollTop: $('#imagesGallery').offset().top - 100
    }, 500);
  }
}

function openImageModal(imageUrl, imageTitle) {
  // Create modal overlay
  var modal = $('<div>').css({
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
  }).on('click', function () {
    modal.remove();
  }); // Create modal content

  var modalContent = $('<div>').css({
    'max-width': '90%',
    'max-height': '90%',
    'position': 'relative'
  });
  var img = $('<img>').attr('src', imageUrl).attr('alt', imageTitle).css({
    'max-width': '100%',
    'max-height': '90vh',
    'object-fit': 'contain',
    'border-radius': '8px'
  });
  var title = $('<h3>').text(imageTitle).css({
    'color': '#ffffff',
    'text-align': 'center',
    'margin-top': '2rem',
    'font-size': '2rem'
  });
  var closeBtn = $('<span>').text('×').css({
    'position': 'absolute',
    'top': '-40px',
    'right': '0',
    'color': '#ffffff',
    'font-size': '4rem',
    'font-weight': 'bold',
    'cursor': 'pointer',
    'line-height': '1'
  }).on('click', function (e) {
    e.stopPropagation();
    modal.remove();
  });
  modalContent.append(img);

  if (imageTitle && imageTitle !== 'Church Image') {
    modalContent.append(title);
  }

  modalContent.append(closeBtn);
  modal.append(modalContent);
  $('body').append(modal); // Close on ESC key

  $(document).on('keydown.modal', function (e) {
    if (e.key === 'Escape') {
      modal.remove();
      $(document).off('keydown.modal');
    }
  });
}