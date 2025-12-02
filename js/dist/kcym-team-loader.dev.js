"use strict";

// Load KCYM team members from Firebase Realtime Database and update the KCYM page
$(document).ready(function () {
  loadKCYMTeamToPage(); // Listen for Realtime Database changes to update KCYM team dynamically

  if (window.location.pathname.includes('kcym.html')) {
    if (typeof db !== 'undefined') {
      db.ref('kcymTeam').on('value', function (snapshot) {
        loadKCYMTeamToPage();
      });
    }
  }
});

function loadKCYMTeamToPage() {
  var teamContainer, kcymTeam;
  return regeneratorRuntime.async(function loadKCYMTeamToPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          teamContainer = $('.kcym-team-members');

          if (!(teamContainer.length === 0)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return");

        case 3:
          // Clear existing items
          teamContainer.empty();
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(getAllKCYMTeamMembersFromFirebase());

        case 7:
          kcymTeam = _context.sent;

          if (kcymTeam.length > 0) {
            // Add KCYM team members from Firebase
            kcymTeam.forEach(function (member) {
              var imageSrc = member.image || 'images/avatars/user-01.jpg';
              var memberHtml = "\n                    <div class=\"column church-staff__item\">\n                        <div class=\"church-staff__picture\">\n                            <img src=\"".concat(imageSrc, "\" alt=\"").concat(member.name, "\">\n                        </div>\n                        <h4 class=\"church-staff__name\">\n                            ").concat(member.name, "\n                            <span class=\"church-staff__position\">\n                                ").concat(member.position, "\n                            </span>\n                        </h4>\n                    </div>\n                ");
              teamContainer.append(memberHtml);
            });
          } else {
            // No members - show empty state (no default/template data)
            teamContainer.html('<div class="column"><p style="text-align: center; font-size: 1.6rem; color: #666666; padding: 3rem;">No KCYM team members yet.</p></div>');
          }

          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](4);
          console.error('Error loading KCYM team:', _context.t0);
          teamContainer.html('<div class="column"><p style="text-align: center; font-size: 1.6rem; color: #dd4043; padding: 3rem;">Error loading KCYM team. Please refresh the page.</p></div>');

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 11]]);
}