"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Load news and activities from Firebase and update the index page
var newsLoaderInitialized = false;
$(document).ready(function () {
  if (!newsLoaderInitialized) {
    loadNewsToIndexPage();
    newsLoaderInitialized = true;
  } // Listen for Realtime Database changes to update news dynamically (only if on index page)


  if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
    // Set up real-time listener for news and activities updates
    if (typeof db !== 'undefined') {
      db.ref('news').on('value', function (snapshot) {
        loadNewsToIndexPage();
      });
      db.ref('activities').on('value', function (snapshot) {
        loadNewsToIndexPage();
      });
    }
  }
});

function loadNewsToIndexPage() {
  var newsTrack, newsItems, activityItems, allItems, originalItems;
  return regeneratorRuntime.async(function loadNewsToIndexPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          newsTrack = $('.news-scroll-track');

          if (!(newsTrack.length === 0)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return");

        case 3:
          // Clear ALL existing items completely
          newsTrack.empty(); // Stop any existing animations

          newsTrack.css('animation', 'none');
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(getAllNewsItemsFromFirebase());

        case 8:
          newsItems = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(getAllActivityItemsFromFirebase());

        case 11:
          activityItems = _context.sent;
          // Combine news and activities, sort by date (newest first)
          allItems = [].concat(_toConsumableArray(newsItems), _toConsumableArray(activityItems)).sort(function (a, b) {
            // Sort by date if available, otherwise by createdAt
            if (a.date && b.date) {
              return new Date(b.date) - new Date(a.date);
            }

            return (b.createdAt || 0) - (a.createdAt || 0);
          });

          if (allItems.length > 0) {
            // Add all items (news and activities)
            allItems.forEach(function (item) {
              var imageSrc = item.image || 'images/thumbs/events/event-1000.jpg';
              var newsItemHtml = "\n                    <div class=\"news-item\">\n                        <div class=\"news-image\">\n                            <img src=\"".concat(imageSrc, "\" alt=\"").concat(item.title, "\">\n                        </div>\n                        <div class=\"news-content\">\n                            <h4>").concat(item.title, "</h4>\n                            <p>").concat(item.text, "</p>\n                            <span class=\"news-date\">").concat(item.date, "</span>\n                        </div>\n                    </div>\n                ");
              newsTrack.append(newsItemHtml);
            }); // Add duplicates ONLY ONCE for seamless loop

            originalItems = newsTrack.find('.news-item');
            originalItems.clone().appendTo(newsTrack); // Restart animation

            setTimeout(function () {
              newsTrack.css('animation', 'scroll-news-left 40s linear infinite');
            }, 10);
          } else {
            // No items - show empty state
            // Don't show any default/template items
            newsTrack.html('<div class="news-item" style="text-align: center; padding: 2rem;"><p style="color: #999; font-size: 1.4rem;">No news or activities yet. Check back soon!</p></div>');
          }

          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](5);
          console.error('Error loading news and activities:', _context.t0); // Don't show default items on error - just show empty state

          newsTrack.html('<div class="news-item" style="text-align: center; padding: 2rem;"><p style="color: #999; font-size: 1.4rem;">Unable to load news. Please refresh the page.</p></div>');

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 16]]);
}