"use strict";

// Load service team members from Firebase Realtime Database and update the about page
$(document).ready(function () {
  loadServiceTeamToAboutPage(); // Listen for Realtime Database changes to update service team dynamically

  if (window.location.pathname.includes('about.html')) {
    if (typeof db !== 'undefined') {
      db.ref('serviceTeam').on('value', function (snapshot) {
        loadServiceTeamToAboutPage();
      });
    }
  }
});

function loadServiceTeamToAboutPage() {
  var staffContainer, serviceTeam;
  return regeneratorRuntime.async(function loadServiceTeamToAboutPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          staffContainer = $('.church-staff');

          if (!(staffContainer.length === 0)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return");

        case 3:
          // Clear existing items
          staffContainer.empty();
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(getAllServiceTeamMembersFromFirebase());

        case 7:
          serviceTeam = _context.sent;

          if (serviceTeam.length > 0) {
            // Add service team members from Firebase
            serviceTeam.forEach(function (member) {
              var imageSrc = member.image || 'images/avatars/user-01.jpg';
              var memberHtml = "\n                    <div class=\"column church-staff__item\">\n                        <div class=\"church-staff__picture\">\n                            <img src=\"".concat(imageSrc, "\" alt=\"").concat(member.name, "\">\n                        </div>\n                        <h4 class=\"church-staff__name\">\n                            ").concat(member.name, "\n                            <span class=\"church-staff__position\">\n                                ").concat(member.position, "\n                            </span>\n                        </h4>\n                    </div>\n                ");
              staffContainer.append(memberHtml);
            });
          } else {
            // No members - show empty state (no default/template data)
            staffContainer.html('<div class="column"><p style="text-align: center; font-size: 1.6rem; color: #666666; padding: 3rem;">No service team members yet.</p></div>');
          }

          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](4);
          console.error('Error loading service team:', _context.t0);
          staffContainer.html('<div class="column"><p style="text-align: center; font-size: 1.6rem; color: #dd4043; padding: 3rem;">Error loading service team. Please refresh the page.</p></div>');

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 11]]);
}