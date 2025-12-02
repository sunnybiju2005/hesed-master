"use strict";

// Load news and activities from localStorage and update the index page
var newsLoaderInitialized = false;
$(document).ready(function () {
  if (!newsLoaderInitialized) {
    loadNewsToIndexPage();
    newsLoaderInitialized = true;
  } // Listen for Realtime Database changes to update news dynamically (only if on index page)


  if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
    // Set up real-time listener for news updates
    if (typeof db !== 'undefined') {
      db.ref('news').on('value', function (snapshot) {
        loadNewsToIndexPage();
      });
    }
  }
});

function loadNewsToIndexPage() {
  var newsTrack, newsItems, originalItems, defaultItems, _originalItems, _defaultItems, _originalItems2;

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

          if (newsItems.length > 0) {
            // Add news items (only once)
            newsItems.forEach(function (item) {
              var imageSrc = item.image || 'images/thumbs/events/event-1000.jpg';
              var newsItemHtml = "\n                <div class=\"news-item\">\n                    <div class=\"news-image\">\n                        <img src=\"".concat(imageSrc, "\" alt=\"").concat(item.title, "\">\n                    </div>\n                    <div class=\"news-content\">\n                        <h4>").concat(item.title, "</h4>\n                        <p>").concat(item.text, "</p>\n                        <span class=\"news-date\">").concat(item.date, "</span>\n                    </div>\n                </div>\n            ");
              newsTrack.append(newsItemHtml);
            }); // Add duplicates ONLY ONCE for seamless loop (only if we have items)

            if (newsItems.length > 0) {
              originalItems = newsTrack.find('.news-item');
              originalItems.clone().appendTo(newsTrack);
            } // Restart animation


            setTimeout(function () {
              newsTrack.css('animation', 'scroll-news-left 40s linear infinite');
            }, 10);
          } else {
            // Show default items if no news items exist
            defaultItems = [{
              title: 'Christmas Service Celebration',
              text: 'Our annual Christmas service was held on December 24th with great joy and fellowship. The service featured beautiful music, inspiring messages, and a wonderful time of worship together.',
              date: 'Dec 24, 2024',
              image: 'images/thumbs/events/event-1000.jpg'
            }, {
              title: 'Youth Conference 2025',
              text: 'Exciting youth conference scheduled for January 5th, 2025. Registration is now open for all young people. Join us for inspiring sessions, worship, and fellowship.',
              date: 'Jan 5, 2025',
              image: 'images/thumbs/events/event-2000.jpg'
            }];
            defaultItems.forEach(function (item) {
              var newsItemHtml = "\n                <div class=\"news-item\">\n                    <div class=\"news-image\">\n                        <img src=\"".concat(item.image, "\" alt=\"").concat(item.title, "\">\n                    </div>\n                    <div class=\"news-content\">\n                        <h4>").concat(item.title, "</h4>\n                        <p>").concat(item.text, "</p>\n                        <span class=\"news-date\">").concat(item.date, "</span>\n                    </div>\n                </div>\n            ");
              newsTrack.append(newsItemHtml);
            }); // Add duplicates ONLY ONCE for seamless loop

            _originalItems = newsTrack.find('.news-item');

            _originalItems.clone().appendTo(newsTrack); // Restart animation


            setTimeout(function () {
              newsTrack.css('animation', 'scroll-news-left 40s linear infinite');
            }, 10);
          }

          _context.next = 20;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](5);
          console.error('Error loading news:', _context.t0); // Show default items on error

          _defaultItems = [{
            title: 'Christmas Service Celebration',
            text: 'Our annual Christmas service was held on December 24th with great joy and fellowship. The service featured beautiful music, inspiring messages, and a wonderful time of worship together.',
            date: 'Dec 24, 2024',
            image: 'images/thumbs/events/event-1000.jpg'
          }, {
            title: 'Youth Conference 2025',
            text: 'Exciting youth conference scheduled for January 5th, 2025. Registration is now open for all young people. Join us for inspiring sessions, worship, and fellowship.',
            date: 'Jan 5, 2025',
            image: 'images/thumbs/events/event-2000.jpg'
          }];

          _defaultItems.forEach(function (item) {
            var newsItemHtml = "\n                <div class=\"news-item\">\n                    <div class=\"news-image\">\n                        <img src=\"".concat(item.image, "\" alt=\"").concat(item.title, "\">\n                    </div>\n                    <div class=\"news-content\">\n                        <h4>").concat(item.title, "</h4>\n                        <p>").concat(item.text, "</p>\n                        <span class=\"news-date\">").concat(item.date, "</span>\n                    </div>\n                </div>\n            ");
            newsTrack.append(newsItemHtml);
          });

          _originalItems2 = newsTrack.find('.news-item');

          _originalItems2.clone().appendTo(newsTrack);

          setTimeout(function () {
            newsTrack.css('animation', 'scroll-news-left 40s linear infinite');
          }, 10);

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 12]]);
}