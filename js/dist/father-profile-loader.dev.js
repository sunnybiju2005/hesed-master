"use strict";

// Load Father profile from Firebase Realtime Database and update the about page
$(document).ready(function () {
  loadFatherProfileToAboutPage(); // Listen for Realtime Database changes to update Father profile dynamically

  if (window.location.pathname.includes('about.html')) {
    if (typeof db !== 'undefined') {
      db.ref('fatherProfile/current').on('value', function (snapshot) {
        loadFatherProfileToAboutPage();
      });
    }
  }
});

function loadFatherProfileToAboutPage() {
  var container, fatherProfile, profileHtml;
  return regeneratorRuntime.async(function loadFatherProfileToAboutPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          container = $('#fatherProfileContainer');

          if (!(container.length === 0)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return");

        case 3:
          // Clear existing content
          container.empty();
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(getFatherProfileFromFirebase());

        case 7:
          fatherProfile = _context.sent;

          if (fatherProfile && (fatherProfile.name || fatherProfile.image)) {
            // Show profile from Firebase
            profileHtml = "\n                <div style=\"text-align: center;\">\n                    ".concat(fatherProfile.image ? "\n                    <div style=\"margin-bottom: 2rem;\">\n                        <img src=\"".concat(fatherProfile.image, "\" alt=\"").concat(fatherProfile.name || 'Father', "\" style=\"width: 300px; height: 300px; border-radius: 50%; object-fit: cover; border: 6px solid #000000; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);\">\n                    </div>\n                    ") : '<div style="width: 300px; height: 300px; border-radius: 50%; background-color: #e0e0e0; border: 6px solid #000000; margin: 0 auto 2rem; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);"></div>', "\n                    <h3 style=\"font-family: 'Montserrat', sans-serif; font-size: 2.8rem; font-weight: 700; color: #000000; margin: 0;\">\n                        ").concat(fatherProfile.name || 'Father', "\n                    </h3>\n                </div>\n            ");
            container.html(profileHtml);
          } else {
            // No profile set - show empty state (no default/template data)
            container.html('<div style="text-align: center;"><p style="font-size: 1.6rem; color: #666666; padding: 2rem;">No Father profile set yet.</p></div>');
          }

          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](4);
          console.error('Error loading father profile:', _context.t0);
          container.html('<div style="text-align: center;"><p style="font-size: 1.6rem; color: #dd4043; padding: 2rem;">Error loading Father profile. Please refresh the page.</p></div>');

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 11]]);
}