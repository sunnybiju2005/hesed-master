"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Load church images from Firebase Realtime Database and create animated carousel on About page
$(document).ready(function () {
  loadChurchImagesToCarousel(); // Listen for Realtime Database changes to update carousel dynamically

  if (window.location.pathname.includes('about.html')) {
    if (typeof db !== 'undefined') {
      db.ref('churchImages').on('value', function (snapshot) {
        loadChurchImagesToCarousel();
      });
    }
  }
});

function loadChurchImagesToCarousel() {
  var track, churchImages, allImages;
  return regeneratorRuntime.async(function loadChurchImagesToCarousel$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          track = $('#churchImagesTrack');

          if (!(track.length === 0)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return");

        case 3:
          // Clear existing content
          track.empty();
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(getAllChurchImagesFromFirebase());

        case 7:
          churchImages = _context.sent;

          if (!(churchImages.length === 0)) {
            _context.next = 11;
            break;
          }

          // No images - hide carousel (no default/template images)
          track.hide();
          return _context.abrupt("return");

        case 11:
          track.show(); // Create duplicate set for seamless loop

          allImages = [].concat(_toConsumableArray(churchImages), _toConsumableArray(churchImages));
          allImages.forEach(function (imageData) {
            var img = $('<img>').attr('src', imageData.url).attr('alt', imageData.title || 'Church Image').css({
              'flex-shrink': '0',
              'width': '300px',
              'height': '200px',
              'object-fit': 'cover',
              'border-radius': '8px',
              'box-shadow': '0 4px 15px rgba(0, 0, 0, 0.1)',
              'cursor': 'pointer'
            }).on('click', function () {
              window.location.href = 'images.html';
            });
            track.append(img);
          }); // Restart animation

          track.css('animation', 'none');
          setTimeout(function () {
            track.css('animation', 'scrollImages 30s linear infinite');
          }, 10);
          _context.next = 22;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](4);
          console.error('Error loading church images:', _context.t0);
          track.hide();

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 18]]);
}