"use strict";

// Load Choir team members from Firebase Realtime Database and update the choir page
$(document).ready(function () {
  loadChoirTeamMembersToPage(); // Listen for Realtime Database changes to update Choir team dynamically

  if (window.location.pathname.includes('choir.html')) {
    if (typeof db !== 'undefined') {
      db.ref('choirTeam').on('value', function (snapshot) {
        loadChoirTeamMembersToPage();
      });
    }
  }
});

function loadChoirTeamMembersToPage() {
  var container, choirTeam;
  return regeneratorRuntime.async(function loadChoirTeamMembersToPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          container = $('.choir-team-members');

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
          return regeneratorRuntime.awrap(getAllChoirTeamMembersFromFirebase());

        case 7:
          choirTeam = _context.sent;

          if (choirTeam.length > 0) {
            // Add Choir team members from Firebase
            choirTeam.forEach(function (member) {
              var memberHtml = "\n                    <div class=\"column church-staff__item\">\n                        <div class=\"church-staff__picture\">\n                            ".concat(member.image ? "<img src=\"".concat(member.image, "\" alt=\"").concat(member.name, "\">") : '<div style="width: 15rem; height: 15rem; border-radius: 50%; background-color: #e0e0e0; margin: 0 auto;"></div>', "\n                        </div>\n                        <div class=\"church-staff__name\">\n                            ").concat(member.name, "\n                        </div>\n                        <div class=\"church-staff__position\">\n                            ").concat(member.position, "\n                        </div>\n                    </div>\n                ");
              container.append(memberHtml);
            });
          } else {
            // No members - show empty state (no default/template data)
            container.html('<div class="column"><p style="text-align: center; font-size: 1.6rem; color: #666666; padding: 3rem;">No choir team members yet.</p></div>');
          }

          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](4);
          console.error('Error loading choir team:', _context.t0);
          container.html('<div class="column"><p style="text-align: center; font-size: 1.6rem; color: #dd4043; padding: 3rem;">Error loading Choir team. Please refresh the page.</p></div>');

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 11]]);
}