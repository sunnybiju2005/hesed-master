"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Firebase Service Module - Handles all database operations
// ========== NEWS & ACTIVITIES ==========
// Save News Item
function saveNewsItemToFirebase(newsItem) {
  var docRef;
  return regeneratorRuntime.async(function saveNewsItemToFirebase$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(db.collection('news').add(_objectSpread({}, newsItem, {
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          })));

        case 3:
          docRef = _context.sent;
          return _context.abrupt("return", docRef.id);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error('Error saving news item:', _context.t0);
          throw _context.t0;

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
} // Update News Item


function updateNewsItemInFirebase(id, newsItem) {
  return regeneratorRuntime.async(function updateNewsItemInFirebase$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(db.collection('news').doc(id).update(_objectSpread({}, newsItem, {
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          })));

        case 3:
          _context2.next = 9;
          break;

        case 5:
          _context2.prev = 5;
          _context2.t0 = _context2["catch"](0);
          console.error('Error updating news item:', _context2.t0);
          throw _context2.t0;

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 5]]);
} // Delete News Item


function deleteNewsItemFromFirebase(id) {
  return regeneratorRuntime.async(function deleteNewsItemFromFirebase$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(db.collection('news').doc(id)["delete"]());

        case 3:
          _context3.next = 9;
          break;

        case 5:
          _context3.prev = 5;
          _context3.t0 = _context3["catch"](0);
          console.error('Error deleting news item:', _context3.t0);
          throw _context3.t0;

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 5]]);
} // Get All News Items


function getAllNewsItemsFromFirebase() {
  var snapshot;
  return regeneratorRuntime.async(function getAllNewsItemsFromFirebase$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(db.collection('news').orderBy('createdAt', 'desc').get());

        case 3:
          snapshot = _context4.sent;
          return _context4.abrupt("return", snapshot.docs.map(function (doc) {
            return _objectSpread({
              id: doc.id
            }, doc.data());
          }));

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error('Error getting news items:', _context4.t0);
          throw _context4.t0;

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
} // Save Activity Item


function saveActivityItemToFirebase(activityItem) {
  var docRef;
  return regeneratorRuntime.async(function saveActivityItemToFirebase$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(db.collection('activities').add(_objectSpread({}, activityItem, {
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          })));

        case 3:
          docRef = _context5.sent;
          return _context5.abrupt("return", docRef.id);

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.error('Error saving activity item:', _context5.t0);
          throw _context5.t0;

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
} // Update Activity Item


function updateActivityItemInFirebase(id, activityItem) {
  return regeneratorRuntime.async(function updateActivityItemInFirebase$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(db.collection('activities').doc(id).update(_objectSpread({}, activityItem, {
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          })));

        case 3:
          _context6.next = 9;
          break;

        case 5:
          _context6.prev = 5;
          _context6.t0 = _context6["catch"](0);
          console.error('Error updating activity item:', _context6.t0);
          throw _context6.t0;

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 5]]);
} // Delete Activity Item


function deleteActivityItemFromFirebase(id) {
  return regeneratorRuntime.async(function deleteActivityItemFromFirebase$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(db.collection('activities').doc(id)["delete"]());

        case 3:
          _context7.next = 9;
          break;

        case 5:
          _context7.prev = 5;
          _context7.t0 = _context7["catch"](0);
          console.error('Error deleting activity item:', _context7.t0);
          throw _context7.t0;

        case 9:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 5]]);
} // Get All Activity Items


function getAllActivityItemsFromFirebase() {
  var snapshot;
  return regeneratorRuntime.async(function getAllActivityItemsFromFirebase$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(db.collection('activities').orderBy('createdAt', 'desc').get());

        case 3:
          snapshot = _context8.sent;
          return _context8.abrupt("return", snapshot.docs.map(function (doc) {
            return _objectSpread({
              id: doc.id
            }, doc.data());
          }));

        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          console.error('Error getting activity items:', _context8.t0);
          throw _context8.t0;

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 7]]);
} // ========== SERVICE TEAMS ==========
// Save Service Team Member


function saveServiceTeamMemberToFirebase(member) {
  var docRef;
  return regeneratorRuntime.async(function saveServiceTeamMemberToFirebase$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(db.collection('serviceTeam').add(_objectSpread({}, member, {
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          })));

        case 3:
          docRef = _context9.sent;
          return _context9.abrupt("return", docRef.id);

        case 7:
          _context9.prev = 7;
          _context9.t0 = _context9["catch"](0);
          console.error('Error saving service team member:', _context9.t0);
          throw _context9.t0;

        case 11:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 7]]);
} // Update Service Team Member


function updateServiceTeamMemberInFirebase(id, member) {
  return regeneratorRuntime.async(function updateServiceTeamMemberInFirebase$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(db.collection('serviceTeam').doc(id).update(_objectSpread({}, member, {
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          })));

        case 3:
          _context10.next = 9;
          break;

        case 5:
          _context10.prev = 5;
          _context10.t0 = _context10["catch"](0);
          console.error('Error updating service team member:', _context10.t0);
          throw _context10.t0;

        case 9:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 5]]);
} // Delete Service Team Member


function deleteServiceTeamMemberFromFirebase(id) {
  return regeneratorRuntime.async(function deleteServiceTeamMemberFromFirebase$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(db.collection('serviceTeam').doc(id)["delete"]());

        case 3:
          _context11.next = 9;
          break;

        case 5:
          _context11.prev = 5;
          _context11.t0 = _context11["catch"](0);
          console.error('Error deleting service team member:', _context11.t0);
          throw _context11.t0;

        case 9:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 5]]);
} // Get All Service Team Members


function getAllServiceTeamMembersFromFirebase() {
  var snapshot;
  return regeneratorRuntime.async(function getAllServiceTeamMembersFromFirebase$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return regeneratorRuntime.awrap(db.collection('serviceTeam').orderBy('createdAt', 'desc').get());

        case 3:
          snapshot = _context12.sent;
          return _context12.abrupt("return", snapshot.docs.map(function (doc) {
            return _objectSpread({
              id: doc.id
            }, doc.data());
          }));

        case 7:
          _context12.prev = 7;
          _context12.t0 = _context12["catch"](0);
          console.error('Error getting service team members:', _context12.t0);
          throw _context12.t0;

        case 11:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 7]]);
} // ========== CLC TEAM ==========


function saveCLCTeamMemberToFirebase(member) {
  var docRef;
  return regeneratorRuntime.async(function saveCLCTeamMemberToFirebase$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return regeneratorRuntime.awrap(db.collection('clcTeam').add(_objectSpread({}, member, {
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          })));

        case 3:
          docRef = _context13.sent;
          return _context13.abrupt("return", docRef.id);

        case 7:
          _context13.prev = 7;
          _context13.t0 = _context13["catch"](0);
          console.error('Error saving CLC team member:', _context13.t0);
          throw _context13.t0;

        case 11:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function updateCLCTeamMemberInFirebase(id, member) {
  return regeneratorRuntime.async(function updateCLCTeamMemberInFirebase$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return regeneratorRuntime.awrap(db.collection('clcTeam').doc(id).update(_objectSpread({}, member, {
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          })));

        case 3:
          _context14.next = 9;
          break;

        case 5:
          _context14.prev = 5;
          _context14.t0 = _context14["catch"](0);
          console.error('Error updating CLC team member:', _context14.t0);
          throw _context14.t0;

        case 9:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 5]]);
}

function deleteCLCTeamMemberFromFirebase(id) {
  return regeneratorRuntime.async(function deleteCLCTeamMemberFromFirebase$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return regeneratorRuntime.awrap(db.collection('clcTeam').doc(id)["delete"]());

        case 3:
          _context15.next = 9;
          break;

        case 5:
          _context15.prev = 5;
          _context15.t0 = _context15["catch"](0);
          console.error('Error deleting CLC team member:', _context15.t0);
          throw _context15.t0;

        case 9:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[0, 5]]);
}

function getAllCLCTeamMembersFromFirebase() {
  var snapshot;
  return regeneratorRuntime.async(function getAllCLCTeamMembersFromFirebase$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return regeneratorRuntime.awrap(db.collection('clcTeam').orderBy('createdAt', 'desc').get());

        case 3:
          snapshot = _context16.sent;
          return _context16.abrupt("return", snapshot.docs.map(function (doc) {
            return _objectSpread({
              id: doc.id
            }, doc.data());
          }));

        case 7:
          _context16.prev = 7;
          _context16.t0 = _context16["catch"](0);
          console.error('Error getting CLC team members:', _context16.t0);
          throw _context16.t0;

        case 11:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 7]]);
} // ========== KCYM TEAM ==========


function saveKCYMTeamMemberToFirebase(member) {
  var docRef;
  return regeneratorRuntime.async(function saveKCYMTeamMemberToFirebase$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          _context17.next = 3;
          return regeneratorRuntime.awrap(db.collection('kcymTeam').add(_objectSpread({}, member, {
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          })));

        case 3:
          docRef = _context17.sent;
          return _context17.abrupt("return", docRef.id);

        case 7:
          _context17.prev = 7;
          _context17.t0 = _context17["catch"](0);
          console.error('Error saving KCYM team member:', _context17.t0);
          throw _context17.t0;

        case 11:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function updateKCYMTeamMemberInFirebase(id, member) {
  return regeneratorRuntime.async(function updateKCYMTeamMemberInFirebase$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _context18.next = 3;
          return regeneratorRuntime.awrap(db.collection('kcymTeam').doc(id).update(_objectSpread({}, member, {
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          })));

        case 3:
          _context18.next = 9;
          break;

        case 5:
          _context18.prev = 5;
          _context18.t0 = _context18["catch"](0);
          console.error('Error updating KCYM team member:', _context18.t0);
          throw _context18.t0;

        case 9:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[0, 5]]);
}

function deleteKCYMTeamMemberFromFirebase(id) {
  return regeneratorRuntime.async(function deleteKCYMTeamMemberFromFirebase$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          _context19.next = 3;
          return regeneratorRuntime.awrap(db.collection('kcymTeam').doc(id)["delete"]());

        case 3:
          _context19.next = 9;
          break;

        case 5:
          _context19.prev = 5;
          _context19.t0 = _context19["catch"](0);
          console.error('Error deleting KCYM team member:', _context19.t0);
          throw _context19.t0;

        case 9:
        case "end":
          return _context19.stop();
      }
    }
  }, null, null, [[0, 5]]);
}

function getAllKCYMTeamMembersFromFirebase() {
  var snapshot;
  return regeneratorRuntime.async(function getAllKCYMTeamMembersFromFirebase$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          _context20.next = 3;
          return regeneratorRuntime.awrap(db.collection('kcymTeam').orderBy('createdAt', 'desc').get());

        case 3:
          snapshot = _context20.sent;
          return _context20.abrupt("return", snapshot.docs.map(function (doc) {
            return _objectSpread({
              id: doc.id
            }, doc.data());
          }));

        case 7:
          _context20.prev = 7;
          _context20.t0 = _context20["catch"](0);
          console.error('Error getting KCYM team members:', _context20.t0);
          throw _context20.t0;

        case 11:
        case "end":
          return _context20.stop();
      }
    }
  }, null, null, [[0, 7]]);
} // ========== CHOIR TEAM ==========


function saveChoirTeamMemberToFirebase(member) {
  var docRef;
  return regeneratorRuntime.async(function saveChoirTeamMemberToFirebase$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          _context21.next = 3;
          return regeneratorRuntime.awrap(db.collection('choirTeam').add(_objectSpread({}, member, {
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          })));

        case 3:
          docRef = _context21.sent;
          return _context21.abrupt("return", docRef.id);

        case 7:
          _context21.prev = 7;
          _context21.t0 = _context21["catch"](0);
          console.error('Error saving choir team member:', _context21.t0);
          throw _context21.t0;

        case 11:
        case "end":
          return _context21.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function updateChoirTeamMemberInFirebase(id, member) {
  return regeneratorRuntime.async(function updateChoirTeamMemberInFirebase$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          _context22.next = 3;
          return regeneratorRuntime.awrap(db.collection('choirTeam').doc(id).update(_objectSpread({}, member, {
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          })));

        case 3:
          _context22.next = 9;
          break;

        case 5:
          _context22.prev = 5;
          _context22.t0 = _context22["catch"](0);
          console.error('Error updating choir team member:', _context22.t0);
          throw _context22.t0;

        case 9:
        case "end":
          return _context22.stop();
      }
    }
  }, null, null, [[0, 5]]);
}

function deleteChoirTeamMemberFromFirebase(id) {
  return regeneratorRuntime.async(function deleteChoirTeamMemberFromFirebase$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          _context23.prev = 0;
          _context23.next = 3;
          return regeneratorRuntime.awrap(db.collection('choirTeam').doc(id)["delete"]());

        case 3:
          _context23.next = 9;
          break;

        case 5:
          _context23.prev = 5;
          _context23.t0 = _context23["catch"](0);
          console.error('Error deleting choir team member:', _context23.t0);
          throw _context23.t0;

        case 9:
        case "end":
          return _context23.stop();
      }
    }
  }, null, null, [[0, 5]]);
}

function getAllChoirTeamMembersFromFirebase() {
  var snapshot;
  return regeneratorRuntime.async(function getAllChoirTeamMembersFromFirebase$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          _context24.prev = 0;
          _context24.next = 3;
          return regeneratorRuntime.awrap(db.collection('choirTeam').orderBy('createdAt', 'desc').get());

        case 3:
          snapshot = _context24.sent;
          return _context24.abrupt("return", snapshot.docs.map(function (doc) {
            return _objectSpread({
              id: doc.id
            }, doc.data());
          }));

        case 7:
          _context24.prev = 7;
          _context24.t0 = _context24["catch"](0);
          console.error('Error getting choir team members:', _context24.t0);
          throw _context24.t0;

        case 11:
        case "end":
          return _context24.stop();
      }
    }
  }, null, null, [[0, 7]]);
} // ========== MATHRUSANGAM TEAM ==========


function saveMathrusangamTeamMemberToFirebase(member) {
  var docRef;
  return regeneratorRuntime.async(function saveMathrusangamTeamMemberToFirebase$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          _context25.prev = 0;
          _context25.next = 3;
          return regeneratorRuntime.awrap(db.collection('mathrusangamTeam').add(_objectSpread({}, member, {
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          })));

        case 3:
          docRef = _context25.sent;
          return _context25.abrupt("return", docRef.id);

        case 7:
          _context25.prev = 7;
          _context25.t0 = _context25["catch"](0);
          console.error('Error saving mathrusangam team member:', _context25.t0);
          throw _context25.t0;

        case 11:
        case "end":
          return _context25.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function updateMathrusangamTeamMemberInFirebase(id, member) {
  return regeneratorRuntime.async(function updateMathrusangamTeamMemberInFirebase$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          _context26.prev = 0;
          _context26.next = 3;
          return regeneratorRuntime.awrap(db.collection('mathrusangamTeam').doc(id).update(_objectSpread({}, member, {
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          })));

        case 3:
          _context26.next = 9;
          break;

        case 5:
          _context26.prev = 5;
          _context26.t0 = _context26["catch"](0);
          console.error('Error updating mathrusangam team member:', _context26.t0);
          throw _context26.t0;

        case 9:
        case "end":
          return _context26.stop();
      }
    }
  }, null, null, [[0, 5]]);
}

function deleteMathrusangamTeamMemberFromFirebase(id) {
  return regeneratorRuntime.async(function deleteMathrusangamTeamMemberFromFirebase$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          _context27.prev = 0;
          _context27.next = 3;
          return regeneratorRuntime.awrap(db.collection('mathrusangamTeam').doc(id)["delete"]());

        case 3:
          _context27.next = 9;
          break;

        case 5:
          _context27.prev = 5;
          _context27.t0 = _context27["catch"](0);
          console.error('Error deleting mathrusangam team member:', _context27.t0);
          throw _context27.t0;

        case 9:
        case "end":
          return _context27.stop();
      }
    }
  }, null, null, [[0, 5]]);
}

function getAllMathrusangamTeamMembersFromFirebase() {
  var snapshot;
  return regeneratorRuntime.async(function getAllMathrusangamTeamMembersFromFirebase$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          _context28.prev = 0;
          _context28.next = 3;
          return regeneratorRuntime.awrap(db.collection('mathrusangamTeam').orderBy('createdAt', 'desc').get());

        case 3:
          snapshot = _context28.sent;
          return _context28.abrupt("return", snapshot.docs.map(function (doc) {
            return _objectSpread({
              id: doc.id
            }, doc.data());
          }));

        case 7:
          _context28.prev = 7;
          _context28.t0 = _context28["catch"](0);
          console.error('Error getting mathrusangam team members:', _context28.t0);
          throw _context28.t0;

        case 11:
        case "end":
          return _context28.stop();
      }
    }
  }, null, null, [[0, 7]]);
} // ========== EVENTS ==========


function saveEventToFirebase(event) {
  var docRef;
  return regeneratorRuntime.async(function saveEventToFirebase$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          _context29.prev = 0;
          _context29.next = 3;
          return regeneratorRuntime.awrap(db.collection('events').add(_objectSpread({}, event, {
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          })));

        case 3:
          docRef = _context29.sent;
          return _context29.abrupt("return", docRef.id);

        case 7:
          _context29.prev = 7;
          _context29.t0 = _context29["catch"](0);
          console.error('Error saving event:', _context29.t0);
          throw _context29.t0;

        case 11:
        case "end":
          return _context29.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function updateEventInFirebase(id, event) {
  return regeneratorRuntime.async(function updateEventInFirebase$(_context30) {
    while (1) {
      switch (_context30.prev = _context30.next) {
        case 0:
          _context30.prev = 0;
          _context30.next = 3;
          return regeneratorRuntime.awrap(db.collection('events').doc(id).update(_objectSpread({}, event, {
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          })));

        case 3:
          _context30.next = 9;
          break;

        case 5:
          _context30.prev = 5;
          _context30.t0 = _context30["catch"](0);
          console.error('Error updating event:', _context30.t0);
          throw _context30.t0;

        case 9:
        case "end":
          return _context30.stop();
      }
    }
  }, null, null, [[0, 5]]);
}

function deleteEventFromFirebase(id) {
  return regeneratorRuntime.async(function deleteEventFromFirebase$(_context31) {
    while (1) {
      switch (_context31.prev = _context31.next) {
        case 0:
          _context31.prev = 0;
          _context31.next = 3;
          return regeneratorRuntime.awrap(db.collection('events').doc(id)["delete"]());

        case 3:
          _context31.next = 9;
          break;

        case 5:
          _context31.prev = 5;
          _context31.t0 = _context31["catch"](0);
          console.error('Error deleting event:', _context31.t0);
          throw _context31.t0;

        case 9:
        case "end":
          return _context31.stop();
      }
    }
  }, null, null, [[0, 5]]);
}

function getAllEventsFromFirebase() {
  var snapshot;
  return regeneratorRuntime.async(function getAllEventsFromFirebase$(_context32) {
    while (1) {
      switch (_context32.prev = _context32.next) {
        case 0:
          _context32.prev = 0;
          _context32.next = 3;
          return regeneratorRuntime.awrap(db.collection('events').orderBy('date', 'desc').get());

        case 3:
          snapshot = _context32.sent;
          return _context32.abrupt("return", snapshot.docs.map(function (doc) {
            return _objectSpread({
              id: doc.id
            }, doc.data());
          }));

        case 7:
          _context32.prev = 7;
          _context32.t0 = _context32["catch"](0);
          console.error('Error getting events:', _context32.t0);
          throw _context32.t0;

        case 11:
        case "end":
          return _context32.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function getEventByIdFromFirebase(id) {
  var doc;
  return regeneratorRuntime.async(function getEventByIdFromFirebase$(_context33) {
    while (1) {
      switch (_context33.prev = _context33.next) {
        case 0:
          _context33.prev = 0;
          _context33.next = 3;
          return regeneratorRuntime.awrap(db.collection('events').doc(id).get());

        case 3:
          doc = _context33.sent;

          if (!doc.exists) {
            _context33.next = 6;
            break;
          }

          return _context33.abrupt("return", _objectSpread({
            id: doc.id
          }, doc.data()));

        case 6:
          return _context33.abrupt("return", null);

        case 9:
          _context33.prev = 9;
          _context33.t0 = _context33["catch"](0);
          console.error('Error getting event:', _context33.t0);
          throw _context33.t0;

        case 13:
        case "end":
          return _context33.stop();
      }
    }
  }, null, null, [[0, 9]]);
} // ========== FATHER PROFILE ==========


function saveFatherProfileToFirebase(profile) {
  return regeneratorRuntime.async(function saveFatherProfileToFirebase$(_context34) {
    while (1) {
      switch (_context34.prev = _context34.next) {
        case 0:
          _context34.prev = 0;
          _context34.next = 3;
          return regeneratorRuntime.awrap(db.collection('fatherProfile').doc('current').set(_objectSpread({}, profile, {
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          }), {
            merge: true
          }));

        case 3:
          _context34.next = 9;
          break;

        case 5:
          _context34.prev = 5;
          _context34.t0 = _context34["catch"](0);
          console.error('Error saving father profile:', _context34.t0);
          throw _context34.t0;

        case 9:
        case "end":
          return _context34.stop();
      }
    }
  }, null, null, [[0, 5]]);
}

function getFatherProfileFromFirebase() {
  var doc;
  return regeneratorRuntime.async(function getFatherProfileFromFirebase$(_context35) {
    while (1) {
      switch (_context35.prev = _context35.next) {
        case 0:
          _context35.prev = 0;
          _context35.next = 3;
          return regeneratorRuntime.awrap(db.collection('fatherProfile').doc('current').get());

        case 3:
          doc = _context35.sent;

          if (!doc.exists) {
            _context35.next = 6;
            break;
          }

          return _context35.abrupt("return", doc.data());

        case 6:
          return _context35.abrupt("return", null);

        case 9:
          _context35.prev = 9;
          _context35.t0 = _context35["catch"](0);
          console.error('Error getting father profile:', _context35.t0);
          throw _context35.t0;

        case 13:
        case "end":
          return _context35.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

function deleteFatherProfileFromFirebase() {
  return regeneratorRuntime.async(function deleteFatherProfileFromFirebase$(_context36) {
    while (1) {
      switch (_context36.prev = _context36.next) {
        case 0:
          _context36.prev = 0;
          _context36.next = 3;
          return regeneratorRuntime.awrap(db.collection('fatherProfile').doc('current')["delete"]());

        case 3:
          _context36.next = 9;
          break;

        case 5:
          _context36.prev = 5;
          _context36.t0 = _context36["catch"](0);
          console.error('Error deleting father profile:', _context36.t0);
          throw _context36.t0;

        case 9:
        case "end":
          return _context36.stop();
      }
    }
  }, null, null, [[0, 5]]);
} // ========== CHURCH IMAGES ==========


function saveChurchImageToFirebase(imageData) {
  var docRef;
  return regeneratorRuntime.async(function saveChurchImageToFirebase$(_context37) {
    while (1) {
      switch (_context37.prev = _context37.next) {
        case 0:
          _context37.prev = 0;
          _context37.next = 3;
          return regeneratorRuntime.awrap(db.collection('churchImages').add(_objectSpread({}, imageData, {
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          })));

        case 3:
          docRef = _context37.sent;
          return _context37.abrupt("return", docRef.id);

        case 7:
          _context37.prev = 7;
          _context37.t0 = _context37["catch"](0);
          console.error('Error saving church image:', _context37.t0);
          throw _context37.t0;

        case 11:
        case "end":
          return _context37.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function deleteChurchImageFromFirebase(id) {
  return regeneratorRuntime.async(function deleteChurchImageFromFirebase$(_context38) {
    while (1) {
      switch (_context38.prev = _context38.next) {
        case 0:
          _context38.prev = 0;
          _context38.next = 3;
          return regeneratorRuntime.awrap(db.collection('churchImages').doc(id)["delete"]());

        case 3:
          _context38.next = 9;
          break;

        case 5:
          _context38.prev = 5;
          _context38.t0 = _context38["catch"](0);
          console.error('Error deleting church image:', _context38.t0);
          throw _context38.t0;

        case 9:
        case "end":
          return _context38.stop();
      }
    }
  }, null, null, [[0, 5]]);
}

function getAllChurchImagesFromFirebase() {
  var snapshot;
  return regeneratorRuntime.async(function getAllChurchImagesFromFirebase$(_context39) {
    while (1) {
      switch (_context39.prev = _context39.next) {
        case 0:
          _context39.prev = 0;
          _context39.next = 3;
          return regeneratorRuntime.awrap(db.collection('churchImages').orderBy('createdAt', 'desc').get());

        case 3:
          snapshot = _context39.sent;
          return _context39.abrupt("return", snapshot.docs.map(function (doc) {
            return _objectSpread({
              id: doc.id
            }, doc.data());
          }));

        case 7:
          _context39.prev = 7;
          _context39.t0 = _context39["catch"](0);
          console.error('Error getting church images:', _context39.t0);
          throw _context39.t0;

        case 11:
        case "end":
          return _context39.stop();
      }
    }
  }, null, null, [[0, 7]]);
} // ========== IMAGE UPLOAD TO CLOUDINARY ==========
// Note: These functions are now wrappers that call Cloudinary service
// The actual implementation is in cloudinary-service.js


function uploadImageToFirebaseStorage(file, path) {
  var folder;
  return regeneratorRuntime.async(function uploadImageToFirebaseStorage$(_context40) {
    while (1) {
      switch (_context40.prev = _context40.next) {
        case 0:
          // This function name is kept for compatibility
          // Extract folder from path (e.g., 'news/123_image.jpg' -> 'news')
          folder = path.split('/')[0] || '';
          _context40.next = 3;
          return regeneratorRuntime.awrap(uploadImageToCloudinary(file, folder));

        case 3:
          return _context40.abrupt("return", _context40.sent);

        case 4:
        case "end":
          return _context40.stop();
      }
    }
  });
}

function deleteImageFromFirebaseStorage(url) {
  return regeneratorRuntime.async(function deleteImageFromFirebaseStorage$(_context41) {
    while (1) {
      switch (_context41.prev = _context41.next) {
        case 0:
          _context41.next = 2;
          return regeneratorRuntime.awrap(deleteImageFromCloudinary(url));

        case 2:
          return _context41.abrupt("return", _context41.sent);

        case 3:
        case "end":
          return _context41.stop();
      }
    }
  });
} // Helper function to upload base64 image


function uploadBase64ImageToFirebaseStorage(dataUrl, path) {
  var folder;
  return regeneratorRuntime.async(function uploadBase64ImageToFirebaseStorage$(_context42) {
    while (1) {
      switch (_context42.prev = _context42.next) {
        case 0:
          // This function name is kept for compatibility
          folder = path.split('/')[0] || '';
          _context42.next = 3;
          return regeneratorRuntime.awrap(uploadBase64ImageToCloudinary(dataUrl, folder));

        case 3:
          return _context42.abrupt("return", _context42.sent);

        case 4:
        case "end":
          return _context42.stop();
      }
    }
  });
}