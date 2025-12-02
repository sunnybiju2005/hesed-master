// Firebase Service Module - Handles all database operations using Realtime Database

// ========== NEWS & ACTIVITIES ==========

// Save News Item
async function saveNewsItemToFirebase(newsItem) {
    try {
        const newItem = {
            ...newsItem,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
        };
        const newRef = await db.ref('news').push(newItem);
        return newRef.key;
    } catch (error) {
        console.error('Error saving news item:', error);
        throw error;
    }
}

// Update News Item
async function updateNewsItemInFirebase(id, newsItem) {
    try {
        const updates = {
            ...newsItem,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
        };
        await db.ref('news/' + id).update(updates);
    } catch (error) {
        console.error('Error updating news item:', error);
        throw error;
    }
}

// Delete News Item
async function deleteNewsItemFromFirebase(id) {
    try {
        await db.ref('news/' + id).remove();
    } catch (error) {
        console.error('Error deleting news item:', error);
        throw error;
    }
}

// Get All News Items
async function getAllNewsItemsFromFirebase() {
    try {
        const snapshot = await db.ref('news').once('value');
        const data = snapshot.val();
        if (!data) return [];
        
        return Object.keys(data).map(key => ({
            id: key,
            ...data[key]
        })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } catch (error) {
        console.error('Error getting news items:', error);
        throw error;
    }
}

// Save Activity Item
async function saveActivityItemToFirebase(activityItem) {
    try {
        const newItem = {
            ...activityItem,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
        };
        const newRef = await db.ref('activities').push(newItem);
        return newRef.key;
    } catch (error) {
        console.error('Error saving activity item:', error);
        throw error;
    }
}

// Update Activity Item
async function updateActivityItemInFirebase(id, activityItem) {
    try {
        const updates = {
            ...activityItem,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
        };
        await db.ref('activities/' + id).update(updates);
    } catch (error) {
        console.error('Error updating activity item:', error);
        throw error;
    }
}

// Delete Activity Item
async function deleteActivityItemFromFirebase(id) {
    try {
        await db.ref('activities/' + id).remove();
    } catch (error) {
        console.error('Error deleting activity item:', error);
        throw error;
    }
}

// Get All Activity Items
async function getAllActivityItemsFromFirebase() {
    try {
        const snapshot = await db.ref('activities').once('value');
        const data = snapshot.val();
        if (!data) return [];
        
        return Object.keys(data).map(key => ({
            id: key,
            ...data[key]
        })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } catch (error) {
        console.error('Error getting activity items:', error);
        throw error;
    }
}

// ========== SERVICE TEAMS ==========

// Save Service Team Member
async function saveServiceTeamMemberToFirebase(member) {
    try {
        const newMember = {
            ...member,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
        };
        const newRef = await db.ref('serviceTeam').push(newMember);
        return newRef.key;
    } catch (error) {
        console.error('Error saving service team member:', error);
        throw error;
    }
}

// Update Service Team Member
async function updateServiceTeamMemberInFirebase(id, member) {
    try {
        const updates = {
            ...member,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
        };
        await db.ref('serviceTeam/' + id).update(updates);
    } catch (error) {
        console.error('Error updating service team member:', error);
        throw error;
    }
}

// Delete Service Team Member
async function deleteServiceTeamMemberFromFirebase(id) {
    try {
        await db.ref('serviceTeam/' + id).remove();
    } catch (error) {
        console.error('Error deleting service team member:', error);
        throw error;
    }
}

// Get All Service Team Members
async function getAllServiceTeamMembersFromFirebase() {
    try {
        const snapshot = await db.ref('serviceTeam').once('value');
        const data = snapshot.val();
        if (!data) return [];
        
        return Object.keys(data).map(key => ({
            id: key,
            ...data[key]
        })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } catch (error) {
        console.error('Error getting service team members:', error);
        throw error;
    }
}

// ========== CLC TEAM ==========

async function saveCLCTeamMemberToFirebase(member) {
    try {
        const newMember = {
            ...member,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
        };
        const newRef = await db.ref('clcTeam').push(newMember);
        return newRef.key;
    } catch (error) {
        console.error('Error saving CLC team member:', error);
        throw error;
    }
}

async function updateCLCTeamMemberInFirebase(id, member) {
    try {
        const updates = {
            ...member,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
        };
        await db.ref('clcTeam/' + id).update(updates);
    } catch (error) {
        console.error('Error updating CLC team member:', error);
        throw error;
    }
}

async function deleteCLCTeamMemberFromFirebase(id) {
    try {
        await db.ref('clcTeam/' + id).remove();
    } catch (error) {
        console.error('Error deleting CLC team member:', error);
        throw error;
    }
}

async function getAllCLCTeamMembersFromFirebase() {
    try {
        const snapshot = await db.ref('clcTeam').once('value');
        const data = snapshot.val();
        if (!data) return [];
        
        return Object.keys(data).map(key => ({
            id: key,
            ...data[key]
        })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } catch (error) {
        console.error('Error getting CLC team members:', error);
        throw error;
    }
}

// ========== KCYM TEAM ==========

async function saveKCYMTeamMemberToFirebase(member) {
    try {
        const newMember = {
            ...member,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
        };
        const newRef = await db.ref('kcymTeam').push(newMember);
        return newRef.key;
    } catch (error) {
        console.error('Error saving KCYM team member:', error);
        throw error;
    }
}

async function updateKCYMTeamMemberInFirebase(id, member) {
    try {
        const updates = {
            ...member,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
        };
        await db.ref('kcymTeam/' + id).update(updates);
    } catch (error) {
        console.error('Error updating KCYM team member:', error);
        throw error;
    }
}

async function deleteKCYMTeamMemberFromFirebase(id) {
    try {
        await db.ref('kcymTeam/' + id).remove();
    } catch (error) {
        console.error('Error deleting KCYM team member:', error);
        throw error;
    }
}

async function getAllKCYMTeamMembersFromFirebase() {
    try {
        const snapshot = await db.ref('kcymTeam').once('value');
        const data = snapshot.val();
        if (!data) return [];
        
        return Object.keys(data).map(key => ({
            id: key,
            ...data[key]
        })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } catch (error) {
        console.error('Error getting KCYM team members:', error);
        throw error;
    }
}

// ========== CHOIR TEAM ==========

async function saveChoirTeamMemberToFirebase(member) {
    try {
        const newMember = {
            ...member,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
        };
        const newRef = await db.ref('choirTeam').push(newMember);
        return newRef.key;
    } catch (error) {
        console.error('Error saving choir team member:', error);
        throw error;
    }
}

async function updateChoirTeamMemberInFirebase(id, member) {
    try {
        const updates = {
            ...member,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
        };
        await db.ref('choirTeam/' + id).update(updates);
    } catch (error) {
        console.error('Error updating choir team member:', error);
        throw error;
    }
}

async function deleteChoirTeamMemberFromFirebase(id) {
    try {
        await db.ref('choirTeam/' + id).remove();
    } catch (error) {
        console.error('Error deleting choir team member:', error);
        throw error;
    }
}

async function getAllChoirTeamMembersFromFirebase() {
    try {
        const snapshot = await db.ref('choirTeam').once('value');
        const data = snapshot.val();
        if (!data) return [];
        
        return Object.keys(data).map(key => ({
            id: key,
            ...data[key]
        })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } catch (error) {
        console.error('Error getting choir team members:', error);
        throw error;
    }
}

// ========== MATHRUSANGAM TEAM ==========

async function saveMathrusangamTeamMemberToFirebase(member) {
    try {
        const newMember = {
            ...member,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
        };
        const newRef = await db.ref('mathrusangamTeam').push(newMember);
        return newRef.key;
    } catch (error) {
        console.error('Error saving mathrusangam team member:', error);
        throw error;
    }
}

async function updateMathrusangamTeamMemberInFirebase(id, member) {
    try {
        const updates = {
            ...member,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
        };
        await db.ref('mathrusangamTeam/' + id).update(updates);
    } catch (error) {
        console.error('Error updating mathrusangam team member:', error);
        throw error;
    }
}

async function deleteMathrusangamTeamMemberFromFirebase(id) {
    try {
        await db.ref('mathrusangamTeam/' + id).remove();
    } catch (error) {
        console.error('Error deleting mathrusangam team member:', error);
        throw error;
    }
}

async function getAllMathrusangamTeamMembersFromFirebase() {
    try {
        const snapshot = await db.ref('mathrusangamTeam').once('value');
        const data = snapshot.val();
        if (!data) return [];
        
        return Object.keys(data).map(key => ({
            id: key,
            ...data[key]
        })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } catch (error) {
        console.error('Error getting mathrusangam team members:', error);
        throw error;
    }
}

// ========== EVENTS ==========

async function saveEventToFirebase(event) {
    try {
        const newEvent = {
            ...event,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
        };
        const newRef = await db.ref('events').push(newEvent);
        return newRef.key;
    } catch (error) {
        console.error('Error saving event:', error);
        throw error;
    }
}

async function updateEventInFirebase(id, event) {
    try {
        const updates = {
            ...event,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
        };
        await db.ref('events/' + id).update(updates);
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
}

async function deleteEventFromFirebase(id) {
    try {
        await db.ref('events/' + id).remove();
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
}

async function getAllEventsFromFirebase() {
    try {
        const snapshot = await db.ref('events').once('value');
        const data = snapshot.val();
        if (!data) return [];
        
        return Object.keys(data).map(key => ({
            id: key,
            ...data[key]
        })).sort((a, b) => {
            // Sort by date (newest first)
            const dateA = a.date || '';
            const dateB = b.date || '';
            return dateB.localeCompare(dateA);
        });
    } catch (error) {
        console.error('Error getting events:', error);
        throw error;
    }
}

async function getEventByIdFromFirebase(id) {
    try {
        const snapshot = await db.ref('events/' + id).once('value');
        const data = snapshot.val();
        if (data) {
            return {
                id: id,
                ...data
            };
        }
        return null;
    } catch (error) {
        console.error('Error getting event:', error);
        throw error;
    }
}

// ========== FATHER PROFILE ==========

async function saveFatherProfileToFirebase(profile) {
    try {
        const updates = {
            ...profile,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
        };
        await db.ref('fatherProfile/current').set(updates);
    } catch (error) {
        console.error('Error saving father profile:', error);
        throw error;
    }
}

async function getFatherProfileFromFirebase() {
    try {
        const snapshot = await db.ref('fatherProfile/current').once('value');
        return snapshot.val();
    } catch (error) {
        console.error('Error getting father profile:', error);
        throw error;
    }
}

async function deleteFatherProfileFromFirebase() {
    try {
        await db.ref('fatherProfile/current').remove();
    } catch (error) {
        console.error('Error deleting father profile:', error);
        throw error;
    }
}

// ========== CHURCH IMAGES ==========

async function saveChurchImageToFirebase(imageData) {
    try {
        const newImage = {
            ...imageData,
            createdAt: firebase.database.ServerValue.TIMESTAMP
        };
        const newRef = await db.ref('churchImages').push(newImage);
        return newRef.key;
    } catch (error) {
        console.error('Error saving church image:', error);
        throw error;
    }
}

async function deleteChurchImageFromFirebase(id) {
    try {
        await db.ref('churchImages/' + id).remove();
    } catch (error) {
        console.error('Error deleting church image:', error);
        throw error;
    }
}

async function getAllChurchImagesFromFirebase() {
    try {
        const snapshot = await db.ref('churchImages').once('value');
        const data = snapshot.val();
        if (!data) return [];
        
        return Object.keys(data).map(key => ({
            id: key,
            ...data[key]
        })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } catch (error) {
        console.error('Error getting church images:', error);
        throw error;
    }
}

// ========== IMAGE UPLOAD TO CLOUDINARY ==========
// IMPORTANT: These functions use CLOUDINARY, not Firebase Storage!
// Function names kept for compatibility, but they call Cloudinary service
// The actual implementation is in cloudinary-service.js

async function uploadImageToFirebaseStorage(file, path) {
    // NOTE: This function actually uploads to CLOUDINARY, not Firebase Storage
    // Function name kept for backward compatibility
    // Extract folder from path (e.g., 'news/123_image.jpg' -> 'news')
    const folder = path.split('/')[0] || '';
    console.log('Uploading image to Cloudinary (not Firebase Storage)');
    return await uploadImageToCloudinary(file, folder);
}

async function deleteImageFromFirebaseStorage(url) {
    // NOTE: This function actually deletes from CLOUDINARY, not Firebase Storage
    // Function name kept for backward compatibility
    console.log('Deleting image from Cloudinary (not Firebase Storage)');
    try {
        await deleteImageFromCloudinary(url);
        console.log('Image successfully deleted from Cloudinary');
    } catch (error) {
        console.error('Failed to delete image from Cloudinary:', error);
        // Don't throw - allow deletion to continue even if image deletion fails
        // This way the data is still removed from Realtime Database
    }
}

// Helper function to upload base64 image
async function uploadBase64ImageToFirebaseStorage(dataUrl, path) {
    // NOTE: This function actually uploads to CLOUDINARY, not Firebase Storage
    // Function name kept for backward compatibility
    const folder = path.split('/')[0] || '';
    return await uploadBase64ImageToCloudinary(dataUrl, folder);
}
