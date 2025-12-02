// Firebase Service Module - Handles all database operations

// ========== NEWS & ACTIVITIES ==========

// Save News Item
async function saveNewsItemToFirebase(newsItem) {
    try {
        const docRef = await db.collection('news').add({
            ...newsItem,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error saving news item:', error);
        throw error;
    }
}

// Update News Item
async function updateNewsItemInFirebase(id, newsItem) {
    try {
        await db.collection('news').doc(id).update({
            ...newsItem,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating news item:', error);
        throw error;
    }
}

// Delete News Item
async function deleteNewsItemFromFirebase(id) {
    try {
        await db.collection('news').doc(id).delete();
    } catch (error) {
        console.error('Error deleting news item:', error);
        throw error;
    }
}

// Get All News Items
async function getAllNewsItemsFromFirebase() {
    try {
        const snapshot = await db.collection('news').orderBy('createdAt', 'desc').get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting news items:', error);
        throw error;
    }
}

// Save Activity Item
async function saveActivityItemToFirebase(activityItem) {
    try {
        const docRef = await db.collection('activities').add({
            ...activityItem,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error saving activity item:', error);
        throw error;
    }
}

// Update Activity Item
async function updateActivityItemInFirebase(id, activityItem) {
    try {
        await db.collection('activities').doc(id).update({
            ...activityItem,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating activity item:', error);
        throw error;
    }
}

// Delete Activity Item
async function deleteActivityItemFromFirebase(id) {
    try {
        await db.collection('activities').doc(id).delete();
    } catch (error) {
        console.error('Error deleting activity item:', error);
        throw error;
    }
}

// Get All Activity Items
async function getAllActivityItemsFromFirebase() {
    try {
        const snapshot = await db.collection('activities').orderBy('createdAt', 'desc').get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting activity items:', error);
        throw error;
    }
}

// ========== SERVICE TEAMS ==========

// Save Service Team Member
async function saveServiceTeamMemberToFirebase(member) {
    try {
        const docRef = await db.collection('serviceTeam').add({
            ...member,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error saving service team member:', error);
        throw error;
    }
}

// Update Service Team Member
async function updateServiceTeamMemberInFirebase(id, member) {
    try {
        await db.collection('serviceTeam').doc(id).update({
            ...member,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating service team member:', error);
        throw error;
    }
}

// Delete Service Team Member
async function deleteServiceTeamMemberFromFirebase(id) {
    try {
        await db.collection('serviceTeam').doc(id).delete();
    } catch (error) {
        console.error('Error deleting service team member:', error);
        throw error;
    }
}

// Get All Service Team Members
async function getAllServiceTeamMembersFromFirebase() {
    try {
        const snapshot = await db.collection('serviceTeam').orderBy('createdAt', 'desc').get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting service team members:', error);
        throw error;
    }
}

// ========== CLC TEAM ==========

async function saveCLCTeamMemberToFirebase(member) {
    try {
        const docRef = await db.collection('clcTeam').add({
            ...member,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error saving CLC team member:', error);
        throw error;
    }
}

async function updateCLCTeamMemberInFirebase(id, member) {
    try {
        await db.collection('clcTeam').doc(id).update({
            ...member,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating CLC team member:', error);
        throw error;
    }
}

async function deleteCLCTeamMemberFromFirebase(id) {
    try {
        await db.collection('clcTeam').doc(id).delete();
    } catch (error) {
        console.error('Error deleting CLC team member:', error);
        throw error;
    }
}

async function getAllCLCTeamMembersFromFirebase() {
    try {
        const snapshot = await db.collection('clcTeam').orderBy('createdAt', 'desc').get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting CLC team members:', error);
        throw error;
    }
}

// ========== KCYM TEAM ==========

async function saveKCYMTeamMemberToFirebase(member) {
    try {
        const docRef = await db.collection('kcymTeam').add({
            ...member,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error saving KCYM team member:', error);
        throw error;
    }
}

async function updateKCYMTeamMemberInFirebase(id, member) {
    try {
        await db.collection('kcymTeam').doc(id).update({
            ...member,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating KCYM team member:', error);
        throw error;
    }
}

async function deleteKCYMTeamMemberFromFirebase(id) {
    try {
        await db.collection('kcymTeam').doc(id).delete();
    } catch (error) {
        console.error('Error deleting KCYM team member:', error);
        throw error;
    }
}

async function getAllKCYMTeamMembersFromFirebase() {
    try {
        const snapshot = await db.collection('kcymTeam').orderBy('createdAt', 'desc').get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting KCYM team members:', error);
        throw error;
    }
}

// ========== CHOIR TEAM ==========

async function saveChoirTeamMemberToFirebase(member) {
    try {
        const docRef = await db.collection('choirTeam').add({
            ...member,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error saving choir team member:', error);
        throw error;
    }
}

async function updateChoirTeamMemberInFirebase(id, member) {
    try {
        await db.collection('choirTeam').doc(id).update({
            ...member,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating choir team member:', error);
        throw error;
    }
}

async function deleteChoirTeamMemberFromFirebase(id) {
    try {
        await db.collection('choirTeam').doc(id).delete();
    } catch (error) {
        console.error('Error deleting choir team member:', error);
        throw error;
    }
}

async function getAllChoirTeamMembersFromFirebase() {
    try {
        const snapshot = await db.collection('choirTeam').orderBy('createdAt', 'desc').get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting choir team members:', error);
        throw error;
    }
}

// ========== MATHRUSANGAM TEAM ==========

async function saveMathrusangamTeamMemberToFirebase(member) {
    try {
        const docRef = await db.collection('mathrusangamTeam').add({
            ...member,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error saving mathrusangam team member:', error);
        throw error;
    }
}

async function updateMathrusangamTeamMemberInFirebase(id, member) {
    try {
        await db.collection('mathrusangamTeam').doc(id).update({
            ...member,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating mathrusangam team member:', error);
        throw error;
    }
}

async function deleteMathrusangamTeamMemberFromFirebase(id) {
    try {
        await db.collection('mathrusangamTeam').doc(id).delete();
    } catch (error) {
        console.error('Error deleting mathrusangam team member:', error);
        throw error;
    }
}

async function getAllMathrusangamTeamMembersFromFirebase() {
    try {
        const snapshot = await db.collection('mathrusangamTeam').orderBy('createdAt', 'desc').get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting mathrusangam team members:', error);
        throw error;
    }
}

// ========== EVENTS ==========

async function saveEventToFirebase(event) {
    try {
        const docRef = await db.collection('events').add({
            ...event,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error saving event:', error);
        throw error;
    }
}

async function updateEventInFirebase(id, event) {
    try {
        await db.collection('events').doc(id).update({
            ...event,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
}

async function deleteEventFromFirebase(id) {
    try {
        await db.collection('events').doc(id).delete();
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
}

async function getAllEventsFromFirebase() {
    try {
        const snapshot = await db.collection('events').orderBy('date', 'desc').get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting events:', error);
        throw error;
    }
}

async function getEventByIdFromFirebase(id) {
    try {
        const doc = await db.collection('events').doc(id).get();
        if (doc.exists) {
            return {
                id: doc.id,
                ...doc.data()
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
        // Father profile is a single document, so we use a fixed ID
        await db.collection('fatherProfile').doc('current').set({
            ...profile,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    } catch (error) {
        console.error('Error saving father profile:', error);
        throw error;
    }
}

async function getFatherProfileFromFirebase() {
    try {
        const doc = await db.collection('fatherProfile').doc('current').get();
        if (doc.exists) {
            return doc.data();
        }
        return null;
    } catch (error) {
        console.error('Error getting father profile:', error);
        throw error;
    }
}

async function deleteFatherProfileFromFirebase() {
    try {
        await db.collection('fatherProfile').doc('current').delete();
    } catch (error) {
        console.error('Error deleting father profile:', error);
        throw error;
    }
}

// ========== CHURCH IMAGES ==========

async function saveChurchImageToFirebase(imageData) {
    try {
        const docRef = await db.collection('churchImages').add({
            ...imageData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error saving church image:', error);
        throw error;
    }
}

async function deleteChurchImageFromFirebase(id) {
    try {
        await db.collection('churchImages').doc(id).delete();
    } catch (error) {
        console.error('Error deleting church image:', error);
        throw error;
    }
}

async function getAllChurchImagesFromFirebase() {
    try {
        const snapshot = await db.collection('churchImages').orderBy('createdAt', 'desc').get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting church images:', error);
        throw error;
    }
}

// ========== IMAGE UPLOAD TO FIREBASE STORAGE ==========

async function uploadImageToFirebaseStorage(file, path) {
    try {
        const storageRef = storage.ref();
        const fileRef = storageRef.child(path);
        const snapshot = await fileRef.put(file);
        const downloadURL = await snapshot.ref.getDownloadURL();
        return downloadURL;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

async function deleteImageFromFirebaseStorage(url) {
    try {
        // Extract the path from the URL
        const urlObj = new URL(url);
        const path = decodeURIComponent(urlObj.pathname.split('/o/')[1].split('?')[0]);
        const storageRef = storage.ref(path);
        await storageRef.delete();
    } catch (error) {
        console.error('Error deleting image:', error);
        // Don't throw - image might not exist in storage if it's a data URL
    }
}

// Convert base64 data URL to Blob for Firebase Storage
function dataURLtoBlob(dataurl) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

// Helper function to upload base64 image to Firebase Storage
async function uploadBase64ImageToFirebaseStorage(dataUrl, path) {
    try {
        const blob = dataURLtoBlob(dataUrl);
        return await uploadImageToFirebaseStorage(blob, path);
    } catch (error) {
        console.error('Error uploading base64 image:', error);
        throw error;
    }
}

