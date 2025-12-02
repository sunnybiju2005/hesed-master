"use strict";

// Admin Dashboard JavaScript
// Check if user is logged in
if (sessionStorage.getItem('adminLoggedIn') !== 'true') {
  window.location.href = 'admin-login.html';
} // Sidebar navigation


$(document).ready(function () {
  $('.admin-sidebar-item').on('click', function () {
    var section = $(this).data('section'); // Update active states

    $('.admin-sidebar-item').removeClass('active');
    $(this).addClass('active');
    $('.admin-section').removeClass('active');
    $('#' + section + '-section').addClass('active'); // Reset to first tab when switching main sections

    var activeSection = $('#' + section + '-section');

    if (activeSection.find('.admin-subsection-tabs').length > 0) {
      activeSection.find('.admin-subsection-tab').first().click();
    }
  }); // Sub-section tab navigation

  $(document).on('click', '.admin-subsection-tab', function () {
    var tab = $(this);
    var subsection = tab.data('subsection');
    var section = tab.closest('.admin-section'); // Update tab active states

    section.find('.admin-subsection-tab').removeClass('active');
    tab.addClass('active'); // Update content visibility

    section.find('.admin-subsection-content').removeClass('active');
    section.find('#' + subsection + '-subsection').addClass('active');
  }); // Image preview handlers

  $('#newsImage').on('change', function (e) {
    previewImage(e.target.files[0], 'newsImagePreview');
  });
  $('#activityImage').on('change', function (e) {
    previewImage(e.target.files[0], 'activityImagePreview');
  });
  $('#memberImage').on('change', function (e) {
    previewImage(e.target.files[0], 'memberImagePreview');
  });
  $('#clcMemberImage').on('change', function (e) {
    previewImage(e.target.files[0], 'clcMemberImagePreview');
  });
  $('#kcymMemberImage').on('change', function (e) {
    previewImage(e.target.files[0], 'kcymMemberImagePreview');
  });
  $('#mathrusangamMemberImage').on('change', function (e) {
    previewImage(e.target.files[0], 'mathrusangamMemberImagePreview');
  });
  $('#choirMemberImage').on('change', function (e) {
    previewImage(e.target.files[0], 'choirMemberImagePreview');
  });
  $('#fatherImage').on('change', function (e) {
    previewImage(e.target.files[0], 'fatherImagePreview');
  });
  $('#churchImage').on('change', function (e) {
    previewImage(e.target.files[0], 'churchImagePreview');
  }); // Load existing items

  loadNewsItems();
  loadActivitiesItems();
  loadServiceTeamMembers();
  loadCLCTeamMembers();
  loadKCYMTeamMembers();
  loadChoirTeamMembers();
  loadMathrusangamTeamMembers();
  loadEvents();
  loadFatherProfile();
  loadChurchImages(); // Form submissions

  $('#newsForm').on('submit', function (e) {
    e.preventDefault();
    saveNewsItem();
  });
  $('#activitiesForm').on('submit', function (e) {
    e.preventDefault();
    saveActivityItem();
  });
  $('#serviceTeamForm').on('submit', function (e) {
    e.preventDefault();
    var editingId = $(this).data('editingId');

    if (editingId) {
      updateServiceTeamMember(editingId);
    } else {
      saveServiceTeamMember();
    }
  });
  $('#clcTeamForm').on('submit', function (e) {
    e.preventDefault();
    var editingId = $(this).data('editingId');

    if (editingId) {
      updateCLCTeamMember(editingId);
    } else {
      saveCLCTeamMember();
    }
  });
  $('#kcymTeamForm').on('submit', function (e) {
    e.preventDefault();
    var editingId = $(this).data('editingId');

    if (editingId) {
      updateKCYMTeamMember(editingId);
    } else {
      saveKCYMTeamMember();
    }
  });
  $('#mathrusangamTeamForm').on('submit', function (e) {
    e.preventDefault();
    var editingId = $(this).data('editingId');

    if (editingId) {
      updateMathrusangamTeamMember(editingId);
    } else {
      saveMathrusangamTeamMember();
    }
  });
  $('#eventPhotos').on('change', function (e) {
    previewMultipleImages(e.target.files, 'eventPhotosPreview');
  });
  $('#eventsForm').on('submit', function (e) {
    e.preventDefault();
    var editingId = $(this).data('editingId');

    if (editingId) {
      updateEvent(editingId);
    } else {
      saveEvent();
    }
  });
  $('#fatherProfileForm').on('submit', function (e) {
    e.preventDefault();
    saveFatherProfile();
  });
  $('#churchImagesForm').on('submit', function (e) {
    e.preventDefault();
    saveChurchImage();
  });
}); // Image preview function

function previewImage(file, previewId) {
  if (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#' + previewId).html('<img src="' + e.target.result + '" alt="Preview">');
    };

    reader.readAsDataURL(file);
  }
} // Save News Item


function saveNewsItem() {
  var title, text, imageFile, newItem, imagePath, imageUrl;
  return regeneratorRuntime.async(function saveNewsItem$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          title = $('#newsTitle').val();
          text = $('#newsText').val();
          imageFile = $('#newsImage')[0].files[0];

          if (!(!title || !text)) {
            _context.next = 6;
            break;
          }

          showMessage('newsMessage', 'Please fill in all fields', 'error');
          return _context.abrupt("return");

        case 6:
          // Create new item
          newItem = {
            title: title,
            text: text,
            date: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }),
            image: null
          };
          _context.prev = 7;

          if (!imageFile) {
            _context.next = 16;
            break;
          }

          console.log('Starting image upload for news item...');
          imagePath = "news/".concat(Date.now(), "_").concat(imageFile.name);
          _context.next = 13;
          return regeneratorRuntime.awrap(uploadImageToFirebaseStorage(imageFile, imagePath));

        case 13:
          imageUrl = _context.sent;
          console.log('Image uploaded successfully, URL:', imageUrl);
          newItem.image = imageUrl;

        case 16:
          // Save to Firebase
          console.log('Saving news item to Firestore...');
          _context.next = 19;
          return regeneratorRuntime.awrap(saveNewsItemToFirebase(newItem));

        case 19:
          loadNewsItems();
          clearNewsForm();
          showMessage('newsMessage', 'News item saved successfully!', 'success');
          _context.next = 29;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](7);
          console.error('Error saving news item:', _context.t0);
          console.error('Error details:', {
            message: _context.t0.message,
            stack: _context.t0.stack
          });
          showMessage('newsMessage', "Error: ".concat(_context.t0.message), 'error');

        case 29:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[7, 24]]);
} // Save Activity Item


function saveActivityItem() {
  var title, text, imageFile, newItem, imagePath, imageUrl;
  return regeneratorRuntime.async(function saveActivityItem$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          title = $('#activityTitle').val();
          text = $('#activityText').val();
          imageFile = $('#activityImage')[0].files[0];

          if (!(!title || !text)) {
            _context2.next = 6;
            break;
          }

          showMessage('activitiesMessage', 'Please fill in all fields', 'error');
          return _context2.abrupt("return");

        case 6:
          // Create new item
          newItem = {
            title: title,
            text: text,
            date: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }),
            image: null
          };
          _context2.prev = 7;

          if (!imageFile) {
            _context2.next = 14;
            break;
          }

          imagePath = "activities/".concat(Date.now(), "_").concat(imageFile.name);
          _context2.next = 12;
          return regeneratorRuntime.awrap(uploadImageToFirebaseStorage(imageFile, imagePath));

        case 12:
          imageUrl = _context2.sent;
          // Actually uses Cloudinary
          newItem.image = imageUrl;

        case 14:
          _context2.next = 16;
          return regeneratorRuntime.awrap(saveActivityItemToFirebase(newItem));

        case 16:
          loadActivitiesItems();
          clearActivityForm();
          showMessage('activitiesMessage', 'Activity saved successfully!', 'success');
          _context2.next = 25;
          break;

        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2["catch"](7);
          console.error('Error saving activity item:', _context2.t0);
          showMessage('activitiesMessage', 'Error saving activity. Please try again.', 'error');

        case 25:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[7, 21]]);
} // Load News Items


function loadNewsItems() {
  var listContainer, newsItems;
  return regeneratorRuntime.async(function loadNewsItems$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          listContainer = $('#newsItemsList');
          listContainer.empty();
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(getAllNewsItemsFromFirebase());

        case 5:
          newsItems = _context3.sent;

          if (!(newsItems.length === 0)) {
            _context3.next = 9;
            break;
          }

          listContainer.html('<p style="font-size: 1.4rem; color: #666666;">No news items yet. Create your first news item above.</p>');
          return _context3.abrupt("return");

        case 9:
          newsItems.forEach(function (item) {
            var itemHtml = "\n                <div class=\"admin-item-card\">\n                    <div class=\"admin-item-info\">\n                        <h3>".concat(item.title, "</h3>\n                        <p>").concat(item.text.substring(0, 100)).concat(item.text.length > 100 ? '...' : '', "</p>\n                        <p style=\"font-size: 1.2rem; color: #999999; margin-top: 0.5rem;\">Date: ").concat(item.date, "</p>\n                    </div>\n                    <div class=\"admin-item-actions\">\n                        <button class=\"admin-btn admin-btn-secondary\" onclick=\"editNewsItem('").concat(item.id, "')\">Edit</button>\n                        <button class=\"admin-btn admin-btn-danger\" onclick=\"deleteNewsItem('").concat(item.id, "')\">Delete</button>\n                    </div>\n                </div>\n            ");
            listContainer.append(itemHtml);
          });
          _context3.next = 16;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](2);
          console.error('Error loading news items:', _context3.t0);
          listContainer.html('<p style="font-size: 1.4rem; color: #dd4043;">Error loading news items. Please refresh the page.</p>');

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 12]]);
} // Load Activities Items


function loadActivitiesItems() {
  var listContainer, activitiesItems;
  return regeneratorRuntime.async(function loadActivitiesItems$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          listContainer = $('#activitiesItemsList');
          listContainer.empty();
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(getAllActivityItemsFromFirebase());

        case 5:
          activitiesItems = _context4.sent;

          if (!(activitiesItems.length === 0)) {
            _context4.next = 9;
            break;
          }

          listContainer.html('<p style="font-size: 1.4rem; color: #cccccc;">No activities yet. Create your first activity above.</p>');
          return _context4.abrupt("return");

        case 9:
          activitiesItems.forEach(function (item) {
            var itemHtml = "\n                <div class=\"admin-item-card\">\n                    <div class=\"admin-item-info\">\n                        <h3>".concat(item.title, "</h3>\n                        <p>").concat(item.text.substring(0, 100)).concat(item.text.length > 100 ? '...' : '', "</p>\n                        <p style=\"font-size: 1.2rem; color: #999999; margin-top: 0.5rem;\">Date: ").concat(item.date, "</p>\n                    </div>\n                    <div class=\"admin-item-actions\">\n                        <button class=\"admin-btn admin-btn-secondary\" onclick=\"editActivityItem('").concat(item.id, "')\">Edit</button>\n                        <button class=\"admin-btn admin-btn-danger\" onclick=\"deleteActivityItem('").concat(item.id, "')\">Delete</button>\n                    </div>\n                </div>\n            ");
            listContainer.append(itemHtml);
          });
          _context4.next = 16;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](2);
          console.error('Error loading activities:', _context4.t0);
          listContainer.html('<p style="font-size: 1.4rem; color: #dd4043;">Error loading activities. Please refresh the page.</p>');

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 12]]);
} // Edit News Item


function editNewsItem(id) {
  var newsItems, item;
  return regeneratorRuntime.async(function editNewsItem$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(getAllNewsItemsFromFirebase());

        case 3:
          newsItems = _context5.sent;
          item = newsItems.find(function (n) {
            return n.id === id;
          });

          if (item) {
            $('#newsTitle').val(item.title);
            $('#newsText').val(item.text);

            if (item.image) {
              $('#newsImagePreview').html('<img src="' + item.image + '" alt="Preview">');
            } // Switch to news section


            $('.admin-sidebar-item[data-section="news-activities"]').click();
            setTimeout(function () {
              $('.admin-subsection-tab[data-subsection="news"]').click();
            }, 100); // Store editing ID

            $('#newsForm').data('editingId', id);
          }

          _context5.next = 12;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          console.error('Error loading news item for editing:', _context5.t0);
          showMessage('newsMessage', 'Error loading news item. Please try again.', 'error');

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
} // Edit Activity Item


function editActivityItem(id) {
  var activitiesItems, item;
  return regeneratorRuntime.async(function editActivityItem$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(getAllActivityItemsFromFirebase());

        case 3:
          activitiesItems = _context6.sent;
          item = activitiesItems.find(function (a) {
            return a.id === id;
          });

          if (item) {
            $('#activityTitle').val(item.title);
            $('#activityText').val(item.text);

            if (item.image) {
              $('#activityImagePreview').html('<img src="' + item.image + '" alt="Preview">');
            } // Switch to activities section


            $('.admin-sidebar-item[data-section="news-activities"]').click();
            setTimeout(function () {
              $('.admin-subsection-tab[data-subsection="activities"]').click();
            }, 100); // Store editing ID

            $('#activitiesForm').data('editingId', id);
          }

          _context6.next = 12;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.error('Error loading activity for editing:', _context6.t0);
          showMessage('activitiesMessage', 'Error loading activity. Please try again.', 'error');

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 8]]);
} // Delete News Item


function deleteNewsItem(id) {
  var newsItems, item;
  return regeneratorRuntime.async(function deleteNewsItem$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          if (!confirm('Are you sure you want to delete this news item?')) {
            _context7.next = 25;
            break;
          }

          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(getAllNewsItemsFromFirebase());

        case 4:
          newsItems = _context7.sent;
          item = newsItems.find(function (n) {
            return n.id === id;
          });

          if (!(item && item.image)) {
            _context7.next = 15;
            break;
          }

          _context7.prev = 7;
          _context7.next = 10;
          return regeneratorRuntime.awrap(deleteImageFromFirebaseStorage(item.image));

        case 10:
          _context7.next = 15;
          break;

        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](7);
          console.warn('Could not delete image from storage:', _context7.t0);

        case 15:
          _context7.next = 17;
          return regeneratorRuntime.awrap(deleteNewsItemFromFirebase(id));

        case 17:
          loadNewsItems();
          showMessage('newsMessage', 'News item deleted successfully!', 'success');
          _context7.next = 25;
          break;

        case 21:
          _context7.prev = 21;
          _context7.t1 = _context7["catch"](1);
          console.error('Error deleting news item:', _context7.t1);
          showMessage('newsMessage', 'Error deleting news item. Please try again.', 'error');

        case 25:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 21], [7, 12]]);
} // Delete Activity Item


function deleteActivityItem(id) {
  var activitiesItems, item;
  return regeneratorRuntime.async(function deleteActivityItem$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          if (!confirm('Are you sure you want to delete this activity?')) {
            _context8.next = 25;
            break;
          }

          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(getAllActivityItemsFromFirebase());

        case 4:
          activitiesItems = _context8.sent;
          item = activitiesItems.find(function (a) {
            return a.id === id;
          });

          if (!(item && item.image)) {
            _context8.next = 15;
            break;
          }

          _context8.prev = 7;
          _context8.next = 10;
          return regeneratorRuntime.awrap(deleteImageFromFirebaseStorage(item.image));

        case 10:
          _context8.next = 15;
          break;

        case 12:
          _context8.prev = 12;
          _context8.t0 = _context8["catch"](7);
          console.warn('Could not delete image from storage:', _context8.t0);

        case 15:
          _context8.next = 17;
          return regeneratorRuntime.awrap(deleteActivityItemFromFirebase(id));

        case 17:
          loadActivitiesItems();
          showMessage('activitiesMessage', 'Activity deleted successfully!', 'success');
          _context8.next = 25;
          break;

        case 21:
          _context8.prev = 21;
          _context8.t1 = _context8["catch"](1);
          console.error('Error deleting activity:', _context8.t1);
          showMessage('activitiesMessage', 'Error deleting activity. Please try again.', 'error');

        case 25:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 21], [7, 12]]);
} // Clear News Form


function clearNewsForm() {
  $('#newsForm')[0].reset();
  $('#newsImagePreview').empty();
  $('#newsForm').removeData('editingId');
} // Clear Activity Form


function clearActivityForm() {
  $('#activitiesForm')[0].reset();
  $('#activityImagePreview').empty();
  $('#activitiesForm').removeData('editingId');
} // Show Message


function showMessage(elementId, message, type) {
  var element = $('#' + elementId);
  element.text(message).removeClass('success error').addClass(type);
  setTimeout(function () {
    element.removeClass('success error');
  }, 3000);
} // Update Index Page News


function updateIndexPageNews() {
  var newsItems = JSON.parse(localStorage.getItem('newsItems') || '[]'); // Set a timestamp to trigger update

  localStorage.setItem('indexPageNewsUpdated', Date.now().toString()); // Trigger custom event for same-tab updates

  if (typeof loadNewsToIndexPage === 'function') {
    // If we're on the index page, reload directly
    loadNewsToIndexPage();
  }
} // Update Index Page Activities


function updateIndexPageActivities() {
  var activitiesItems = JSON.parse(localStorage.getItem('activitiesItems') || '[]'); // Set a timestamp to trigger update

  localStorage.setItem('indexPageActivitiesUpdated', Date.now().toString()); // Trigger custom event for same-tab updates

  if (typeof loadNewsToIndexPage === 'function') {
    // If we're on the index page, reload directly
    loadNewsToIndexPage();
  }
} // Save Service Team Member


function saveServiceTeamMember() {
  var name, position, imageFile, imagePath, imageUrl, newMember;
  return regeneratorRuntime.async(function saveServiceTeamMember$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          name = $('#memberName').val();
          position = $('#memberPosition').val();
          imageFile = $('#memberImage')[0].files[0];

          if (!(!name || !position)) {
            _context9.next = 6;
            break;
          }

          showMessage('serviceTeamMessage', 'Please fill in all fields', 'error');
          return _context9.abrupt("return");

        case 6:
          if (imageFile) {
            _context9.next = 9;
            break;
          }

          showMessage('serviceTeamMessage', 'Please upload a profile image', 'error');
          return _context9.abrupt("return");

        case 9:
          _context9.prev = 9;
          // Upload image to Cloudinary (not Firebase Storage)
          imagePath = "teams/service/".concat(Date.now(), "_").concat(imageFile.name);
          _context9.next = 13;
          return regeneratorRuntime.awrap(uploadImageToFirebaseStorage(imageFile, imagePath));

        case 13:
          imageUrl = _context9.sent;
          // Actually uses Cloudinary
          newMember = {
            name: name,
            position: position,
            image: imageUrl
          };
          _context9.next = 17;
          return regeneratorRuntime.awrap(saveServiceTeamMemberToFirebase(newMember));

        case 17:
          loadServiceTeamMembers();
          clearServiceTeamForm();
          showMessage('serviceTeamMessage', 'Service team member saved successfully!', 'success');
          _context9.next = 26;
          break;

        case 22:
          _context9.prev = 22;
          _context9.t0 = _context9["catch"](9);
          console.error('Error saving service team member:', _context9.t0);
          showMessage('serviceTeamMessage', 'Error saving member. Please try again.', 'error');

        case 26:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[9, 22]]);
} // Load Service Team Members


function loadServiceTeamMembers() {
  var listContainer, serviceTeam;
  return regeneratorRuntime.async(function loadServiceTeamMembers$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          listContainer = $('#serviceTeamList');
          listContainer.empty();
          _context10.prev = 2;
          _context10.next = 5;
          return regeneratorRuntime.awrap(getAllServiceTeamMembersFromFirebase());

        case 5:
          serviceTeam = _context10.sent;

          if (!(serviceTeam.length === 0)) {
            _context10.next = 9;
            break;
          }

          listContainer.html('<p style="font-size: 1.4rem; color: #cccccc;">No service team members yet. Add your first member above.</p>');
          return _context10.abrupt("return");

        case 9:
          serviceTeam.forEach(function (member) {
            var memberHtml = "\n                <div class=\"admin-item-card\">\n                    <div class=\"admin-item-info\" style=\"display: flex; align-items: center; gap: 2rem;\">\n                        ".concat(member.image ? "<img src=\"".concat(member.image, "\" alt=\"").concat(member.name, "\" style=\"width: 80px; height: 80px; border-radius: 50%; object-fit: cover;\">") : '<div style="width: 80px; height: 80px; border-radius: 50%; background-color: #444444;"></div>', "\n                        <div>\n                            <h3>").concat(member.name, "</h3>\n                            <p>").concat(member.position, "</p>\n                        </div>\n                    </div>\n                    <div class=\"admin-item-actions\">\n                        <button class=\"admin-btn admin-btn-secondary\" onclick=\"editServiceTeamMember('").concat(member.id, "')\">Edit</button>\n                        <button class=\"admin-btn admin-btn-danger\" onclick=\"deleteServiceTeamMember('").concat(member.id, "')\">Delete</button>\n                    </div>\n                </div>\n            ");
            listContainer.append(memberHtml);
          });
          _context10.next = 16;
          break;

        case 12:
          _context10.prev = 12;
          _context10.t0 = _context10["catch"](2);
          console.error('Error loading service team members:', _context10.t0);
          listContainer.html('<p style="font-size: 1.4rem; color: #dd4043;">Error loading service team. Please refresh the page.</p>');

        case 16:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[2, 12]]);
} // Edit Service Team Member


function editServiceTeamMember(id) {
  var serviceTeam, member;
  return regeneratorRuntime.async(function editServiceTeamMember$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(getAllServiceTeamMembersFromFirebase());

        case 3:
          serviceTeam = _context11.sent;
          member = serviceTeam.find(function (m) {
            return m.id === id;
          });

          if (member) {
            $('#memberName').val(member.name);
            $('#memberPosition').val(member.position);

            if (member.image) {
              $('#memberImagePreview').html('<img src="' + member.image + '" alt="Preview">');
            } // Switch to service team section


            $('.admin-sidebar-item[data-section="about"]').click();
            setTimeout(function () {
              $('.admin-subsection-tab[data-subsection="service-team"]').click();
            }, 100); // Store editing ID

            $('#serviceTeamForm').data('editingId', id);
            $('#serviceTeamForm').data('existingImage', member.image);
          }

          _context11.next = 12;
          break;

        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](0);
          console.error('Error loading service team member for editing:', _context11.t0);
          showMessage('serviceTeamMessage', 'Error loading member. Please try again.', 'error');

        case 12:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 8]]);
} // Update Service Team Member


function updateServiceTeamMember(id) {
  var name, position, imageFile, serviceTeam, member, updatedMember, imagePath;
  return regeneratorRuntime.async(function updateServiceTeamMember$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          name = $('#memberName').val();
          position = $('#memberPosition').val();
          imageFile = $('#memberImage')[0].files[0];

          if (!(!name || !position)) {
            _context12.next = 6;
            break;
          }

          showMessage('serviceTeamMessage', 'Please fill in all fields', 'error');
          return _context12.abrupt("return");

        case 6:
          _context12.prev = 6;
          _context12.next = 9;
          return regeneratorRuntime.awrap(getAllServiceTeamMembersFromFirebase());

        case 9:
          serviceTeam = _context12.sent;
          member = serviceTeam.find(function (m) {
            return m.id === id;
          });

          if (member) {
            _context12.next = 14;
            break;
          }

          showMessage('serviceTeamMessage', 'Member not found', 'error');
          return _context12.abrupt("return");

        case 14:
          updatedMember = {
            name: name,
            position: position,
            image: member.image // Keep existing image by default

          }; // Handle new image upload

          if (!imageFile) {
            _context12.next = 29;
            break;
          }

          if (!member.image) {
            _context12.next = 25;
            break;
          }

          _context12.prev = 17;
          _context12.next = 20;
          return regeneratorRuntime.awrap(deleteImageFromFirebaseStorage(member.image));

        case 20:
          _context12.next = 25;
          break;

        case 22:
          _context12.prev = 22;
          _context12.t0 = _context12["catch"](17);
          console.warn('Could not delete old image:', _context12.t0);

        case 25:
          // Upload new image
          imagePath = "teams/service/".concat(Date.now(), "_").concat(imageFile.name);
          _context12.next = 28;
          return regeneratorRuntime.awrap(uploadImageToFirebaseStorage(imageFile, imagePath));

        case 28:
          updatedMember.image = _context12.sent;

        case 29:
          _context12.next = 31;
          return regeneratorRuntime.awrap(updateServiceTeamMemberInFirebase(id, updatedMember));

        case 31:
          loadServiceTeamMembers();
          clearServiceTeamForm();
          showMessage('serviceTeamMessage', 'Service team member updated successfully!', 'success');
          _context12.next = 40;
          break;

        case 36:
          _context12.prev = 36;
          _context12.t1 = _context12["catch"](6);
          console.error('Error updating service team member:', _context12.t1);
          showMessage('serviceTeamMessage', 'Error updating member. Please try again.', 'error');

        case 40:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[6, 36], [17, 22]]);
} // Delete Service Team Member


function deleteServiceTeamMember(id) {
  var serviceTeam, member;
  return regeneratorRuntime.async(function deleteServiceTeamMember$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          if (!confirm('Are you sure you want to delete this service team member?')) {
            _context13.next = 25;
            break;
          }

          _context13.prev = 1;
          _context13.next = 4;
          return regeneratorRuntime.awrap(getAllServiceTeamMembersFromFirebase());

        case 4:
          serviceTeam = _context13.sent;
          member = serviceTeam.find(function (m) {
            return m.id === id;
          });

          if (!(member && member.image)) {
            _context13.next = 15;
            break;
          }

          _context13.prev = 7;
          _context13.next = 10;
          return regeneratorRuntime.awrap(deleteImageFromFirebaseStorage(member.image));

        case 10:
          _context13.next = 15;
          break;

        case 12:
          _context13.prev = 12;
          _context13.t0 = _context13["catch"](7);
          console.warn('Could not delete image from storage:', _context13.t0);

        case 15:
          _context13.next = 17;
          return regeneratorRuntime.awrap(deleteServiceTeamMemberFromFirebase(id));

        case 17:
          loadServiceTeamMembers();
          showMessage('serviceTeamMessage', 'Service team member deleted successfully!', 'success');
          _context13.next = 25;
          break;

        case 21:
          _context13.prev = 21;
          _context13.t1 = _context13["catch"](1);
          console.error('Error deleting service team member:', _context13.t1);
          showMessage('serviceTeamMessage', 'Error deleting member. Please try again.', 'error');

        case 25:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[1, 21], [7, 12]]);
} // Clear Service Team Form


function clearServiceTeamForm() {
  $('#serviceTeamForm')[0].reset();
  $('#memberImagePreview').empty();
  $('#serviceTeamForm').removeData('editingId');
} // Update About Page Service Team


function updateAboutPageServiceTeam() {
  var serviceTeam = JSON.parse(localStorage.getItem('serviceTeam') || '[]');
  localStorage.setItem('aboutPageServiceTeamUpdated', Date.now().toString());
} // CLC Team Functions


function saveCLCTeamMember() {
  var name, position, imageFile, imagePath, imageUrl, newMember;
  return regeneratorRuntime.async(function saveCLCTeamMember$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          name = $('#clcMemberName').val();
          position = $('#clcMemberPosition').val();
          imageFile = $('#clcMemberImage')[0].files[0];

          if (!(!name || !position)) {
            _context14.next = 6;
            break;
          }

          showMessage('clcTeamMessage', 'Please fill in all fields', 'error');
          return _context14.abrupt("return");

        case 6:
          if (imageFile) {
            _context14.next = 9;
            break;
          }

          showMessage('clcTeamMessage', 'Please upload a profile image', 'error');
          return _context14.abrupt("return");

        case 9:
          _context14.prev = 9;
          // Upload image to Cloudinary
          imagePath = "teams/clc/".concat(Date.now(), "_").concat(imageFile.name);
          _context14.next = 13;
          return regeneratorRuntime.awrap(uploadImageToFirebaseStorage(imageFile, imagePath));

        case 13:
          imageUrl = _context14.sent;
          // Actually uses Cloudinary
          newMember = {
            name: name,
            position: position,
            image: imageUrl
          };
          _context14.next = 17;
          return regeneratorRuntime.awrap(saveCLCTeamMemberToFirebase(newMember));

        case 17:
          loadCLCTeamMembers();
          clearCLCTeamForm();
          showMessage('clcTeamMessage', 'CLC team member saved successfully!', 'success');
          _context14.next = 26;
          break;

        case 22:
          _context14.prev = 22;
          _context14.t0 = _context14["catch"](9);
          console.error('Error saving CLC team member:', _context14.t0);
          showMessage('clcTeamMessage', 'Error saving member. Please try again.', 'error');

        case 26:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[9, 22]]);
}

function loadCLCTeamMembers() {
  var listContainer, clcTeam;
  return regeneratorRuntime.async(function loadCLCTeamMembers$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          listContainer = $('#clcTeamList');
          listContainer.empty();
          _context15.prev = 2;
          _context15.next = 5;
          return regeneratorRuntime.awrap(getAllCLCTeamMembersFromFirebase());

        case 5:
          clcTeam = _context15.sent;

          if (!(clcTeam.length === 0)) {
            _context15.next = 9;
            break;
          }

          listContainer.html('<p style="font-size: 1.4rem; color: #cccccc;">No CLC team members yet. Add your first member above.</p>');
          return _context15.abrupt("return");

        case 9:
          clcTeam.forEach(function (member) {
            var memberHtml = "\n                <div class=\"admin-item-card\">\n                    <div class=\"admin-item-info\" style=\"display: flex; align-items: center; gap: 2rem;\">\n                        ".concat(member.image ? "<img src=\"".concat(member.image, "\" alt=\"").concat(member.name, "\" style=\"width: 80px; height: 80px; border-radius: 50%; object-fit: cover;\">") : '<div style="width: 80px; height: 80px; border-radius: 50%; background-color: #444444;"></div>', "\n                        <div>\n                            <h3>").concat(member.name, "</h3>\n                            <p>").concat(member.position, "</p>\n                        </div>\n                    </div>\n                    <div class=\"admin-item-actions\">\n                        <button class=\"admin-btn admin-btn-secondary\" onclick=\"editCLCTeamMember('").concat(member.id, "')\">Edit</button>\n                        <button class=\"admin-btn admin-btn-danger\" onclick=\"deleteCLCTeamMember('").concat(member.id, "')\">Delete</button>\n                    </div>\n                </div>\n            ");
            listContainer.append(memberHtml);
          });
          _context15.next = 16;
          break;

        case 12:
          _context15.prev = 12;
          _context15.t0 = _context15["catch"](2);
          console.error('Error loading CLC team members:', _context15.t0);
          listContainer.html('<p style="font-size: 1.4rem; color: #dd4043;">Error loading CLC team. Please refresh the page.</p>');

        case 16:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[2, 12]]);
}

function editCLCTeamMember(id) {
  var clcTeam, member;
  return regeneratorRuntime.async(function editCLCTeamMember$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return regeneratorRuntime.awrap(getAllCLCTeamMembersFromFirebase());

        case 3:
          clcTeam = _context16.sent;
          member = clcTeam.find(function (m) {
            return m.id === id;
          });

          if (member) {
            $('#clcMemberName').val(member.name);
            $('#clcMemberPosition').val(member.position);

            if (member.image) {
              $('#clcMemberImagePreview').html('<img src="' + member.image + '" alt="Preview">');
            }

            $('.admin-sidebar-item[data-section="service-teams"]').click();
            setTimeout(function () {
              $('.admin-subsection-tab[data-subsection="clc-team"]').click();
            }, 100);
            $('#clcTeamForm').data('editingId', id);
            $('#clcTeamForm').data('existingImage', member.image);
          }

          _context16.next = 12;
          break;

        case 8:
          _context16.prev = 8;
          _context16.t0 = _context16["catch"](0);
          console.error('Error loading CLC team member for editing:', _context16.t0);
          showMessage('clcTeamMessage', 'Error loading member. Please try again.', 'error');

        case 12:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

function updateCLCTeamMember(id) {
  var name, position, imageFile, clcTeam, member, updatedMember, imagePath;
  return regeneratorRuntime.async(function updateCLCTeamMember$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          name = $('#clcMemberName').val();
          position = $('#clcMemberPosition').val();
          imageFile = $('#clcMemberImage')[0].files[0];

          if (!(!name || !position)) {
            _context17.next = 6;
            break;
          }

          showMessage('clcTeamMessage', 'Please fill in all fields', 'error');
          return _context17.abrupt("return");

        case 6:
          _context17.prev = 6;
          _context17.next = 9;
          return regeneratorRuntime.awrap(getAllCLCTeamMembersFromFirebase());

        case 9:
          clcTeam = _context17.sent;
          member = clcTeam.find(function (m) {
            return m.id === id;
          });

          if (member) {
            _context17.next = 14;
            break;
          }

          showMessage('clcTeamMessage', 'Member not found', 'error');
          return _context17.abrupt("return");

        case 14:
          updatedMember = {
            name: name,
            position: position,
            image: member.image // Keep existing image by default

          }; // Handle new image upload

          if (!imageFile) {
            _context17.next = 29;
            break;
          }

          if (!member.image) {
            _context17.next = 25;
            break;
          }

          _context17.prev = 17;
          _context17.next = 20;
          return regeneratorRuntime.awrap(deleteImageFromFirebaseStorage(member.image));

        case 20:
          _context17.next = 25;
          break;

        case 22:
          _context17.prev = 22;
          _context17.t0 = _context17["catch"](17);
          console.warn('Could not delete old image:', _context17.t0);

        case 25:
          // Upload new image to Cloudinary
          imagePath = "teams/clc/".concat(Date.now(), "_").concat(imageFile.name);
          _context17.next = 28;
          return regeneratorRuntime.awrap(uploadImageToFirebaseStorage(imageFile, imagePath));

        case 28:
          updatedMember.image = _context17.sent;

        case 29:
          _context17.next = 31;
          return regeneratorRuntime.awrap(updateCLCTeamMemberInFirebase(id, updatedMember));

        case 31:
          loadCLCTeamMembers();
          clearCLCTeamForm();
          showMessage('clcTeamMessage', 'CLC team member updated successfully!', 'success');
          _context17.next = 40;
          break;

        case 36:
          _context17.prev = 36;
          _context17.t1 = _context17["catch"](6);
          console.error('Error updating CLC team member:', _context17.t1);
          showMessage('clcTeamMessage', 'Error updating member. Please try again.', 'error');

        case 40:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[6, 36], [17, 22]]);
}

function deleteCLCTeamMember(id) {
  var clcTeam, member;
  return regeneratorRuntime.async(function deleteCLCTeamMember$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          if (!confirm('Are you sure you want to delete this CLC team member?')) {
            _context18.next = 25;
            break;
          }

          _context18.prev = 1;
          _context18.next = 4;
          return regeneratorRuntime.awrap(getAllCLCTeamMembersFromFirebase());

        case 4:
          clcTeam = _context18.sent;
          member = clcTeam.find(function (m) {
            return m.id === id;
          });

          if (!(member && member.image)) {
            _context18.next = 15;
            break;
          }

          _context18.prev = 7;
          _context18.next = 10;
          return regeneratorRuntime.awrap(deleteImageFromFirebaseStorage(member.image));

        case 10:
          _context18.next = 15;
          break;

        case 12:
          _context18.prev = 12;
          _context18.t0 = _context18["catch"](7);
          console.warn('Could not delete image from Cloudinary:', _context18.t0);

        case 15:
          _context18.next = 17;
          return regeneratorRuntime.awrap(deleteCLCTeamMemberFromFirebase(id));

        case 17:
          loadCLCTeamMembers();
          showMessage('clcTeamMessage', 'CLC team member deleted successfully!', 'success');
          _context18.next = 25;
          break;

        case 21:
          _context18.prev = 21;
          _context18.t1 = _context18["catch"](1);
          console.error('Error deleting CLC team member:', _context18.t1);
          showMessage('clcTeamMessage', 'Error deleting member. Please try again.', 'error');

        case 25:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[1, 21], [7, 12]]);
}

function clearCLCTeamForm() {
  $('#clcTeamForm')[0].reset();
  $('#clcMemberImagePreview').empty();
  $('#clcTeamForm').removeData('editingId');
  $('#clcTeamForm').removeData('existingImage');
} // KCYM Team Functions


function saveKCYMTeamMember() {
  var name, position, imageFile, imagePath, imageUrl, newMember;
  return regeneratorRuntime.async(function saveKCYMTeamMember$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          name = $('#kcymMemberName').val();
          position = $('#kcymMemberPosition').val();
          imageFile = $('#kcymMemberImage')[0].files[0];

          if (!(!name || !position)) {
            _context19.next = 6;
            break;
          }

          showMessage('kcymTeamMessage', 'Please fill in all fields', 'error');
          return _context19.abrupt("return");

        case 6:
          if (imageFile) {
            _context19.next = 9;
            break;
          }

          showMessage('kcymTeamMessage', 'Please upload a profile image', 'error');
          return _context19.abrupt("return");

        case 9:
          _context19.prev = 9;
          // Upload image to Cloudinary
          imagePath = "teams/kcym/".concat(Date.now(), "_").concat(imageFile.name);
          _context19.next = 13;
          return regeneratorRuntime.awrap(uploadImageToFirebaseStorage(imageFile, imagePath));

        case 13:
          imageUrl = _context19.sent;
          // Actually uses Cloudinary
          newMember = {
            name: name,
            position: position,
            image: imageUrl
          };
          _context19.next = 17;
          return regeneratorRuntime.awrap(saveKCYMTeamMemberToFirebase(newMember));

        case 17:
          loadKCYMTeamMembers();
          clearKCYMTeamForm();
          showMessage('kcymTeamMessage', 'KCYM team member saved successfully!', 'success');
          _context19.next = 26;
          break;

        case 22:
          _context19.prev = 22;
          _context19.t0 = _context19["catch"](9);
          console.error('Error saving KCYM team member:', _context19.t0);
          showMessage('kcymTeamMessage', 'Error saving member. Please try again.', 'error');

        case 26:
        case "end":
          return _context19.stop();
      }
    }
  }, null, null, [[9, 22]]);
}

function loadKCYMTeamMembers() {
  var listContainer, kcymTeam;
  return regeneratorRuntime.async(function loadKCYMTeamMembers$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          listContainer = $('#kcymTeamList');
          listContainer.empty();
          _context20.prev = 2;
          _context20.next = 5;
          return regeneratorRuntime.awrap(getAllKCYMTeamMembersFromFirebase());

        case 5:
          kcymTeam = _context20.sent;

          if (!(kcymTeam.length === 0)) {
            _context20.next = 9;
            break;
          }

          listContainer.html('<p style="font-size: 1.4rem; color: #cccccc;">No KCYM team members yet. Add your first member above.</p>');
          return _context20.abrupt("return");

        case 9:
          kcymTeam.forEach(function (member) {
            var memberHtml = "\n                <div class=\"admin-item-card\">\n                    <div class=\"admin-item-info\" style=\"display: flex; align-items: center; gap: 2rem;\">\n                        ".concat(member.image ? "<img src=\"".concat(member.image, "\" alt=\"").concat(member.name, "\" style=\"width: 80px; height: 80px; border-radius: 50%; object-fit: cover;\">") : '<div style="width: 80px; height: 80px; border-radius: 50%; background-color: #444444;"></div>', "\n                        <div>\n                            <h3>").concat(member.name, "</h3>\n                            <p>").concat(member.position, "</p>\n                        </div>\n                    </div>\n                    <div class=\"admin-item-actions\">\n                        <button class=\"admin-btn admin-btn-secondary\" onclick=\"editKCYMTeamMember('").concat(member.id, "')\">Edit</button>\n                        <button class=\"admin-btn admin-btn-danger\" onclick=\"deleteKCYMTeamMember('").concat(member.id, "')\">Delete</button>\n                    </div>\n                </div>\n            ");
            listContainer.append(memberHtml);
          });
          _context20.next = 16;
          break;

        case 12:
          _context20.prev = 12;
          _context20.t0 = _context20["catch"](2);
          console.error('Error loading KCYM team members:', _context20.t0);
          listContainer.html('<p style="font-size: 1.4rem; color: #dd4043;">Error loading KCYM team. Please refresh the page.</p>');

        case 16:
        case "end":
          return _context20.stop();
      }
    }
  }, null, null, [[2, 12]]);
}

function editKCYMTeamMember(id) {
  var kcymTeam, member;
  return regeneratorRuntime.async(function editKCYMTeamMember$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          _context21.next = 3;
          return regeneratorRuntime.awrap(getAllKCYMTeamMembersFromFirebase());

        case 3:
          kcymTeam = _context21.sent;
          member = kcymTeam.find(function (m) {
            return m.id === id;
          });

          if (member) {
            $('#kcymMemberName').val(member.name);
            $('#kcymMemberPosition').val(member.position);

            if (member.image) {
              $('#kcymMemberImagePreview').html('<img src="' + member.image + '" alt="Preview">');
            }

            $('.admin-sidebar-item[data-section="service-teams"]').click();
            setTimeout(function () {
              $('.admin-subsection-tab[data-subsection="kcym-team"]').click();
            }, 100);
            $('#kcymTeamForm').data('editingId', id);
            $('#kcymTeamForm').data('existingImage', member.image);
          }

          _context21.next = 12;
          break;

        case 8:
          _context21.prev = 8;
          _context21.t0 = _context21["catch"](0);
          console.error('Error loading KCYM team member for editing:', _context21.t0);
          showMessage('kcymTeamMessage', 'Error loading member. Please try again.', 'error');

        case 12:
        case "end":
          return _context21.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

function updateKCYMTeamMember(id) {
  var name, position, imageFile, kcymTeam, member, updatedMember, imagePath;
  return regeneratorRuntime.async(function updateKCYMTeamMember$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          name = $('#kcymMemberName').val();
          position = $('#kcymMemberPosition').val();
          imageFile = $('#kcymMemberImage')[0].files[0];

          if (!(!name || !position)) {
            _context22.next = 6;
            break;
          }

          showMessage('kcymTeamMessage', 'Please fill in all fields', 'error');
          return _context22.abrupt("return");

        case 6:
          _context22.prev = 6;
          _context22.next = 9;
          return regeneratorRuntime.awrap(getAllKCYMTeamMembersFromFirebase());

        case 9:
          kcymTeam = _context22.sent;
          member = kcymTeam.find(function (m) {
            return m.id === id;
          });

          if (member) {
            _context22.next = 14;
            break;
          }

          showMessage('kcymTeamMessage', 'Member not found', 'error');
          return _context22.abrupt("return");

        case 14:
          updatedMember = {
            name: name,
            position: position,
            image: member.image // Keep existing image by default

          }; // Handle new image upload

          if (!imageFile) {
            _context22.next = 29;
            break;
          }

          if (!member.image) {
            _context22.next = 25;
            break;
          }

          _context22.prev = 17;
          _context22.next = 20;
          return regeneratorRuntime.awrap(deleteImageFromFirebaseStorage(member.image));

        case 20:
          _context22.next = 25;
          break;

        case 22:
          _context22.prev = 22;
          _context22.t0 = _context22["catch"](17);
          console.warn('Could not delete old image:', _context22.t0);

        case 25:
          // Upload new image to Cloudinary
          imagePath = "teams/kcym/".concat(Date.now(), "_").concat(imageFile.name);
          _context22.next = 28;
          return regeneratorRuntime.awrap(uploadImageToFirebaseStorage(imageFile, imagePath));

        case 28:
          updatedMember.image = _context22.sent;

        case 29:
          _context22.next = 31;
          return regeneratorRuntime.awrap(updateKCYMTeamMemberInFirebase(id, updatedMember));

        case 31:
          loadKCYMTeamMembers();
          clearKCYMTeamForm();
          showMessage('kcymTeamMessage', 'KCYM team member updated successfully!', 'success');
          _context22.next = 40;
          break;

        case 36:
          _context22.prev = 36;
          _context22.t1 = _context22["catch"](6);
          console.error('Error updating KCYM team member:', _context22.t1);
          showMessage('kcymTeamMessage', 'Error updating member. Please try again.', 'error');

        case 40:
        case "end":
          return _context22.stop();
      }
    }
  }, null, null, [[6, 36], [17, 22]]);
}

function deleteKCYMTeamMember(id) {
  var kcymTeam, member;
  return regeneratorRuntime.async(function deleteKCYMTeamMember$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          if (!confirm('Are you sure you want to delete this KCYM team member?')) {
            _context23.next = 25;
            break;
          }

          _context23.prev = 1;
          _context23.next = 4;
          return regeneratorRuntime.awrap(getAllKCYMTeamMembersFromFirebase());

        case 4:
          kcymTeam = _context23.sent;
          member = kcymTeam.find(function (m) {
            return m.id === id;
          });

          if (!(member && member.image)) {
            _context23.next = 15;
            break;
          }

          _context23.prev = 7;
          _context23.next = 10;
          return regeneratorRuntime.awrap(deleteImageFromFirebaseStorage(member.image));

        case 10:
          _context23.next = 15;
          break;

        case 12:
          _context23.prev = 12;
          _context23.t0 = _context23["catch"](7);
          console.warn('Could not delete image from Cloudinary:', _context23.t0);

        case 15:
          _context23.next = 17;
          return regeneratorRuntime.awrap(deleteKCYMTeamMemberFromFirebase(id));

        case 17:
          loadKCYMTeamMembers();
          showMessage('kcymTeamMessage', 'KCYM team member deleted successfully!', 'success');
          _context23.next = 25;
          break;

        case 21:
          _context23.prev = 21;
          _context23.t1 = _context23["catch"](1);
          console.error('Error deleting KCYM team member:', _context23.t1);
          showMessage('kcymTeamMessage', 'Error deleting member. Please try again.', 'error');

        case 25:
        case "end":
          return _context23.stop();
      }
    }
  }, null, null, [[1, 21], [7, 12]]);
}

function clearKCYMTeamForm() {
  $('#kcymTeamForm')[0].reset();
  $('#kcymMemberImagePreview').empty();
  $('#kcymTeamForm').removeData('editingId');
  $('#kcymTeamForm').removeData('existingImage');
} // Mathrusangam Team Functions


function saveMathrusangamTeamMember() {
  var name, position, imageFile, imagePath, imageUrl, newMember;
  return regeneratorRuntime.async(function saveMathrusangamTeamMember$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          name = $('#mathrusangamMemberName').val();
          position = $('#mathrusangamMemberPosition').val();
          imageFile = $('#mathrusangamMemberImage')[0].files[0];

          if (!(!name || !position)) {
            _context24.next = 6;
            break;
          }

          showMessage('mathrusangamTeamMessage', 'Please fill in all fields', 'error');
          return _context24.abrupt("return");

        case 6:
          if (imageFile) {
            _context24.next = 9;
            break;
          }

          showMessage('mathrusangamTeamMessage', 'Please upload a profile image', 'error');
          return _context24.abrupt("return");

        case 9:
          _context24.prev = 9;
          // Upload image to Cloudinary
          imagePath = "teams/mathrusangam/".concat(Date.now(), "_").concat(imageFile.name);
          _context24.next = 13;
          return regeneratorRuntime.awrap(uploadImageToFirebaseStorage(imageFile, imagePath));

        case 13:
          imageUrl = _context24.sent;
          // Actually uses Cloudinary
          newMember = {
            name: name,
            position: position,
            image: imageUrl
          };
          _context24.next = 17;
          return regeneratorRuntime.awrap(saveMathrusangamTeamMemberToFirebase(newMember));

        case 17:
          loadMathrusangamTeamMembers();
          clearMathrusangamTeamForm();
          showMessage('mathrusangamTeamMessage', 'Mathrusangam team member saved successfully!', 'success');
          _context24.next = 26;
          break;

        case 22:
          _context24.prev = 22;
          _context24.t0 = _context24["catch"](9);
          console.error('Error saving Mathrusangam team member:', _context24.t0);
          showMessage('mathrusangamTeamMessage', 'Error saving member. Please try again.', 'error');

        case 26:
        case "end":
          return _context24.stop();
      }
    }
  }, null, null, [[9, 22]]);
}

function loadMathrusangamTeamMembers() {
  var listContainer, mathrusangamTeam;
  return regeneratorRuntime.async(function loadMathrusangamTeamMembers$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          listContainer = $('#mathrusangamTeamList');
          listContainer.empty();
          _context25.prev = 2;
          _context25.next = 5;
          return regeneratorRuntime.awrap(getAllMathrusangamTeamMembersFromFirebase());

        case 5:
          mathrusangamTeam = _context25.sent;

          if (!(mathrusangamTeam.length === 0)) {
            _context25.next = 9;
            break;
          }

          listContainer.html('<p style="font-size: 1.4rem; color: #cccccc;">No Mathrusangam team members yet. Add your first member above.</p>');
          return _context25.abrupt("return");

        case 9:
          mathrusangamTeam.forEach(function (member) {
            var memberHtml = "\n                <div class=\"admin-item-card\">\n                    <div class=\"admin-item-info\" style=\"display: flex; align-items: center; gap: 2rem;\">\n                        ".concat(member.image ? "<img src=\"".concat(member.image, "\" alt=\"").concat(member.name, "\" style=\"width: 80px; height: 80px; border-radius: 50%; object-fit: cover;\">") : '<div style="width: 80px; height: 80px; border-radius: 50%; background-color: #444444;"></div>', "\n                        <div>\n                            <h3>").concat(member.name, "</h3>\n                            <p>").concat(member.position, "</p>\n                        </div>\n                    </div>\n                    <div class=\"admin-item-actions\">\n                        <button class=\"admin-btn admin-btn-secondary\" onclick=\"editMathrusangamTeamMember('").concat(member.id, "')\">Edit</button>\n                        <button class=\"admin-btn admin-btn-danger\" onclick=\"deleteMathrusangamTeamMember('").concat(member.id, "')\">Delete</button>\n                    </div>\n                </div>\n            ");
            listContainer.append(memberHtml);
          });
          _context25.next = 16;
          break;

        case 12:
          _context25.prev = 12;
          _context25.t0 = _context25["catch"](2);
          console.error('Error loading Mathrusangam team members:', _context25.t0);
          listContainer.html('<p style="font-size: 1.4rem; color: #dd4043;">Error loading Mathrusangam team. Please refresh the page.</p>');

        case 16:
        case "end":
          return _context25.stop();
      }
    }
  }, null, null, [[2, 12]]);
}

function editMathrusangamTeamMember(id) {
  var mathrusangamTeam, member;
  return regeneratorRuntime.async(function editMathrusangamTeamMember$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          _context26.prev = 0;
          _context26.next = 3;
          return regeneratorRuntime.awrap(getAllMathrusangamTeamMembersFromFirebase());

        case 3:
          mathrusangamTeam = _context26.sent;
          member = mathrusangamTeam.find(function (m) {
            return m.id === id;
          });

          if (member) {
            $('#mathrusangamMemberName').val(member.name);
            $('#mathrusangamMemberPosition').val(member.position);

            if (member.image) {
              $('#mathrusangamMemberImagePreview').html('<img src="' + member.image + '" alt="Preview">');
            }

            $('.admin-sidebar-item[data-section="service-teams"]').click();
            setTimeout(function () {
              $('.admin-subsection-tab[data-subsection="mathrusangam-team"]').click();
            }, 100);
            $('#mathrusangamTeamForm').data('editingId', id);
            $('#mathrusangamTeamForm').data('existingImage', member.image);
          }

          _context26.next = 12;
          break;

        case 8:
          _context26.prev = 8;
          _context26.t0 = _context26["catch"](0);
          console.error('Error loading Mathrusangam team member for editing:', _context26.t0);
          showMessage('mathrusangamTeamMessage', 'Error loading member. Please try again.', 'error');

        case 12:
        case "end":
          return _context26.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

function updateMathrusangamTeamMember(id) {
  var name, position, imageFile, mathrusangamTeam, member, updatedMember, imagePath;
  return regeneratorRuntime.async(function updateMathrusangamTeamMember$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          name = $('#mathrusangamMemberName').val();
          position = $('#mathrusangamMemberPosition').val();
          imageFile = $('#mathrusangamMemberImage')[0].files[0];

          if (!(!name || !position)) {
            _context27.next = 6;
            break;
          }

          showMessage('mathrusangamTeamMessage', 'Please fill in all fields', 'error');
          return _context27.abrupt("return");

        case 6:
          _context27.prev = 6;
          _context27.next = 9;
          return regeneratorRuntime.awrap(getAllMathrusangamTeamMembersFromFirebase());

        case 9:
          mathrusangamTeam = _context27.sent;
          member = mathrusangamTeam.find(function (m) {
            return m.id === id;
          });

          if (member) {
            _context27.next = 14;
            break;
          }

          showMessage('mathrusangamTeamMessage', 'Member not found', 'error');
          return _context27.abrupt("return");

        case 14:
          updatedMember = {
            name: name,
            position: position,
            image: member.image // Keep existing image by default

          }; // Handle new image upload

          if (!imageFile) {
            _context27.next = 29;
            break;
          }

          if (!member.image) {
            _context27.next = 25;
            break;
          }

          _context27.prev = 17;
          _context27.next = 20;
          return regeneratorRuntime.awrap(deleteImageFromFirebaseStorage(member.image));

        case 20:
          _context27.next = 25;
          break;

        case 22:
          _context27.prev = 22;
          _context27.t0 = _context27["catch"](17);
          console.warn('Could not delete old image:', _context27.t0);

        case 25:
          // Upload new image to Cloudinary
          imagePath = "teams/mathrusangam/".concat(Date.now(), "_").concat(imageFile.name);
          _context27.next = 28;
          return regeneratorRuntime.awrap(uploadImageToFirebaseStorage(imageFile, imagePath));

        case 28:
          updatedMember.image = _context27.sent;

        case 29:
          _context27.next = 31;
          return regeneratorRuntime.awrap(updateMathrusangamTeamMemberInFirebase(id, updatedMember));

        case 31:
          loadMathrusangamTeamMembers();
          clearMathrusangamTeamForm();
          showMessage('mathrusangamTeamMessage', 'Mathrusangam team member updated successfully!', 'success');
          _context27.next = 40;
          break;

        case 36:
          _context27.prev = 36;
          _context27.t1 = _context27["catch"](6);
          console.error('Error updating Mathrusangam team member:', _context27.t1);
          showMessage('mathrusangamTeamMessage', 'Error updating member. Please try again.', 'error');

        case 40:
        case "end":
          return _context27.stop();
      }
    }
  }, null, null, [[6, 36], [17, 22]]);
}

function deleteMathrusangamTeamMember(id) {
  var mathrusangamTeam, member;
  return regeneratorRuntime.async(function deleteMathrusangamTeamMember$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          if (!confirm('Are you sure you want to delete this Mathrusangam team member?')) {
            _context28.next = 25;
            break;
          }

          _context28.prev = 1;
          _context28.next = 4;
          return regeneratorRuntime.awrap(getAllMathrusangamTeamMembersFromFirebase());

        case 4:
          mathrusangamTeam = _context28.sent;
          member = mathrusangamTeam.find(function (m) {
            return m.id === id;
          });

          if (!(member && member.image)) {
            _context28.next = 15;
            break;
          }

          _context28.prev = 7;
          _context28.next = 10;
          return regeneratorRuntime.awrap(deleteImageFromFirebaseStorage(member.image));

        case 10:
          _context28.next = 15;
          break;

        case 12:
          _context28.prev = 12;
          _context28.t0 = _context28["catch"](7);
          console.warn('Could not delete image from Cloudinary:', _context28.t0);

        case 15:
          _context28.next = 17;
          return regeneratorRuntime.awrap(deleteMathrusangamTeamMemberFromFirebase(id));

        case 17:
          loadMathrusangamTeamMembers();
          showMessage('mathrusangamTeamMessage', 'Mathrusangam team member deleted successfully!', 'success');
          _context28.next = 25;
          break;

        case 21:
          _context28.prev = 21;
          _context28.t1 = _context28["catch"](1);
          console.error('Error deleting Mathrusangam team member:', _context28.t1);
          showMessage('mathrusangamTeamMessage', 'Error deleting member. Please try again.', 'error');

        case 25:
        case "end":
          return _context28.stop();
      }
    }
  }, null, null, [[1, 21], [7, 12]]);
}

function clearMathrusangamTeamForm() {
  $('#mathrusangamTeamForm')[0].reset();
  $('#mathrusangamMemberImagePreview').empty();
  $('#mathrusangamTeamForm').removeData('editingId');
  $('#mathrusangamTeamForm').removeData('existingImage');
} // Choir Team Functions


function saveChoirTeamMember() {
  var name, position, imageFile, imagePath, imageUrl, newMember;
  return regeneratorRuntime.async(function saveChoirTeamMember$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          name = $('#choirMemberName').val();
          position = $('#choirMemberPosition').val();
          imageFile = $('#choirMemberImage')[0].files[0];

          if (!(!name || !position)) {
            _context29.next = 6;
            break;
          }

          showMessage('choirTeamMessage', 'Please fill in all fields', 'error');
          return _context29.abrupt("return");

        case 6:
          if (imageFile) {
            _context29.next = 9;
            break;
          }

          showMessage('choirTeamMessage', 'Please upload a profile image', 'error');
          return _context29.abrupt("return");

        case 9:
          _context29.prev = 9;
          // Upload image to Cloudinary
          imagePath = "teams/choir/".concat(Date.now(), "_").concat(imageFile.name);
          _context29.next = 13;
          return regeneratorRuntime.awrap(uploadImageToFirebaseStorage(imageFile, imagePath));

        case 13:
          imageUrl = _context29.sent;
          // Actually uses Cloudinary
          newMember = {
            name: name,
            position: position,
            image: imageUrl
          };
          _context29.next = 17;
          return regeneratorRuntime.awrap(saveChoirTeamMemberToFirebase(newMember));

        case 17:
          loadChoirTeamMembers();
          clearChoirTeamForm();
          showMessage('choirTeamMessage', 'Choir team member saved successfully!', 'success');
          _context29.next = 26;
          break;

        case 22:
          _context29.prev = 22;
          _context29.t0 = _context29["catch"](9);
          console.error('Error saving Choir team member:', _context29.t0);
          showMessage('choirTeamMessage', 'Error saving member. Please try again.', 'error');

        case 26:
        case "end":
          return _context29.stop();
      }
    }
  }, null, null, [[9, 22]]);
}

function loadChoirTeamMembers() {
  var listContainer, choirTeam;
  return regeneratorRuntime.async(function loadChoirTeamMembers$(_context30) {
    while (1) {
      switch (_context30.prev = _context30.next) {
        case 0:
          listContainer = $('#choirTeamList');
          listContainer.empty();
          _context30.prev = 2;
          _context30.next = 5;
          return regeneratorRuntime.awrap(getAllChoirTeamMembersFromFirebase());

        case 5:
          choirTeam = _context30.sent;

          if (!(choirTeam.length === 0)) {
            _context30.next = 9;
            break;
          }

          listContainer.html('<p style="font-size: 1.4rem; color: #cccccc;">No choir team members yet. Add your first member above.</p>');
          return _context30.abrupt("return");

        case 9:
          choirTeam.forEach(function (member) {
            var memberHtml = "\n                <div class=\"admin-item-card\">\n                    <div class=\"admin-item-info\" style=\"display: flex; align-items: center; gap: 2rem;\">\n                        ".concat(member.image ? "<img src=\"".concat(member.image, "\" alt=\"").concat(member.name, "\" style=\"width: 100px; height: 100px; border-radius: 50%; object-fit: cover;\">") : '<div style="width: 100px; height: 100px; border-radius: 50%; background-color: #444444;"></div>', "\n                        <div style=\"flex: 1;\">\n                            <h3>").concat(member.name, "</h3>\n                            <p>").concat(member.position, "</p>\n                        </div>\n                    </div>\n                    <div class=\"admin-item-actions\">\n                        <button class=\"admin-btn admin-btn-secondary\" onclick=\"editChoirTeamMember('").concat(member.id, "')\">Edit</button>\n                        <button class=\"admin-btn admin-btn-danger\" onclick=\"deleteChoirTeamMember('").concat(member.id, "')\">Delete</button>\n                    </div>\n                </div>\n            ");
            listContainer.append(memberHtml);
          });
          _context30.next = 16;
          break;

        case 12:
          _context30.prev = 12;
          _context30.t0 = _context30["catch"](2);
          console.error('Error loading Choir team members:', _context30.t0);
          listContainer.html('<p style="font-size: 1.4rem; color: #dd4043;">Error loading Choir team. Please refresh the page.</p>');

        case 16:
        case "end":
          return _context30.stop();
      }
    }
  }, null, null, [[2, 12]]);
}

function editChoirTeamMember(id) {
  var choirTeam, member;
  return regeneratorRuntime.async(function editChoirTeamMember$(_context31) {
    while (1) {
      switch (_context31.prev = _context31.next) {
        case 0:
          _context31.prev = 0;
          _context31.next = 3;
          return regeneratorRuntime.awrap(getAllChoirTeamMembersFromFirebase());

        case 3:
          choirTeam = _context31.sent;
          member = choirTeam.find(function (m) {
            return m.id === id;
          });

          if (member) {
            $('#choirMemberName').val(member.name);
            $('#choirMemberPosition').val(member.position);

            if (member.image) {
              $('#choirMemberImagePreview').html('<img src="' + member.image + '" alt="Preview">');
            } // Switch to choir team section


            $('.admin-sidebar-item[data-section="service-teams"]').click();
            setTimeout(function () {
              $('.admin-subsection-tab[data-subsection="choir-team"]').click();
            }, 100); // Store editing ID

            $('#choirTeamForm').data('editingId', id);
            $('#choirTeamForm').data('existingImage', member.image);
          }

          _context31.next = 12;
          break;

        case 8:
          _context31.prev = 8;
          _context31.t0 = _context31["catch"](0);
          console.error('Error loading Choir team member for editing:', _context31.t0);
          showMessage('choirTeamMessage', 'Error loading member. Please try again.', 'error');

        case 12:
        case "end":
          return _context31.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

function updateChoirTeamMember(id) {
  var name, position, imageFile, choirTeam, member, updatedMember, imagePath;
  return regeneratorRuntime.async(function updateChoirTeamMember$(_context32) {
    while (1) {
      switch (_context32.prev = _context32.next) {
        case 0:
          name = $('#choirMemberName').val();
          position = $('#choirMemberPosition').val();
          imageFile = $('#choirMemberImage')[0].files[0];

          if (!(!name || !position)) {
            _context32.next = 6;
            break;
          }

          showMessage('choirTeamMessage', 'Please fill in all fields', 'error');
          return _context32.abrupt("return");

        case 6:
          _context32.prev = 6;
          _context32.next = 9;
          return regeneratorRuntime.awrap(getAllChoirTeamMembersFromFirebase());

        case 9:
          choirTeam = _context32.sent;
          member = choirTeam.find(function (m) {
            return m.id === id;
          });

          if (member) {
            _context32.next = 14;
            break;
          }

          showMessage('choirTeamMessage', 'Member not found', 'error');
          return _context32.abrupt("return");

        case 14:
          updatedMember = {
            name: name,
            position: position,
            image: member.image // Keep existing image by default

          }; // Handle new image upload

          if (!imageFile) {
            _context32.next = 29;
            break;
          }

          if (!member.image) {
            _context32.next = 25;
            break;
          }

          _context32.prev = 17;
          _context32.next = 20;
          return regeneratorRuntime.awrap(deleteImageFromFirebaseStorage(member.image));

        case 20:
          _context32.next = 25;
          break;

        case 22:
          _context32.prev = 22;
          _context32.t0 = _context32["catch"](17);
          console.warn('Could not delete old image:', _context32.t0);

        case 25:
          // Upload new image to Cloudinary
          imagePath = "teams/choir/".concat(Date.now(), "_").concat(imageFile.name);
          _context32.next = 28;
          return regeneratorRuntime.awrap(uploadImageToFirebaseStorage(imageFile, imagePath));

        case 28:
          updatedMember.image = _context32.sent;

        case 29:
          _context32.next = 31;
          return regeneratorRuntime.awrap(updateChoirTeamMemberInFirebase(id, updatedMember));

        case 31:
          loadChoirTeamMembers();
          clearChoirTeamForm();
          showMessage('choirTeamMessage', 'Choir team member updated successfully!', 'success');
          _context32.next = 40;
          break;

        case 36:
          _context32.prev = 36;
          _context32.t1 = _context32["catch"](6);
          console.error('Error updating Choir team member:', _context32.t1);
          showMessage('choirTeamMessage', 'Error updating member. Please try again.', 'error');

        case 40:
        case "end":
          return _context32.stop();
      }
    }
  }, null, null, [[6, 36], [17, 22]]);
}

function deleteChoirTeamMember(id) {
  var choirTeam, member;
  return regeneratorRuntime.async(function deleteChoirTeamMember$(_context33) {
    while (1) {
      switch (_context33.prev = _context33.next) {
        case 0:
          if (!confirm('Are you sure you want to delete this choir team member?')) {
            _context33.next = 25;
            break;
          }

          _context33.prev = 1;
          _context33.next = 4;
          return regeneratorRuntime.awrap(getAllChoirTeamMembersFromFirebase());

        case 4:
          choirTeam = _context33.sent;
          member = choirTeam.find(function (m) {
            return m.id === id;
          });

          if (!(member && member.image)) {
            _context33.next = 15;
            break;
          }

          _context33.prev = 7;
          _context33.next = 10;
          return regeneratorRuntime.awrap(deleteImageFromFirebaseStorage(member.image));

        case 10:
          _context33.next = 15;
          break;

        case 12:
          _context33.prev = 12;
          _context33.t0 = _context33["catch"](7);
          console.warn('Could not delete image from Cloudinary:', _context33.t0);

        case 15:
          _context33.next = 17;
          return regeneratorRuntime.awrap(deleteChoirTeamMemberFromFirebase(id));

        case 17:
          loadChoirTeamMembers();
          showMessage('choirTeamMessage', 'Choir team member deleted successfully!', 'success');
          _context33.next = 25;
          break;

        case 21:
          _context33.prev = 21;
          _context33.t1 = _context33["catch"](1);
          console.error('Error deleting Choir team member:', _context33.t1);
          showMessage('choirTeamMessage', 'Error deleting member. Please try again.', 'error');

        case 25:
        case "end":
          return _context33.stop();
      }
    }
  }, null, null, [[1, 21], [7, 12]]);
}

function clearChoirTeamForm() {
  $('#choirMemberName').val('');
  $('#choirMemberPosition').val('');
  $('#choirMemberImage').val('');
  $('#choirMemberImagePreview').empty();
  $('#choirTeamForm').removeData('editingId');
  $('#choirTeamForm').removeData('existingImage');
} // Preview Multiple Images


function previewMultipleImages(files, previewId) {
  var preview = $('#' + previewId);
  preview.empty();

  if (files && files.length > 0) {
    Array.from(files).forEach(function (file) {
      var reader = new FileReader();

      reader.onload = function (e) {
        preview.append('<img src="' + e.target.result + '" alt="Preview" style="max-width: 150px; max-height: 150px; border-radius: 4px; margin: 0.5rem;">');
      };

      reader.readAsDataURL(file);
    });
  }
} // Save Event


function saveEvent() {
  var name, date, description, photoFiles, videosText, newEvent, videoUrls, photoPromises;
  return regeneratorRuntime.async(function saveEvent$(_context34) {
    while (1) {
      switch (_context34.prev = _context34.next) {
        case 0:
          name = $('#eventName').val();
          date = $('#eventDate').val();
          description = $('#eventDescription').val();
          photoFiles = $('#eventPhotos')[0].files;
          videosText = $('#eventVideos').val();

          if (!(!name || !date || !description)) {
            _context34.next = 8;
            break;
          }

          showMessage('eventsMessage', 'Please fill in all required fields', 'error');
          return _context34.abrupt("return");

        case 8:
          newEvent = {
            name: name,
            date: date,
            description: description,
            photos: [],
            videos: []
          }; // Process videos

          if (videosText) {
            videoUrls = videosText.split('\n').filter(function (url) {
              return url.trim().length > 0;
            });
            newEvent.videos = videoUrls;
          }

          _context34.prev = 10;

          if (!(photoFiles && photoFiles.length > 0)) {
            _context34.next = 16;
            break;
          }

          photoPromises = Array.from(photoFiles).map(function (file) {
            var imagePath = "events/".concat(Date.now(), "_").concat(file.name);
            return uploadImageToFirebaseStorage(file, imagePath); // Actually uses Cloudinary
          });
          _context34.next = 15;
          return regeneratorRuntime.awrap(Promise.all(photoPromises));

        case 15:
          newEvent.photos = _context34.sent;

        case 16:
          _context34.next = 18;
          return regeneratorRuntime.awrap(saveEventToFirebase(newEvent));

        case 18:
          loadEvents();
          clearEventsForm();
          showMessage('eventsMessage', 'Event saved successfully!', 'success');
          _context34.next = 27;
          break;

        case 23:
          _context34.prev = 23;
          _context34.t0 = _context34["catch"](10);
          console.error('Error saving event:', _context34.t0);
          showMessage('eventsMessage', 'Error saving event. Please try again.', 'error');

        case 27:
        case "end":
          return _context34.stop();
      }
    }
  }, null, null, [[10, 23]]);
} // Load Events


function loadEvents() {
  var listContainer, events;
  return regeneratorRuntime.async(function loadEvents$(_context35) {
    while (1) {
      switch (_context35.prev = _context35.next) {
        case 0:
          listContainer = $('#eventsList');
          listContainer.empty();
          _context35.prev = 2;
          _context35.next = 5;
          return regeneratorRuntime.awrap(getAllEventsFromFirebase());

        case 5:
          events = _context35.sent;

          if (!(events.length === 0)) {
            _context35.next = 9;
            break;
          }

          listContainer.html('<p style="font-size: 1.4rem; color: #cccccc;">No events yet. Create your first event above.</p>');
          return _context35.abrupt("return");

        case 9:
          events.forEach(function (event) {
            var eventDate = new Date(event.date);
            var formattedDate = eventDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            var mainImage = event.photos && event.photos.length > 0 ? event.photos[0] : '';
            var eventHtml = "\n                <div class=\"admin-item-card\">\n                    <div class=\"admin-item-info\" style=\"display: flex; align-items: center; gap: 2rem;\">\n                        ".concat(mainImage ? "<img src=\"".concat(mainImage, "\" alt=\"").concat(event.name, "\" style=\"width: 120px; height: 120px; object-fit: cover; border-radius: 4px;\">") : '<div style="width: 120px; height: 120px; background-color: #444444; border-radius: 4px;"></div>', "\n                        <div style=\"flex: 1;\">\n                            <h3>").concat(event.name, "</h3>\n                            <p>").concat(formattedDate, "</p>\n                            <p style=\"font-size: 1.2rem; color: #aaaaaa; margin-top: 0.5rem;\">").concat(event.description.substring(0, 100)).concat(event.description.length > 100 ? '...' : '', "</p>\n                            <p style=\"font-size: 1.2rem; color: #aaaaaa; margin-top: 0.5rem;\">\n                                ").concat(event.photos ? event.photos.length : 0, " Photo").concat(event.photos && event.photos.length !== 1 ? 's' : '', " | \n                                ").concat(event.videos ? event.videos.length : 0, " Video").concat(event.videos && event.videos.length !== 1 ? 's' : '', "\n                            </p>\n                        </div>\n                    </div>\n                    <div class=\"admin-item-actions\">\n                        <button class=\"admin-btn admin-btn-secondary\" onclick=\"editEvent('").concat(event.id, "')\">Edit</button>\n                        <button class=\"admin-btn admin-btn-danger\" onclick=\"deleteEvent('").concat(event.id, "')\">Delete</button>\n                    </div>\n                </div>\n            ");
            listContainer.append(eventHtml);
          });
          _context35.next = 16;
          break;

        case 12:
          _context35.prev = 12;
          _context35.t0 = _context35["catch"](2);
          console.error('Error loading events:', _context35.t0);
          listContainer.html('<p style="font-size: 1.4rem; color: #dd4043;">Error loading events. Please refresh the page.</p>');

        case 16:
        case "end":
          return _context35.stop();
      }
    }
  }, null, null, [[2, 12]]);
} // Edit Event


function editEvent(id) {
  var events, event, photosPreview;
  return regeneratorRuntime.async(function editEvent$(_context36) {
    while (1) {
      switch (_context36.prev = _context36.next) {
        case 0:
          _context36.prev = 0;
          _context36.next = 3;
          return regeneratorRuntime.awrap(getAllEventsFromFirebase());

        case 3:
          events = _context36.sent;
          event = events.find(function (e) {
            return e.id === id;
          });

          if (event) {
            $('#eventName').val(event.name);
            $('#eventDate').val(event.date);
            $('#eventDescription').val(event.description); // Display existing photos

            photosPreview = $('#eventPhotosPreview');
            photosPreview.empty();

            if (event.photos && event.photos.length > 0) {
              event.photos.forEach(function (photo) {
                photosPreview.append('<img src="' + photo + '" alt="Preview" style="max-width: 150px; max-height: 150px; border-radius: 4px; margin: 0.5rem;">');
              });
            } // Display existing videos


            if (event.videos && event.videos.length > 0) {
              $('#eventVideos').val(event.videos.join('\n'));
            } // Switch to events section


            $('.admin-sidebar-item[data-section="events"]').click(); // Store editing ID

            $('#eventsForm').data('editingId', id);
            $('#eventsForm').data('existingPhotos', event.photos || []);
          }

          _context36.next = 12;
          break;

        case 8:
          _context36.prev = 8;
          _context36.t0 = _context36["catch"](0);
          console.error('Error loading event for editing:', _context36.t0);
          showMessage('eventsMessage', 'Error loading event. Please try again.', 'error');

        case 12:
        case "end":
          return _context36.stop();
      }
    }
  }, null, null, [[0, 8]]);
} // Update Event


function updateEvent(id) {
  var name, date, description, photoFiles, videosText, events, event, updatedEvent, videoUrls, existingPhotos, newPhotoPromises, newPhotos;
  return regeneratorRuntime.async(function updateEvent$(_context37) {
    while (1) {
      switch (_context37.prev = _context37.next) {
        case 0:
          name = $('#eventName').val();
          date = $('#eventDate').val();
          description = $('#eventDescription').val();
          photoFiles = $('#eventPhotos')[0].files;
          videosText = $('#eventVideos').val();

          if (!(!name || !date || !description)) {
            _context37.next = 8;
            break;
          }

          showMessage('eventsMessage', 'Please fill in all required fields', 'error');
          return _context37.abrupt("return");

        case 8:
          _context37.prev = 8;
          _context37.next = 11;
          return regeneratorRuntime.awrap(getAllEventsFromFirebase());

        case 11:
          events = _context37.sent;
          event = events.find(function (e) {
            return e.id === id;
          });

          if (event) {
            _context37.next = 16;
            break;
          }

          showMessage('eventsMessage', 'Event not found', 'error');
          return _context37.abrupt("return");

        case 16:
          updatedEvent = {
            name: name,
            date: date,
            description: description,
            photos: event.photos || [],
            // Keep existing photos by default
            videos: []
          }; // Process videos

          if (videosText) {
            videoUrls = videosText.split('\n').filter(function (url) {
              return url.trim().length > 0;
            });
            updatedEvent.videos = videoUrls;
          } // Process photos - upload new ones and merge with existing


          if (!(photoFiles && photoFiles.length > 0)) {
            _context37.next = 25;
            break;
          }

          existingPhotos = $('#eventsForm').data('existingPhotos') || [];
          newPhotoPromises = Array.from(photoFiles).map(function (file) {
            var imagePath = "events/".concat(Date.now(), "_").concat(file.name);
            return uploadImageToFirebaseStorage(file, imagePath);
          });
          _context37.next = 23;
          return regeneratorRuntime.awrap(Promise.all(newPhotoPromises));

        case 23:
          newPhotos = _context37.sent;
          updatedEvent.photos = existingPhotos.concat(newPhotos);

        case 25:
          _context37.next = 27;
          return regeneratorRuntime.awrap(updateEventInFirebase(id, updatedEvent));

        case 27:
          loadEvents();
          clearEventsForm();
          showMessage('eventsMessage', 'Event updated successfully!', 'success');
          _context37.next = 36;
          break;

        case 32:
          _context37.prev = 32;
          _context37.t0 = _context37["catch"](8);
          console.error('Error updating event:', _context37.t0);
          showMessage('eventsMessage', 'Error updating event. Please try again.', 'error');

        case 36:
        case "end":
          return _context37.stop();
      }
    }
  }, null, null, [[8, 32]]);
} // Delete Event


function deleteEvent(id) {
  var events, event, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, photoUrl;

  return regeneratorRuntime.async(function deleteEvent$(_context38) {
    while (1) {
      switch (_context38.prev = _context38.next) {
        case 0:
          if (!confirm('Are you sure you want to delete this event?')) {
            _context38.next = 49;
            break;
          }

          _context38.prev = 1;
          _context38.next = 4;
          return regeneratorRuntime.awrap(getAllEventsFromFirebase());

        case 4:
          events = _context38.sent;
          event = events.find(function (e) {
            return e.id === id;
          });

          if (!(event && event.photos && event.photos.length > 0)) {
            _context38.next = 39;
            break;
          }

          // Delete all photos from storage
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context38.prev = 10;
          _iterator = event.photos[Symbol.iterator]();

        case 12:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context38.next = 25;
            break;
          }

          photoUrl = _step.value;
          _context38.prev = 14;
          _context38.next = 17;
          return regeneratorRuntime.awrap(deleteImageFromFirebaseStorage(photoUrl));

        case 17:
          _context38.next = 22;
          break;

        case 19:
          _context38.prev = 19;
          _context38.t0 = _context38["catch"](14);
          console.warn('Could not delete photo from storage:', _context38.t0);

        case 22:
          _iteratorNormalCompletion = true;
          _context38.next = 12;
          break;

        case 25:
          _context38.next = 31;
          break;

        case 27:
          _context38.prev = 27;
          _context38.t1 = _context38["catch"](10);
          _didIteratorError = true;
          _iteratorError = _context38.t1;

        case 31:
          _context38.prev = 31;
          _context38.prev = 32;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 34:
          _context38.prev = 34;

          if (!_didIteratorError) {
            _context38.next = 37;
            break;
          }

          throw _iteratorError;

        case 37:
          return _context38.finish(34);

        case 38:
          return _context38.finish(31);

        case 39:
          _context38.next = 41;
          return regeneratorRuntime.awrap(deleteEventFromFirebase(id));

        case 41:
          loadEvents();
          showMessage('eventsMessage', 'Event deleted successfully!', 'success');
          _context38.next = 49;
          break;

        case 45:
          _context38.prev = 45;
          _context38.t2 = _context38["catch"](1);
          console.error('Error deleting event:', _context38.t2);
          showMessage('eventsMessage', 'Error deleting event. Please try again.', 'error');

        case 49:
        case "end":
          return _context38.stop();
      }
    }
  }, null, null, [[1, 45], [10, 27, 31, 39], [14, 19], [32,, 34, 38]]);
} // Clear Events Form


function clearEventsForm() {
  $('#eventsForm')[0].reset();
  $('#eventPhotosPreview').empty();
  $('#eventsForm').removeData('editingId');
  $('#eventsForm').removeData('existingPhotos');
} // Update Events Page


function updateEventsPage() {
  localStorage.setItem('eventsPageUpdated', Date.now().toString());
} // Father Profile Functions


function saveFatherProfile() {
  var name, imageFile, fatherProfile, imagePath, existing;
  return regeneratorRuntime.async(function saveFatherProfile$(_context39) {
    while (1) {
      switch (_context39.prev = _context39.next) {
        case 0:
          name = $('#fatherName').val();
          imageFile = $('#fatherImage')[0].files[0];

          if (name) {
            _context39.next = 5;
            break;
          }

          showMessage('fatherProfileMessage', 'Please enter the Father\'s name', 'error');
          return _context39.abrupt("return");

        case 5:
          _context39.prev = 5;
          fatherProfile = {
            name: name,
            image: null
          };

          if (!imageFile) {
            _context39.next = 14;
            break;
          }

          // Upload image to Cloudinary
          imagePath = "father/".concat(Date.now(), "_").concat(imageFile.name);
          _context39.next = 11;
          return regeneratorRuntime.awrap(uploadImageToFirebaseStorage(imageFile, imagePath));

        case 11:
          fatherProfile.image = _context39.sent;
          _context39.next = 23;
          break;

        case 14:
          _context39.next = 16;
          return regeneratorRuntime.awrap(getFatherProfileFromFirebase());

        case 16:
          existing = _context39.sent;

          if (!(existing && existing.image)) {
            _context39.next = 21;
            break;
          }

          fatherProfile.image = existing.image;
          _context39.next = 23;
          break;

        case 21:
          showMessage('fatherProfileMessage', 'Please upload an image', 'error');
          return _context39.abrupt("return");

        case 23:
          _context39.next = 25;
          return regeneratorRuntime.awrap(saveFatherProfileToFirebase(fatherProfile));

        case 25:
          loadFatherProfile();
          clearFatherProfileForm();
          showMessage('fatherProfileMessage', 'Father profile saved successfully!', 'success');
          _context39.next = 34;
          break;

        case 30:
          _context39.prev = 30;
          _context39.t0 = _context39["catch"](5);
          console.error('Error saving father profile:', _context39.t0);
          showMessage('fatherProfileMessage', 'Error saving profile. Please try again.', 'error');

        case 34:
        case "end":
          return _context39.stop();
      }
    }
  }, null, null, [[5, 30]]);
}

function loadFatherProfile() {
  var displayContainer, actionsContainer, fatherProfile, displayHtml, actionsHtml;
  return regeneratorRuntime.async(function loadFatherProfile$(_context40) {
    while (1) {
      switch (_context40.prev = _context40.next) {
        case 0:
          displayContainer = $('#fatherProfileDisplay');
          actionsContainer = $('#fatherProfileActions');
          _context40.prev = 2;
          _context40.next = 5;
          return regeneratorRuntime.awrap(getFatherProfileFromFirebase());

        case 5:
          fatherProfile = _context40.sent;

          if (!(!fatherProfile || !fatherProfile.name && !fatherProfile.image)) {
            _context40.next = 10;
            break;
          }

          displayContainer.html('<p style="font-size: 1.4rem; color: #cccccc; text-align: center; padding: 2rem;">No Father profile set yet. Add the Father\'s information above.</p>');
          actionsContainer.empty();
          return _context40.abrupt("return");

        case 10:
          displayHtml = "\n            <div style=\"display: flex; align-items: center; gap: 3rem; flex-wrap: wrap;\">\n                ".concat(fatherProfile.image ? "\n                <div>\n                    <img src=\"".concat(fatherProfile.image, "\" alt=\"").concat(fatherProfile.name || 'Father', "\" style=\"width: 200px; height: 200px; border-radius: 50%; object-fit: cover; border: 4px solid #ffffff;\">\n                </div>\n                ") : '<div style="width: 200px; height: 200px; border-radius: 50%; background-color: #444444; border: 4px solid #ffffff;"></div>', "\n                <div style=\"flex: 1;\">\n                    <h3 style=\"font-family: 'Montserrat', sans-serif; font-size: 2.4rem; font-weight: 700; color: #ffffff; margin-bottom: 1rem;\">\n                        ").concat(fatherProfile.name || 'Not Set', "\n                    </h3>\n                    <p style=\"font-size: 1.6rem; color: #cccccc;\">Father</p>\n                </div>\n            </div>\n        ");
          displayContainer.html(displayHtml); // Add Edit and Delete buttons

          actionsHtml = "\n            <div style=\"display: flex; gap: 1rem; justify-content: center;\">\n                <button class=\"admin-btn admin-btn-secondary\" onclick=\"editFatherProfile()\">Edit</button>\n                <button class=\"admin-btn admin-btn-danger\" onclick=\"deleteFatherProfile()\">Delete</button>\n            </div>\n        ";
          actionsContainer.html(actionsHtml); // Load into form if exists

          if (fatherProfile.name) {
            $('#fatherName').val(fatherProfile.name);
          }

          if (fatherProfile.image) {
            $('#fatherImagePreview').html('<img src="' + fatherProfile.image + '" alt="Preview">');
          }

          _context40.next = 23;
          break;

        case 18:
          _context40.prev = 18;
          _context40.t0 = _context40["catch"](2);
          console.error('Error loading father profile:', _context40.t0);
          displayContainer.html('<p style="font-size: 1.4rem; color: #dd4043; text-align: center; padding: 2rem;">Error loading Father profile. Please refresh the page.</p>');
          actionsContainer.empty();

        case 23:
        case "end":
          return _context40.stop();
      }
    }
  }, null, null, [[2, 18]]);
}

function editFatherProfile() {
  var fatherProfile;
  return regeneratorRuntime.async(function editFatherProfile$(_context41) {
    while (1) {
      switch (_context41.prev = _context41.next) {
        case 0:
          _context41.prev = 0;
          _context41.next = 3;
          return regeneratorRuntime.awrap(getFatherProfileFromFirebase());

        case 3:
          fatherProfile = _context41.sent;

          if (fatherProfile) {
            if (fatherProfile.name) {
              $('#fatherName').val(fatherProfile.name);
            }

            if (fatherProfile.image) {
              $('#fatherImagePreview').html('<img src="' + fatherProfile.image + '" alt="Preview">');
            }
          } // Scroll to form


          $('html, body').animate({
            scrollTop: $('#fatherProfileForm').offset().top - 100
          }, 500);
          _context41.next = 12;
          break;

        case 8:
          _context41.prev = 8;
          _context41.t0 = _context41["catch"](0);
          console.error('Error loading father profile for editing:', _context41.t0);
          showMessage('fatherProfileMessage', 'Error loading profile. Please try again.', 'error');

        case 12:
        case "end":
          return _context41.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

function deleteFatherProfile() {
  var fatherProfile;
  return regeneratorRuntime.async(function deleteFatherProfile$(_context42) {
    while (1) {
      switch (_context42.prev = _context42.next) {
        case 0:
          if (!confirm('Are you sure you want to delete the Father profile? This will remove it from the About page.')) {
            _context42.next = 25;
            break;
          }

          _context42.prev = 1;
          _context42.next = 4;
          return regeneratorRuntime.awrap(getFatherProfileFromFirebase());

        case 4:
          fatherProfile = _context42.sent;

          if (!(fatherProfile && fatherProfile.image)) {
            _context42.next = 14;
            break;
          }

          _context42.prev = 6;
          _context42.next = 9;
          return regeneratorRuntime.awrap(deleteImageFromFirebaseStorage(fatherProfile.image));

        case 9:
          _context42.next = 14;
          break;

        case 11:
          _context42.prev = 11;
          _context42.t0 = _context42["catch"](6);
          console.warn('Could not delete image from Cloudinary:', _context42.t0);

        case 14:
          _context42.next = 16;
          return regeneratorRuntime.awrap(deleteFatherProfileFromFirebase());

        case 16:
          loadFatherProfile();
          clearFatherProfileForm();
          showMessage('fatherProfileMessage', 'Father profile deleted successfully!', 'success');
          _context42.next = 25;
          break;

        case 21:
          _context42.prev = 21;
          _context42.t1 = _context42["catch"](1);
          console.error('Error deleting father profile:', _context42.t1);
          showMessage('fatherProfileMessage', 'Error deleting profile. Please try again.', 'error');

        case 25:
        case "end":
          return _context42.stop();
      }
    }
  }, null, null, [[1, 21], [6, 11]]);
}

function clearFatherProfileForm() {
  // Don't clear the form completely, just reset file input
  $('#fatherImage').val(''); // Note: Name and image preview will be loaded from Firebase when loadFatherProfile() is called
} // Church Images Functions


function saveChurchImage() {
  var title, imageFile, imagePath, imageUrl, newImage;
  return regeneratorRuntime.async(function saveChurchImage$(_context43) {
    while (1) {
      switch (_context43.prev = _context43.next) {
        case 0:
          title = $('#imageTitle').val();
          imageFile = $('#churchImage')[0].files[0];

          if (imageFile) {
            _context43.next = 5;
            break;
          }

          showMessage('churchImagesMessage', 'Please select an image to upload', 'error');
          return _context43.abrupt("return");

        case 5:
          _context43.prev = 5;
          // Upload image to Cloudinary
          imagePath = "church/".concat(Date.now(), "_").concat(imageFile.name);
          _context43.next = 9;
          return regeneratorRuntime.awrap(uploadImageToFirebaseStorage(imageFile, imagePath));

        case 9:
          imageUrl = _context43.sent;
          // Actually uses Cloudinary
          newImage = {
            url: imageUrl,
            title: title || '',
            date: new Date().toISOString()
          };
          _context43.next = 13;
          return regeneratorRuntime.awrap(saveChurchImageToFirebase(newImage));

        case 13:
          loadChurchImages();
          clearChurchImageForm();
          showMessage('churchImagesMessage', 'Image uploaded successfully!', 'success');
          _context43.next = 22;
          break;

        case 18:
          _context43.prev = 18;
          _context43.t0 = _context43["catch"](5);
          console.error('Error saving church image:', _context43.t0);
          showMessage('churchImagesMessage', 'Error uploading image. Please try again.', 'error');

        case 22:
        case "end":
          return _context43.stop();
      }
    }
  }, null, null, [[5, 18]]);
}

function loadChurchImages() {
  var listContainer, churchImages;
  return regeneratorRuntime.async(function loadChurchImages$(_context44) {
    while (1) {
      switch (_context44.prev = _context44.next) {
        case 0:
          listContainer = $('#churchImagesList');
          listContainer.empty();
          _context44.prev = 2;
          _context44.next = 5;
          return regeneratorRuntime.awrap(getAllChurchImagesFromFirebase());

        case 5:
          churchImages = _context44.sent;

          if (!(churchImages.length === 0)) {
            _context44.next = 9;
            break;
          }

          listContainer.html('<p style="font-size: 1.4rem; color: #cccccc;">No images uploaded yet. Upload your first image above.</p>');
          return _context44.abrupt("return");

        case 9:
          churchImages.forEach(function (imageData) {
            var uploadDate = imageData.createdAt ? new Date(imageData.createdAt.toDate ? imageData.createdAt.toDate() : imageData.createdAt) : new Date(imageData.date || Date.now());
            var imageHtml = "\n                <div class=\"admin-item-card\">\n                    <div class=\"admin-item-info\" style=\"display: flex; align-items: center; gap: 2rem;\">\n                        <img src=\"".concat(imageData.url, "\" alt=\"").concat(imageData.title || 'Church Image', "\" style=\"width: 150px; height: 150px; object-fit: cover; border-radius: 4px;\">\n                        <div style=\"flex: 1;\">\n                            <h3>").concat(imageData.title || 'Untitled Image', "</h3>\n                            <p>Uploaded: ").concat(uploadDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }), "</p>\n                        </div>\n                    </div>\n                    <div class=\"admin-item-actions\">\n                        <button class=\"admin-btn admin-btn-danger\" onclick=\"deleteChurchImage('").concat(imageData.id, "')\">Delete</button>\n                    </div>\n                </div>\n            ");
            listContainer.append(imageHtml);
          });
          _context44.next = 16;
          break;

        case 12:
          _context44.prev = 12;
          _context44.t0 = _context44["catch"](2);
          console.error('Error loading church images:', _context44.t0);
          listContainer.html('<p style="font-size: 1.4rem; color: #dd4043;">Error loading images. Please refresh the page.</p>');

        case 16:
        case "end":
          return _context44.stop();
      }
    }
  }, null, null, [[2, 12]]);
}

function deleteChurchImage(id) {
  var churchImages, imageData;
  return regeneratorRuntime.async(function deleteChurchImage$(_context45) {
    while (1) {
      switch (_context45.prev = _context45.next) {
        case 0:
          if (!confirm('Are you sure you want to delete this image?')) {
            _context45.next = 25;
            break;
          }

          _context45.prev = 1;
          _context45.next = 4;
          return regeneratorRuntime.awrap(getAllChurchImagesFromFirebase());

        case 4:
          churchImages = _context45.sent;
          imageData = churchImages.find(function (img) {
            return img.id === id;
          });

          if (!(imageData && imageData.url)) {
            _context45.next = 15;
            break;
          }

          _context45.prev = 7;
          _context45.next = 10;
          return regeneratorRuntime.awrap(deleteImageFromFirebaseStorage(imageData.url));

        case 10:
          _context45.next = 15;
          break;

        case 12:
          _context45.prev = 12;
          _context45.t0 = _context45["catch"](7);
          console.warn('Could not delete image from Cloudinary:', _context45.t0);

        case 15:
          _context45.next = 17;
          return regeneratorRuntime.awrap(deleteChurchImageFromFirebase(id));

        case 17:
          loadChurchImages();
          showMessage('churchImagesMessage', 'Image deleted successfully!', 'success');
          _context45.next = 25;
          break;

        case 21:
          _context45.prev = 21;
          _context45.t1 = _context45["catch"](1);
          console.error('Error deleting church image:', _context45.t1);
          showMessage('churchImagesMessage', 'Error deleting image. Please try again.', 'error');

        case 25:
        case "end":
          return _context45.stop();
      }
    }
  }, null, null, [[1, 21], [7, 12]]);
}

function clearChurchImageForm() {
  $('#imageTitle').val('');
  $('#churchImage').val('');
  $('#churchImagePreview').empty();
} // Logout


function logout() {
  sessionStorage.removeItem('adminLoggedIn');
  window.location.href = 'admin-login.html';
} // Update save functions to handle editing


$(document).ready(function () {
  $('#newsForm').on('submit', function (e) {
    e.preventDefault();
    var editingId = $(this).data('editingId');

    if (editingId) {
      updateNewsItem(editingId);
    } else {
      saveNewsItem();
    }
  });
  $('#activitiesForm').on('submit', function (e) {
    e.preventDefault();
    var editingId = $(this).data('editingId');

    if (editingId) {
      updateActivityItem(editingId);
    } else {
      saveActivityItem();
    }
  });
}); // Update News Item

function updateNewsItem(id) {
  var title, text, imageFile, newsItems, item, updatedItem, imagePath;
  return regeneratorRuntime.async(function updateNewsItem$(_context46) {
    while (1) {
      switch (_context46.prev = _context46.next) {
        case 0:
          title = $('#newsTitle').val();
          text = $('#newsText').val();
          imageFile = $('#newsImage')[0].files[0];

          if (!(!title || !text)) {
            _context46.next = 6;
            break;
          }

          showMessage('newsMessage', 'Please fill in all fields', 'error');
          return _context46.abrupt("return");

        case 6:
          _context46.prev = 6;
          _context46.next = 9;
          return regeneratorRuntime.awrap(getAllNewsItemsFromFirebase());

        case 9:
          newsItems = _context46.sent;
          item = newsItems.find(function (n) {
            return n.id === id;
          });

          if (item) {
            _context46.next = 14;
            break;
          }

          showMessage('newsMessage', 'News item not found', 'error');
          return _context46.abrupt("return");

        case 14:
          updatedItem = {
            title: title,
            text: text,
            date: item.date || new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }),
            image: item.image // Keep existing image by default

          }; // Handle new image upload

          if (!imageFile) {
            _context46.next = 29;
            break;
          }

          if (!item.image) {
            _context46.next = 25;
            break;
          }

          _context46.prev = 17;
          _context46.next = 20;
          return regeneratorRuntime.awrap(deleteImageFromFirebaseStorage(item.image));

        case 20:
          _context46.next = 25;
          break;

        case 22:
          _context46.prev = 22;
          _context46.t0 = _context46["catch"](17);
          console.warn('Could not delete old image:', _context46.t0);

        case 25:
          // Upload new image
          imagePath = "news/".concat(Date.now(), "_").concat(imageFile.name);
          _context46.next = 28;
          return regeneratorRuntime.awrap(uploadImageToFirebaseStorage(imageFile, imagePath));

        case 28:
          updatedItem.image = _context46.sent;

        case 29:
          _context46.next = 31;
          return regeneratorRuntime.awrap(updateNewsItemInFirebase(id, updatedItem));

        case 31:
          loadNewsItems();
          clearNewsForm();
          showMessage('newsMessage', 'News item updated successfully!', 'success');
          _context46.next = 40;
          break;

        case 36:
          _context46.prev = 36;
          _context46.t1 = _context46["catch"](6);
          console.error('Error updating news item:', _context46.t1);
          showMessage('newsMessage', 'Error updating news item. Please try again.', 'error');

        case 40:
        case "end":
          return _context46.stop();
      }
    }
  }, null, null, [[6, 36], [17, 22]]);
} // Update Activity Item


function updateActivityItem(id) {
  var title, text, imageFile, activitiesItems, item, updatedItem, imagePath;
  return regeneratorRuntime.async(function updateActivityItem$(_context47) {
    while (1) {
      switch (_context47.prev = _context47.next) {
        case 0:
          title = $('#activityTitle').val();
          text = $('#activityText').val();
          imageFile = $('#activityImage')[0].files[0];

          if (!(!title || !text)) {
            _context47.next = 6;
            break;
          }

          showMessage('activitiesMessage', 'Please fill in all fields', 'error');
          return _context47.abrupt("return");

        case 6:
          _context47.prev = 6;
          _context47.next = 9;
          return regeneratorRuntime.awrap(getAllActivityItemsFromFirebase());

        case 9:
          activitiesItems = _context47.sent;
          item = activitiesItems.find(function (a) {
            return a.id === id;
          });

          if (item) {
            _context47.next = 14;
            break;
          }

          showMessage('activitiesMessage', 'Activity not found', 'error');
          return _context47.abrupt("return");

        case 14:
          updatedItem = {
            title: title,
            text: text,
            date: item.date || new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }),
            image: item.image // Keep existing image by default

          }; // Handle new image upload

          if (!imageFile) {
            _context47.next = 29;
            break;
          }

          if (!item.image) {
            _context47.next = 25;
            break;
          }

          _context47.prev = 17;
          _context47.next = 20;
          return regeneratorRuntime.awrap(deleteImageFromFirebaseStorage(item.image));

        case 20:
          _context47.next = 25;
          break;

        case 22:
          _context47.prev = 22;
          _context47.t0 = _context47["catch"](17);
          console.warn('Could not delete old image:', _context47.t0);

        case 25:
          // Upload new image
          imagePath = "activities/".concat(Date.now(), "_").concat(imageFile.name);
          _context47.next = 28;
          return regeneratorRuntime.awrap(uploadImageToFirebaseStorage(imageFile, imagePath));

        case 28:
          updatedItem.image = _context47.sent;

        case 29:
          _context47.next = 31;
          return regeneratorRuntime.awrap(updateActivityItemInFirebase(id, updatedItem));

        case 31:
          loadActivitiesItems();
          clearActivityForm();
          showMessage('activitiesMessage', 'Activity updated successfully!', 'success');
          _context47.next = 40;
          break;

        case 36:
          _context47.prev = 36;
          _context47.t1 = _context47["catch"](6);
          console.error('Error updating activity:', _context47.t1);
          showMessage('activitiesMessage', 'Error updating activity. Please try again.', 'error');

        case 40:
        case "end":
          return _context47.stop();
      }
    }
  }, null, null, [[6, 36], [17, 22]]);
}