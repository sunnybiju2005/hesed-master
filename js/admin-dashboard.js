// Admin Dashboard JavaScript

// Check if user is logged in
if (sessionStorage.getItem('adminLoggedIn') !== 'true') {
    window.location.href = 'admin-login.html';
}

// Sidebar navigation
$(document).ready(function() {
    $('.admin-sidebar-item').on('click', function() {
        const section = $(this).data('section');
        
        // Update active states
        $('.admin-sidebar-item').removeClass('active');
        $(this).addClass('active');
        
        $('.admin-section').removeClass('active');
        $('#' + section + '-section').addClass('active');
        
        // Reset to first tab when switching main sections
        const activeSection = $('#' + section + '-section');
        if (activeSection.find('.admin-subsection-tabs').length > 0) {
            activeSection.find('.admin-subsection-tab').first().click();
        }
    });
    
    // Sub-section tab navigation
    $(document).on('click', '.admin-subsection-tab', function() {
        const tab = $(this);
        const subsection = tab.data('subsection');
        const section = tab.closest('.admin-section');
        
        // Update tab active states
        section.find('.admin-subsection-tab').removeClass('active');
        tab.addClass('active');
        
        // Update content visibility
        section.find('.admin-subsection-content').removeClass('active');
        section.find('#' + subsection + '-subsection').addClass('active');
    });

    // Image preview handlers
    $('#newsImage').on('change', function(e) {
        previewImage(e.target.files[0], 'newsImagePreview');
    });

    $('#activityImage').on('change', function(e) {
        previewImage(e.target.files[0], 'activityImagePreview');
    });

    $('#memberImage').on('change', function(e) {
        previewImage(e.target.files[0], 'memberImagePreview');
    });

    $('#clcMemberImage').on('change', function(e) {
        previewImage(e.target.files[0], 'clcMemberImagePreview');
    });

    $('#kcymMemberImage').on('change', function(e) {
        previewImage(e.target.files[0], 'kcymMemberImagePreview');
    });

    $('#mathrusangamMemberImage').on('change', function(e) {
        previewImage(e.target.files[0], 'mathrusangamMemberImagePreview');
    });

    $('#choirMemberImage').on('change', function(e) {
        previewImage(e.target.files[0], 'choirMemberImagePreview');
    });

    $('#fatherImage').on('change', function(e) {
        previewImage(e.target.files[0], 'fatherImagePreview');
    });

    $('#churchImage').on('change', function(e) {
        previewImage(e.target.files[0], 'churchImagePreview');
    });

    // Load existing items
    loadNewsItems();
    loadActivitiesItems();
    loadServiceTeamMembers();
    loadCLCTeamMembers();
    loadKCYMTeamMembers();
    loadChoirTeamMembers();
    loadMathrusangamTeamMembers();
    loadEvents();
    loadFatherProfile();
    loadChurchImages();

    // Form submissions
    $('#newsForm').on('submit', function(e) {
        e.preventDefault();
        saveNewsItem();
    });

    $('#activitiesForm').on('submit', function(e) {
        e.preventDefault();
        saveActivityItem();
    });

    $('#serviceTeamForm').on('submit', function(e) {
        e.preventDefault();
        const editingId = $(this).data('editingId');
        if (editingId) {
            updateServiceTeamMember(editingId);
        } else {
            saveServiceTeamMember();
        }
    });

    $('#clcTeamForm').on('submit', function(e) {
        e.preventDefault();
        const editingId = $(this).data('editingId');
        if (editingId) {
            updateCLCTeamMember(editingId);
        } else {
            saveCLCTeamMember();
        }
    });

    $('#kcymTeamForm').on('submit', function(e) {
        e.preventDefault();
        const editingId = $(this).data('editingId');
        if (editingId) {
            updateKCYMTeamMember(editingId);
        } else {
            saveKCYMTeamMember();
        }
    });

    $('#mathrusangamTeamForm').on('submit', function(e) {
        e.preventDefault();
        const editingId = $(this).data('editingId');
        if (editingId) {
            updateMathrusangamTeamMember(editingId);
        } else {
            saveMathrusangamTeamMember();
        }
    });

    $('#eventPhotos').on('change', function(e) {
        previewMultipleImages(e.target.files, 'eventPhotosPreview');
    });

    $('#eventsForm').on('submit', function(e) {
        e.preventDefault();
        const editingId = $(this).data('editingId');
        if (editingId) {
            updateEvent(editingId);
        } else {
            saveEvent();
        }
    });

    $('#fatherProfileForm').on('submit', function(e) {
        e.preventDefault();
        saveFatherProfile();
    });

    $('#churchImagesForm').on('submit', function(e) {
        e.preventDefault();
        saveChurchImage();
    });
});

// Image preview function
function previewImage(file, previewId) {
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            $('#' + previewId).html('<img src="' + e.target.result + '" alt="Preview">');
        };
        reader.readAsDataURL(file);
    }
}

// Save News Item
async function saveNewsItem() {
    const title = $('#newsTitle').val();
    const text = $('#newsText').val();
    const imageFile = $('#newsImage')[0].files[0];

    if (!title || !text) {
        showMessage('newsMessage', 'Please fill in all fields', 'error');
        return;
    }

    // Create new item
    const newItem = {
        title: title,
        text: text,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        image: null
    };

    try {
        // Handle image upload to Cloudinary
        if (imageFile) {
            console.log('Starting image upload for news item...');
            const imagePath = `news/${Date.now()}_${imageFile.name}`;
            const imageUrl = await uploadImageToFirebaseStorage(imageFile, imagePath);
            console.log('Image uploaded successfully, URL:', imageUrl);
            newItem.image = imageUrl;
        }

        // Save to Firebase
        console.log('Saving news item to Firestore...');
        await saveNewsItemToFirebase(newItem);
        loadNewsItems();
        clearNewsForm();
        showMessage('newsMessage', 'News item saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving news item:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack
        });
        showMessage('newsMessage', `Error: ${error.message}`, 'error');
    }
}

// Save Activity Item
async function saveActivityItem() {
    const title = $('#activityTitle').val();
    const text = $('#activityText').val();
    const imageFile = $('#activityImage')[0].files[0];

    if (!title || !text) {
        showMessage('activitiesMessage', 'Please fill in all fields', 'error');
        return;
    }

    // Create new item
    const newItem = {
        title: title,
        text: text,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        image: null
    };

    try {
        // Handle image upload to Cloudinary (not Firebase Storage)
        if (imageFile) {
            const imagePath = `activities/${Date.now()}_${imageFile.name}`;
            const imageUrl = await uploadImageToFirebaseStorage(imageFile, imagePath); // Actually uses Cloudinary
            newItem.image = imageUrl;
        }

        // Save to Firebase
        await saveActivityItemToFirebase(newItem);
        loadActivitiesItems();
        clearActivityForm();
        showMessage('activitiesMessage', 'Activity saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving activity item:', error);
        showMessage('activitiesMessage', 'Error saving activity. Please try again.', 'error');
    }
}

// Load News Items
async function loadNewsItems() {
    const listContainer = $('#newsItemsList');
    listContainer.empty();
    
    try {
        const newsItems = await getAllNewsItemsFromFirebase();
        
        if (newsItems.length === 0) {
            listContainer.html('<p style="font-size: 1.4rem; color: #666666;">No news items yet. Create your first news item above.</p>');
            return;
        }

        newsItems.forEach(function(item) {
            const itemHtml = `
                <div class="admin-item-card">
                    <div class="admin-item-info">
                        <h3>${item.title}</h3>
                        <p>${item.text.substring(0, 100)}${item.text.length > 100 ? '...' : ''}</p>
                        <p style="font-size: 1.2rem; color: #999999; margin-top: 0.5rem;">Date: ${item.date}</p>
                    </div>
                    <div class="admin-item-actions">
                        <button class="admin-btn admin-btn-secondary" onclick="editNewsItem('${item.id}')">Edit</button>
                        <button class="admin-btn admin-btn-danger" onclick="deleteNewsItem('${item.id}')">Delete</button>
                    </div>
                </div>
            `;
            listContainer.append(itemHtml);
        });
    } catch (error) {
        console.error('Error loading news items:', error);
        listContainer.html('<p style="font-size: 1.4rem; color: #dd4043;">Error loading news items. Please refresh the page.</p>');
    }
}

// Load Activities Items
async function loadActivitiesItems() {
    const listContainer = $('#activitiesItemsList');
    listContainer.empty();
    
    try {
        const activitiesItems = await getAllActivityItemsFromFirebase();
        
        if (activitiesItems.length === 0) {
            listContainer.html('<p style="font-size: 1.4rem; color: #cccccc;">No activities yet. Create your first activity above.</p>');
            return;
        }

        activitiesItems.forEach(function(item) {
            const itemHtml = `
                <div class="admin-item-card">
                    <div class="admin-item-info">
                        <h3>${item.title}</h3>
                        <p>${item.text.substring(0, 100)}${item.text.length > 100 ? '...' : ''}</p>
                        <p style="font-size: 1.2rem; color: #999999; margin-top: 0.5rem;">Date: ${item.date}</p>
                    </div>
                    <div class="admin-item-actions">
                        <button class="admin-btn admin-btn-secondary" onclick="editActivityItem('${item.id}')">Edit</button>
                        <button class="admin-btn admin-btn-danger" onclick="deleteActivityItem('${item.id}')">Delete</button>
                    </div>
                </div>
            `;
            listContainer.append(itemHtml);
        });
    } catch (error) {
        console.error('Error loading activities:', error);
        listContainer.html('<p style="font-size: 1.4rem; color: #dd4043;">Error loading activities. Please refresh the page.</p>');
    }
}

// Edit News Item
async function editNewsItem(id) {
    try {
        const newsItems = await getAllNewsItemsFromFirebase();
        const item = newsItems.find(n => n.id === id);
        
        if (item) {
            $('#newsTitle').val(item.title);
            $('#newsText').val(item.text);
            if (item.image) {
                $('#newsImagePreview').html('<img src="' + item.image + '" alt="Preview">');
            }
            
            // Switch to news section
            $('.admin-sidebar-item[data-section="news-activities"]').click();
            setTimeout(() => {
                $('.admin-subsection-tab[data-subsection="news"]').click();
            }, 100);
            
            // Store editing ID
            $('#newsForm').data('editingId', id);
        }
    } catch (error) {
        console.error('Error loading news item for editing:', error);
        showMessage('newsMessage', 'Error loading news item. Please try again.', 'error');
    }
}

// Edit Activity Item
async function editActivityItem(id) {
    try {
        const activitiesItems = await getAllActivityItemsFromFirebase();
        const item = activitiesItems.find(a => a.id === id);
        
        if (item) {
            $('#activityTitle').val(item.title);
            $('#activityText').val(item.text);
            if (item.image) {
                $('#activityImagePreview').html('<img src="' + item.image + '" alt="Preview">');
            }
            
            // Switch to activities section
            $('.admin-sidebar-item[data-section="news-activities"]').click();
            setTimeout(() => {
                $('.admin-subsection-tab[data-subsection="activities"]').click();
            }, 100);
            
            // Store editing ID
            $('#activitiesForm').data('editingId', id);
        }
    } catch (error) {
        console.error('Error loading activity for editing:', error);
        showMessage('activitiesMessage', 'Error loading activity. Please try again.', 'error');
    }
}

// Delete News Item
async function deleteNewsItem(id) {
    if (confirm('Are you sure you want to delete this news item?')) {
        try {
            // Get the item first to delete its image from storage
            const newsItems = await getAllNewsItemsFromFirebase();
            const item = newsItems.find(n => n.id === id);
            
            if (item && item.image) {
                try {
                    await deleteImageFromFirebaseStorage(item.image);
                } catch (error) {
                    console.warn('Could not delete image from storage:', error);
                }
            }
            
            await deleteNewsItemFromFirebase(id);
            loadNewsItems();
            showMessage('newsMessage', 'News item deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting news item:', error);
            showMessage('newsMessage', 'Error deleting news item. Please try again.', 'error');
        }
    }
}

// Delete Activity Item
async function deleteActivityItem(id) {
    if (confirm('Are you sure you want to delete this activity?')) {
        try {
            // Get the item first to delete its image from storage
            const activitiesItems = await getAllActivityItemsFromFirebase();
            const item = activitiesItems.find(a => a.id === id);
            
            if (item && item.image) {
                try {
                    await deleteImageFromFirebaseStorage(item.image);
                } catch (error) {
                    console.warn('Could not delete image from storage:', error);
                }
            }
            
            await deleteActivityItemFromFirebase(id);
            loadActivitiesItems();
            showMessage('activitiesMessage', 'Activity deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting activity:', error);
            showMessage('activitiesMessage', 'Error deleting activity. Please try again.', 'error');
        }
    }
}

// Clear News Form
function clearNewsForm() {
    $('#newsForm')[0].reset();
    $('#newsImagePreview').empty();
    $('#newsForm').removeData('editingId');
}

// Clear Activity Form
function clearActivityForm() {
    $('#activitiesForm')[0].reset();
    $('#activityImagePreview').empty();
    $('#activitiesForm').removeData('editingId');
}

// Show Message
function showMessage(elementId, message, type) {
    const element = $('#' + elementId);
    element.text(message).removeClass('success error').addClass(type);
    setTimeout(function() {
        element.removeClass('success error');
    }, 3000);
}

// Update Index Page News
function updateIndexPageNews() {
    const newsItems = JSON.parse(localStorage.getItem('newsItems') || '[]');
    // Set a timestamp to trigger update
    localStorage.setItem('indexPageNewsUpdated', Date.now().toString());
    // Trigger custom event for same-tab updates
    if (typeof loadNewsToIndexPage === 'function') {
        // If we're on the index page, reload directly
        loadNewsToIndexPage();
    }
}

// Update Index Page Activities
function updateIndexPageActivities() {
    const activitiesItems = JSON.parse(localStorage.getItem('activitiesItems') || '[]');
    // Set a timestamp to trigger update
    localStorage.setItem('indexPageActivitiesUpdated', Date.now().toString());
    // Trigger custom event for same-tab updates
    if (typeof loadNewsToIndexPage === 'function') {
        // If we're on the index page, reload directly
        loadNewsToIndexPage();
    }
}

// Save Service Team Member
async function saveServiceTeamMember() {
    const name = $('#memberName').val();
    const position = $('#memberPosition').val();
    const imageFile = $('#memberImage')[0].files[0];

    if (!name || !position) {
        showMessage('serviceTeamMessage', 'Please fill in all fields', 'error');
        return;
    }

    if (!imageFile) {
        showMessage('serviceTeamMessage', 'Please upload a profile image', 'error');
        return;
    }

    try {
        // Upload image to Cloudinary (not Firebase Storage)
        const imagePath = `teams/service/${Date.now()}_${imageFile.name}`;
        const imageUrl = await uploadImageToFirebaseStorage(imageFile, imagePath); // Actually uses Cloudinary
        
        const newMember = {
            name: name,
            position: position,
            image: imageUrl
        };

        await saveServiceTeamMemberToFirebase(newMember);
        loadServiceTeamMembers();
        clearServiceTeamForm();
        showMessage('serviceTeamMessage', 'Service team member saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving service team member:', error);
        showMessage('serviceTeamMessage', 'Error saving member. Please try again.', 'error');
    }
}

// Load Service Team Members
async function loadServiceTeamMembers() {
    const listContainer = $('#serviceTeamList');
    listContainer.empty();
    
    try {
        const serviceTeam = await getAllServiceTeamMembersFromFirebase();
        
        if (serviceTeam.length === 0) {
            listContainer.html('<p style="font-size: 1.4rem; color: #cccccc;">No service team members yet. Add your first member above.</p>');
            return;
        }

        serviceTeam.forEach(function(member) {
            const memberHtml = `
                <div class="admin-item-card">
                    <div class="admin-item-info" style="display: flex; align-items: center; gap: 2rem;">
                        ${member.image ? `<img src="${member.image}" alt="${member.name}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">` : '<div style="width: 80px; height: 80px; border-radius: 50%; background-color: #444444;"></div>'}
                        <div>
                            <h3>${member.name}</h3>
                            <p>${member.position}</p>
                        </div>
                    </div>
                    <div class="admin-item-actions">
                        <button class="admin-btn admin-btn-secondary" onclick="editServiceTeamMember('${member.id}')">Edit</button>
                        <button class="admin-btn admin-btn-danger" onclick="deleteServiceTeamMember('${member.id}')">Delete</button>
                    </div>
                </div>
            `;
            listContainer.append(memberHtml);
        });
    } catch (error) {
        console.error('Error loading service team members:', error);
        listContainer.html('<p style="font-size: 1.4rem; color: #dd4043;">Error loading service team. Please refresh the page.</p>');
    }
}

// Edit Service Team Member
async function editServiceTeamMember(id) {
    try {
        const serviceTeam = await getAllServiceTeamMembersFromFirebase();
        const member = serviceTeam.find(m => m.id === id);
        
        if (member) {
            $('#memberName').val(member.name);
            $('#memberPosition').val(member.position);
            if (member.image) {
                $('#memberImagePreview').html('<img src="' + member.image + '" alt="Preview">');
            }
            
            // Switch to service team section
            $('.admin-sidebar-item[data-section="about"]').click();
            setTimeout(() => {
                $('.admin-subsection-tab[data-subsection="service-team"]').click();
            }, 100);
            
            // Store editing ID
            $('#serviceTeamForm').data('editingId', id);
            $('#serviceTeamForm').data('existingImage', member.image);
        }
    } catch (error) {
        console.error('Error loading service team member for editing:', error);
        showMessage('serviceTeamMessage', 'Error loading member. Please try again.', 'error');
    }
}

// Update Service Team Member
async function updateServiceTeamMember(id) {
    const name = $('#memberName').val();
    const position = $('#memberPosition').val();
    const imageFile = $('#memberImage')[0].files[0];

    if (!name || !position) {
        showMessage('serviceTeamMessage', 'Please fill in all fields', 'error');
        return;
    }

    try {
        const serviceTeam = await getAllServiceTeamMembersFromFirebase();
        const member = serviceTeam.find(m => m.id === id);
        
        if (!member) {
            showMessage('serviceTeamMessage', 'Member not found', 'error');
            return;
        }

        const updatedMember = {
            name: name,
            position: position,
            image: member.image // Keep existing image by default
        };

        // Handle new image upload
        if (imageFile) {
            // Delete old image if it exists
            if (member.image) {
                try {
                    await deleteImageFromFirebaseStorage(member.image);
                } catch (error) {
                    console.warn('Could not delete old image:', error);
                }
            }
            
            // Upload new image
            const imagePath = `teams/service/${Date.now()}_${imageFile.name}`;
            updatedMember.image = await uploadImageToFirebaseStorage(imageFile, imagePath);
        }

        await updateServiceTeamMemberInFirebase(id, updatedMember);
        loadServiceTeamMembers();
        clearServiceTeamForm();
        showMessage('serviceTeamMessage', 'Service team member updated successfully!', 'success');
    } catch (error) {
        console.error('Error updating service team member:', error);
        showMessage('serviceTeamMessage', 'Error updating member. Please try again.', 'error');
    }
}

// Delete Service Team Member
async function deleteServiceTeamMember(id) {
    if (confirm('Are you sure you want to delete this service team member?')) {
        try {
            // Get the member first to delete their image from storage
            const serviceTeam = await getAllServiceTeamMembersFromFirebase();
            const member = serviceTeam.find(m => m.id === id);
            
            if (member && member.image) {
                try {
                    await deleteImageFromFirebaseStorage(member.image);
                } catch (error) {
                    console.warn('Could not delete image from storage:', error);
                }
            }
            
            await deleteServiceTeamMemberFromFirebase(id);
            loadServiceTeamMembers();
            showMessage('serviceTeamMessage', 'Service team member deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting service team member:', error);
            showMessage('serviceTeamMessage', 'Error deleting member. Please try again.', 'error');
        }
    }
}

// Clear Service Team Form
function clearServiceTeamForm() {
    $('#serviceTeamForm')[0].reset();
    $('#memberImagePreview').empty();
    $('#serviceTeamForm').removeData('editingId');
}

// Update About Page Service Team
function updateAboutPageServiceTeam() {
    const serviceTeam = JSON.parse(localStorage.getItem('serviceTeam') || '[]');
    localStorage.setItem('aboutPageServiceTeamUpdated', Date.now().toString());
}

// CLC Team Functions
async function saveCLCTeamMember() {
    const name = $('#clcMemberName').val();
    const position = $('#clcMemberPosition').val();
    const imageFile = $('#clcMemberImage')[0].files[0];

    if (!name || !position) {
        showMessage('clcTeamMessage', 'Please fill in all fields', 'error');
        return;
    }

    if (!imageFile) {
        showMessage('clcTeamMessage', 'Please upload a profile image', 'error');
        return;
    }

    try {
        // Upload image to Cloudinary
        const imagePath = `teams/clc/${Date.now()}_${imageFile.name}`;
        const imageUrl = await uploadImageToFirebaseStorage(imageFile, imagePath); // Actually uses Cloudinary
        
        const newMember = {
            name: name,
            position: position,
            image: imageUrl
        };

        await saveCLCTeamMemberToFirebase(newMember);
        loadCLCTeamMembers();
        clearCLCTeamForm();
        showMessage('clcTeamMessage', 'CLC team member saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving CLC team member:', error);
        showMessage('clcTeamMessage', 'Error saving member. Please try again.', 'error');
    }
}

async function loadCLCTeamMembers() {
    const listContainer = $('#clcTeamList');
    listContainer.empty();
    
    try {
        const clcTeam = await getAllCLCTeamMembersFromFirebase();
        
        if (clcTeam.length === 0) {
            listContainer.html('<p style="font-size: 1.4rem; color: #cccccc;">No CLC team members yet. Add your first member above.</p>');
            return;
        }

        clcTeam.forEach(function(member) {
            const memberHtml = `
                <div class="admin-item-card">
                    <div class="admin-item-info" style="display: flex; align-items: center; gap: 2rem;">
                        ${member.image ? `<img src="${member.image}" alt="${member.name}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">` : '<div style="width: 80px; height: 80px; border-radius: 50%; background-color: #444444;"></div>'}
                        <div>
                            <h3>${member.name}</h3>
                            <p>${member.position}</p>
                        </div>
                    </div>
                    <div class="admin-item-actions">
                        <button class="admin-btn admin-btn-secondary" onclick="editCLCTeamMember('${member.id}')">Edit</button>
                        <button class="admin-btn admin-btn-danger" onclick="deleteCLCTeamMember('${member.id}')">Delete</button>
                    </div>
                </div>
            `;
            listContainer.append(memberHtml);
        });
    } catch (error) {
        console.error('Error loading CLC team members:', error);
        listContainer.html('<p style="font-size: 1.4rem; color: #dd4043;">Error loading CLC team. Please refresh the page.</p>');
    }
}

async function editCLCTeamMember(id) {
    try {
        const clcTeam = await getAllCLCTeamMembersFromFirebase();
        const member = clcTeam.find(m => m.id === id);
        
        if (member) {
            $('#clcMemberName').val(member.name);
            $('#clcMemberPosition').val(member.position);
            if (member.image) {
                $('#clcMemberImagePreview').html('<img src="' + member.image + '" alt="Preview">');
            }
            $('.admin-sidebar-item[data-section="service-teams"]').click();
            setTimeout(() => {
                $('.admin-subsection-tab[data-subsection="clc-team"]').click();
            }, 100);
            $('#clcTeamForm').data('editingId', id);
            $('#clcTeamForm').data('existingImage', member.image);
        }
    } catch (error) {
        console.error('Error loading CLC team member for editing:', error);
        showMessage('clcTeamMessage', 'Error loading member. Please try again.', 'error');
    }
}

async function updateCLCTeamMember(id) {
    const name = $('#clcMemberName').val();
    const position = $('#clcMemberPosition').val();
    const imageFile = $('#clcMemberImage')[0].files[0];

    if (!name || !position) {
        showMessage('clcTeamMessage', 'Please fill in all fields', 'error');
        return;
    }

    try {
        const clcTeam = await getAllCLCTeamMembersFromFirebase();
        const member = clcTeam.find(m => m.id === id);
        
        if (!member) {
            showMessage('clcTeamMessage', 'Member not found', 'error');
            return;
        }

        const updatedMember = {
            name: name,
            position: position,
            image: member.image // Keep existing image by default
        };

        // Handle new image upload
        if (imageFile) {
            // Delete old image if it exists
            if (member.image) {
                try {
                    await deleteImageFromFirebaseStorage(member.image);
                } catch (error) {
                    console.warn('Could not delete old image:', error);
                }
            }
            
            // Upload new image to Cloudinary
            const imagePath = `teams/clc/${Date.now()}_${imageFile.name}`;
            updatedMember.image = await uploadImageToFirebaseStorage(imageFile, imagePath);
        }

        await updateCLCTeamMemberInFirebase(id, updatedMember);
        loadCLCTeamMembers();
        clearCLCTeamForm();
        showMessage('clcTeamMessage', 'CLC team member updated successfully!', 'success');
    } catch (error) {
        console.error('Error updating CLC team member:', error);
        showMessage('clcTeamMessage', 'Error updating member. Please try again.', 'error');
    }
}

async function deleteCLCTeamMember(id) {
    if (confirm('Are you sure you want to delete this CLC team member?')) {
        try {
            // Get the member first to delete their image from Cloudinary
            const clcTeam = await getAllCLCTeamMembersFromFirebase();
            const member = clcTeam.find(m => m.id === id);
            
            if (member && member.image) {
                try {
                    await deleteImageFromFirebaseStorage(member.image);
                } catch (error) {
                    console.warn('Could not delete image from Cloudinary:', error);
                }
            }
            
            await deleteCLCTeamMemberFromFirebase(id);
            loadCLCTeamMembers();
            showMessage('clcTeamMessage', 'CLC team member deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting CLC team member:', error);
            showMessage('clcTeamMessage', 'Error deleting member. Please try again.', 'error');
        }
    }
}

function clearCLCTeamForm() {
    $('#clcTeamForm')[0].reset();
    $('#clcMemberImagePreview').empty();
    $('#clcTeamForm').removeData('editingId');
    $('#clcTeamForm').removeData('existingImage');
}

// KCYM Team Functions
async function saveKCYMTeamMember() {
    const name = $('#kcymMemberName').val();
    const position = $('#kcymMemberPosition').val();
    const imageFile = $('#kcymMemberImage')[0].files[0];

    if (!name || !position) {
        showMessage('kcymTeamMessage', 'Please fill in all fields', 'error');
        return;
    }

    if (!imageFile) {
        showMessage('kcymTeamMessage', 'Please upload a profile image', 'error');
        return;
    }

    try {
        // Upload image to Cloudinary
        const imagePath = `teams/kcym/${Date.now()}_${imageFile.name}`;
        const imageUrl = await uploadImageToFirebaseStorage(imageFile, imagePath); // Actually uses Cloudinary
        
        const newMember = {
            name: name,
            position: position,
            image: imageUrl
        };

        await saveKCYMTeamMemberToFirebase(newMember);
        loadKCYMTeamMembers();
        clearKCYMTeamForm();
        showMessage('kcymTeamMessage', 'KCYM team member saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving KCYM team member:', error);
        showMessage('kcymTeamMessage', 'Error saving member. Please try again.', 'error');
    }
}

async function loadKCYMTeamMembers() {
    const listContainer = $('#kcymTeamList');
    listContainer.empty();
    
    try {
        const kcymTeam = await getAllKCYMTeamMembersFromFirebase();
        
        if (kcymTeam.length === 0) {
            listContainer.html('<p style="font-size: 1.4rem; color: #cccccc;">No KCYM team members yet. Add your first member above.</p>');
            return;
        }

        kcymTeam.forEach(function(member) {
            const memberHtml = `
                <div class="admin-item-card">
                    <div class="admin-item-info" style="display: flex; align-items: center; gap: 2rem;">
                        ${member.image ? `<img src="${member.image}" alt="${member.name}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">` : '<div style="width: 80px; height: 80px; border-radius: 50%; background-color: #444444;"></div>'}
                        <div>
                            <h3>${member.name}</h3>
                            <p>${member.position}</p>
                        </div>
                    </div>
                    <div class="admin-item-actions">
                        <button class="admin-btn admin-btn-secondary" onclick="editKCYMTeamMember('${member.id}')">Edit</button>
                        <button class="admin-btn admin-btn-danger" onclick="deleteKCYMTeamMember('${member.id}')">Delete</button>
                    </div>
                </div>
            `;
            listContainer.append(memberHtml);
        });
    } catch (error) {
        console.error('Error loading KCYM team members:', error);
        listContainer.html('<p style="font-size: 1.4rem; color: #dd4043;">Error loading KCYM team. Please refresh the page.</p>');
    }
}

async function editKCYMTeamMember(id) {
    try {
        const kcymTeam = await getAllKCYMTeamMembersFromFirebase();
        const member = kcymTeam.find(m => m.id === id);
        
        if (member) {
            $('#kcymMemberName').val(member.name);
            $('#kcymMemberPosition').val(member.position);
            if (member.image) {
                $('#kcymMemberImagePreview').html('<img src="' + member.image + '" alt="Preview">');
            }
            $('.admin-sidebar-item[data-section="service-teams"]').click();
            setTimeout(() => {
                $('.admin-subsection-tab[data-subsection="kcym-team"]').click();
            }, 100);
            $('#kcymTeamForm').data('editingId', id);
            $('#kcymTeamForm').data('existingImage', member.image);
        }
    } catch (error) {
        console.error('Error loading KCYM team member for editing:', error);
        showMessage('kcymTeamMessage', 'Error loading member. Please try again.', 'error');
    }
}

async function updateKCYMTeamMember(id) {
    const name = $('#kcymMemberName').val();
    const position = $('#kcymMemberPosition').val();
    const imageFile = $('#kcymMemberImage')[0].files[0];

    if (!name || !position) {
        showMessage('kcymTeamMessage', 'Please fill in all fields', 'error');
        return;
    }

    try {
        const kcymTeam = await getAllKCYMTeamMembersFromFirebase();
        const member = kcymTeam.find(m => m.id === id);
        
        if (!member) {
            showMessage('kcymTeamMessage', 'Member not found', 'error');
            return;
        }

        const updatedMember = {
            name: name,
            position: position,
            image: member.image // Keep existing image by default
        };

        // Handle new image upload
        if (imageFile) {
            // Delete old image if it exists
            if (member.image) {
                try {
                    await deleteImageFromFirebaseStorage(member.image);
                } catch (error) {
                    console.warn('Could not delete old image:', error);
                }
            }
            
            // Upload new image to Cloudinary
            const imagePath = `teams/kcym/${Date.now()}_${imageFile.name}`;
            updatedMember.image = await uploadImageToFirebaseStorage(imageFile, imagePath);
        }

        await updateKCYMTeamMemberInFirebase(id, updatedMember);
        loadKCYMTeamMembers();
        clearKCYMTeamForm();
        showMessage('kcymTeamMessage', 'KCYM team member updated successfully!', 'success');
    } catch (error) {
        console.error('Error updating KCYM team member:', error);
        showMessage('kcymTeamMessage', 'Error updating member. Please try again.', 'error');
    }
}

async function deleteKCYMTeamMember(id) {
    if (confirm('Are you sure you want to delete this KCYM team member?')) {
        try {
            // Get the member first to delete their image from Cloudinary
            const kcymTeam = await getAllKCYMTeamMembersFromFirebase();
            const member = kcymTeam.find(m => m.id === id);
            
            if (member && member.image) {
                try {
                    await deleteImageFromFirebaseStorage(member.image);
                } catch (error) {
                    console.warn('Could not delete image from Cloudinary:', error);
                }
            }
            
            await deleteKCYMTeamMemberFromFirebase(id);
            loadKCYMTeamMembers();
            showMessage('kcymTeamMessage', 'KCYM team member deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting KCYM team member:', error);
            showMessage('kcymTeamMessage', 'Error deleting member. Please try again.', 'error');
        }
    }
}

function clearKCYMTeamForm() {
    $('#kcymTeamForm')[0].reset();
    $('#kcymMemberImagePreview').empty();
    $('#kcymTeamForm').removeData('editingId');
    $('#kcymTeamForm').removeData('existingImage');
}

// Mathrusangam Team Functions
async function saveMathrusangamTeamMember() {
    const name = $('#mathrusangamMemberName').val();
    const position = $('#mathrusangamMemberPosition').val();
    const imageFile = $('#mathrusangamMemberImage')[0].files[0];

    if (!name || !position) {
        showMessage('mathrusangamTeamMessage', 'Please fill in all fields', 'error');
        return;
    }

    if (!imageFile) {
        showMessage('mathrusangamTeamMessage', 'Please upload a profile image', 'error');
        return;
    }

    try {
        // Upload image to Cloudinary
        const imagePath = `teams/mathrusangam/${Date.now()}_${imageFile.name}`;
        const imageUrl = await uploadImageToFirebaseStorage(imageFile, imagePath); // Actually uses Cloudinary
        
        const newMember = {
            name: name,
            position: position,
            image: imageUrl
        };

        await saveMathrusangamTeamMemberToFirebase(newMember);
        loadMathrusangamTeamMembers();
        clearMathrusangamTeamForm();
        showMessage('mathrusangamTeamMessage', 'Mathrusangam team member saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving Mathrusangam team member:', error);
        showMessage('mathrusangamTeamMessage', 'Error saving member. Please try again.', 'error');
    }
}

async function loadMathrusangamTeamMembers() {
    const listContainer = $('#mathrusangamTeamList');
    listContainer.empty();
    
    try {
        const mathrusangamTeam = await getAllMathrusangamTeamMembersFromFirebase();
        
        if (mathrusangamTeam.length === 0) {
            listContainer.html('<p style="font-size: 1.4rem; color: #cccccc;">No Mathrusangam team members yet. Add your first member above.</p>');
            return;
        }

        mathrusangamTeam.forEach(function(member) {
            const memberHtml = `
                <div class="admin-item-card">
                    <div class="admin-item-info" style="display: flex; align-items: center; gap: 2rem;">
                        ${member.image ? `<img src="${member.image}" alt="${member.name}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">` : '<div style="width: 80px; height: 80px; border-radius: 50%; background-color: #444444;"></div>'}
                        <div>
                            <h3>${member.name}</h3>
                            <p>${member.position}</p>
                        </div>
                    </div>
                    <div class="admin-item-actions">
                        <button class="admin-btn admin-btn-secondary" onclick="editMathrusangamTeamMember('${member.id}')">Edit</button>
                        <button class="admin-btn admin-btn-danger" onclick="deleteMathrusangamTeamMember('${member.id}')">Delete</button>
                    </div>
                </div>
            `;
            listContainer.append(memberHtml);
        });
    } catch (error) {
        console.error('Error loading Mathrusangam team members:', error);
        listContainer.html('<p style="font-size: 1.4rem; color: #dd4043;">Error loading Mathrusangam team. Please refresh the page.</p>');
    }
}

async function editMathrusangamTeamMember(id) {
    try {
        const mathrusangamTeam = await getAllMathrusangamTeamMembersFromFirebase();
        const member = mathrusangamTeam.find(m => m.id === id);
        
        if (member) {
            $('#mathrusangamMemberName').val(member.name);
            $('#mathrusangamMemberPosition').val(member.position);
            if (member.image) {
                $('#mathrusangamMemberImagePreview').html('<img src="' + member.image + '" alt="Preview">');
            }
            $('.admin-sidebar-item[data-section="service-teams"]').click();
            setTimeout(() => {
                $('.admin-subsection-tab[data-subsection="mathrusangam-team"]').click();
            }, 100);
            $('#mathrusangamTeamForm').data('editingId', id);
            $('#mathrusangamTeamForm').data('existingImage', member.image);
        }
    } catch (error) {
        console.error('Error loading Mathrusangam team member for editing:', error);
        showMessage('mathrusangamTeamMessage', 'Error loading member. Please try again.', 'error');
    }
}

async function updateMathrusangamTeamMember(id) {
    const name = $('#mathrusangamMemberName').val();
    const position = $('#mathrusangamMemberPosition').val();
    const imageFile = $('#mathrusangamMemberImage')[0].files[0];

    if (!name || !position) {
        showMessage('mathrusangamTeamMessage', 'Please fill in all fields', 'error');
        return;
    }

    try {
        const mathrusangamTeam = await getAllMathrusangamTeamMembersFromFirebase();
        const member = mathrusangamTeam.find(m => m.id === id);
        
        if (!member) {
            showMessage('mathrusangamTeamMessage', 'Member not found', 'error');
            return;
        }

        const updatedMember = {
            name: name,
            position: position,
            image: member.image // Keep existing image by default
        };

        // Handle new image upload
        if (imageFile) {
            // Delete old image if it exists
            if (member.image) {
                try {
                    await deleteImageFromFirebaseStorage(member.image);
                } catch (error) {
                    console.warn('Could not delete old image:', error);
                }
            }
            
            // Upload new image to Cloudinary
            const imagePath = `teams/mathrusangam/${Date.now()}_${imageFile.name}`;
            updatedMember.image = await uploadImageToFirebaseStorage(imageFile, imagePath);
        }

        await updateMathrusangamTeamMemberInFirebase(id, updatedMember);
        loadMathrusangamTeamMembers();
        clearMathrusangamTeamForm();
        showMessage('mathrusangamTeamMessage', 'Mathrusangam team member updated successfully!', 'success');
    } catch (error) {
        console.error('Error updating Mathrusangam team member:', error);
        showMessage('mathrusangamTeamMessage', 'Error updating member. Please try again.', 'error');
    }
}

async function deleteMathrusangamTeamMember(id) {
    if (confirm('Are you sure you want to delete this Mathrusangam team member?')) {
        try {
            // Get the member first to delete their image from Cloudinary
            const mathrusangamTeam = await getAllMathrusangamTeamMembersFromFirebase();
            const member = mathrusangamTeam.find(m => m.id === id);
            
            if (member && member.image) {
                try {
                    await deleteImageFromFirebaseStorage(member.image);
                } catch (error) {
                    console.warn('Could not delete image from Cloudinary:', error);
                }
            }
            
            await deleteMathrusangamTeamMemberFromFirebase(id);
            loadMathrusangamTeamMembers();
            showMessage('mathrusangamTeamMessage', 'Mathrusangam team member deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting Mathrusangam team member:', error);
            showMessage('mathrusangamTeamMessage', 'Error deleting member. Please try again.', 'error');
        }
    }
}

function clearMathrusangamTeamForm() {
    $('#mathrusangamTeamForm')[0].reset();
    $('#mathrusangamMemberImagePreview').empty();
    $('#mathrusangamTeamForm').removeData('editingId');
    $('#mathrusangamTeamForm').removeData('existingImage');
}

// Choir Team Functions
async function saveChoirTeamMember() {
    const name = $('#choirMemberName').val();
    const position = $('#choirMemberPosition').val();
    const imageFile = $('#choirMemberImage')[0].files[0];

    if (!name || !position) {
        showMessage('choirTeamMessage', 'Please fill in all fields', 'error');
        return;
    }

    if (!imageFile) {
        showMessage('choirTeamMessage', 'Please upload a profile image', 'error');
        return;
    }

    try {
        // Upload image to Cloudinary
        const imagePath = `teams/choir/${Date.now()}_${imageFile.name}`;
        const imageUrl = await uploadImageToFirebaseStorage(imageFile, imagePath); // Actually uses Cloudinary
        
        const newMember = {
            name: name,
            position: position,
            image: imageUrl
        };

        await saveChoirTeamMemberToFirebase(newMember);
        loadChoirTeamMembers();
        clearChoirTeamForm();
        showMessage('choirTeamMessage', 'Choir team member saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving Choir team member:', error);
        showMessage('choirTeamMessage', 'Error saving member. Please try again.', 'error');
    }
}

async function loadChoirTeamMembers() {
    const listContainer = $('#choirTeamList');
    listContainer.empty();
    
    try {
        const choirTeam = await getAllChoirTeamMembersFromFirebase();
        
        if (choirTeam.length === 0) {
            listContainer.html('<p style="font-size: 1.4rem; color: #cccccc;">No choir team members yet. Add your first member above.</p>');
            return;
        }
        
        choirTeam.forEach(function(member) {
            const memberHtml = `
                <div class="admin-item-card">
                    <div class="admin-item-info" style="display: flex; align-items: center; gap: 2rem;">
                        ${member.image ? `<img src="${member.image}" alt="${member.name}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">` : '<div style="width: 100px; height: 100px; border-radius: 50%; background-color: #444444;"></div>'}
                        <div style="flex: 1;">
                            <h3>${member.name}</h3>
                            <p>${member.position}</p>
                        </div>
                    </div>
                    <div class="admin-item-actions">
                        <button class="admin-btn admin-btn-secondary" onclick="editChoirTeamMember('${member.id}')">Edit</button>
                        <button class="admin-btn admin-btn-danger" onclick="deleteChoirTeamMember('${member.id}')">Delete</button>
                    </div>
                </div>
            `;
            listContainer.append(memberHtml);
        });
    } catch (error) {
        console.error('Error loading Choir team members:', error);
        listContainer.html('<p style="font-size: 1.4rem; color: #dd4043;">Error loading Choir team. Please refresh the page.</p>');
    }
}

async function editChoirTeamMember(id) {
    try {
        const choirTeam = await getAllChoirTeamMembersFromFirebase();
        const member = choirTeam.find(m => m.id === id);
        
        if (member) {
            $('#choirMemberName').val(member.name);
            $('#choirMemberPosition').val(member.position);
            if (member.image) {
                $('#choirMemberImagePreview').html('<img src="' + member.image + '" alt="Preview">');
            }
            
            // Switch to choir team section
            $('.admin-sidebar-item[data-section="service-teams"]').click();
            setTimeout(function() {
                $('.admin-subsection-tab[data-subsection="choir-team"]').click();
            }, 100);
            
            // Store editing ID
            $('#choirTeamForm').data('editingId', id);
            $('#choirTeamForm').data('existingImage', member.image);
        }
    } catch (error) {
        console.error('Error loading Choir team member for editing:', error);
        showMessage('choirTeamMessage', 'Error loading member. Please try again.', 'error');
    }
}

async function updateChoirTeamMember(id) {
    const name = $('#choirMemberName').val();
    const position = $('#choirMemberPosition').val();
    const imageFile = $('#choirMemberImage')[0].files[0];

    if (!name || !position) {
        showMessage('choirTeamMessage', 'Please fill in all fields', 'error');
        return;
    }

    try {
        const choirTeam = await getAllChoirTeamMembersFromFirebase();
        const member = choirTeam.find(m => m.id === id);
        
        if (!member) {
            showMessage('choirTeamMessage', 'Member not found', 'error');
            return;
        }

        const updatedMember = {
            name: name,
            position: position,
            image: member.image // Keep existing image by default
        };

        // Handle new image upload
        if (imageFile) {
            // Delete old image if it exists
            if (member.image) {
                try {
                    await deleteImageFromFirebaseStorage(member.image);
                } catch (error) {
                    console.warn('Could not delete old image:', error);
                }
            }
            
            // Upload new image to Cloudinary
            const imagePath = `teams/choir/${Date.now()}_${imageFile.name}`;
            updatedMember.image = await uploadImageToFirebaseStorage(imageFile, imagePath);
        }

        await updateChoirTeamMemberInFirebase(id, updatedMember);
        loadChoirTeamMembers();
        clearChoirTeamForm();
        showMessage('choirTeamMessage', 'Choir team member updated successfully!', 'success');
    } catch (error) {
        console.error('Error updating Choir team member:', error);
        showMessage('choirTeamMessage', 'Error updating member. Please try again.', 'error');
    }
}

async function deleteChoirTeamMember(id) {
    if (confirm('Are you sure you want to delete this choir team member?')) {
        try {
            // Get the member first to delete their image from Cloudinary
            const choirTeam = await getAllChoirTeamMembersFromFirebase();
            const member = choirTeam.find(m => m.id === id);
            
            if (member && member.image) {
                try {
                    await deleteImageFromFirebaseStorage(member.image);
                } catch (error) {
                    console.warn('Could not delete image from Cloudinary:', error);
                }
            }
            
            await deleteChoirTeamMemberFromFirebase(id);
            loadChoirTeamMembers();
            showMessage('choirTeamMessage', 'Choir team member deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting Choir team member:', error);
            showMessage('choirTeamMessage', 'Error deleting member. Please try again.', 'error');
        }
    }
}

function clearChoirTeamForm() {
    $('#choirMemberName').val('');
    $('#choirMemberPosition').val('');
    $('#choirMemberImage').val('');
    $('#choirMemberImagePreview').empty();
    $('#choirTeamForm').removeData('editingId');
    $('#choirTeamForm').removeData('existingImage');
}

// Preview Multiple Images
function previewMultipleImages(files, previewId) {
    const preview = $('#' + previewId);
    preview.empty();
    
    if (files && files.length > 0) {
        Array.from(files).forEach(function(file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.append('<img src="' + e.target.result + '" alt="Preview" style="max-width: 150px; max-height: 150px; border-radius: 4px; margin: 0.5rem;">');
            };
            reader.readAsDataURL(file);
        });
    }
}

// Save Event
async function saveEvent() {
    const name = $('#eventName').val();
    const date = $('#eventDate').val();
    const description = $('#eventDescription').val();
    const photoFiles = $('#eventPhotos')[0].files;
    const videosText = $('#eventVideos').val();

    if (!name || !date || !description) {
        showMessage('eventsMessage', 'Please fill in all required fields', 'error');
        return;
    }

    const newEvent = {
        name: name,
        date: date,
        description: description,
        photos: [],
        videos: []
    };

    // Process videos
    if (videosText) {
        const videoUrls = videosText.split('\n').filter(function(url) {
            return url.trim().length > 0;
        });
        newEvent.videos = videoUrls;
    }

    try {
        // Process photos - upload to Cloudinary (not Firebase Storage)
        if (photoFiles && photoFiles.length > 0) {
            const photoPromises = Array.from(photoFiles).map(function(file) {
                const imagePath = `events/${Date.now()}_${file.name}`;
                return uploadImageToFirebaseStorage(file, imagePath); // Actually uses Cloudinary
            });

            newEvent.photos = await Promise.all(photoPromises);
        }

        // Save to Firebase
        await saveEventToFirebase(newEvent);
        loadEvents();
        clearEventsForm();
        showMessage('eventsMessage', 'Event saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving event:', error);
        showMessage('eventsMessage', 'Error saving event. Please try again.', 'error');
    }
}

// Load Events
async function loadEvents() {
    const listContainer = $('#eventsList');
    listContainer.empty();
    
    try {
        const events = await getAllEventsFromFirebase();
        
        if (events.length === 0) {
            listContainer.html('<p style="font-size: 1.4rem; color: #cccccc;">No events yet. Create your first event above.</p>');
            return;
        }

        events.forEach(function(event) {
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            const mainImage = event.photos && event.photos.length > 0 ? event.photos[0] : '';
            
            const eventHtml = `
                <div class="admin-item-card">
                    <div class="admin-item-info" style="display: flex; align-items: center; gap: 2rem;">
                        ${mainImage ? `<img src="${mainImage}" alt="${event.name}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 4px;">` : '<div style="width: 120px; height: 120px; background-color: #444444; border-radius: 4px;"></div>'}
                        <div style="flex: 1;">
                            <h3>${event.name}</h3>
                            <p>${formattedDate}</p>
                            <p style="font-size: 1.2rem; color: #aaaaaa; margin-top: 0.5rem;">${event.description.substring(0, 100)}${event.description.length > 100 ? '...' : ''}</p>
                            <p style="font-size: 1.2rem; color: #aaaaaa; margin-top: 0.5rem;">
                                ${event.photos ? event.photos.length : 0} Photo${event.photos && event.photos.length !== 1 ? 's' : ''} | 
                                ${event.videos ? event.videos.length : 0} Video${event.videos && event.videos.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>
                    <div class="admin-item-actions">
                        <button class="admin-btn admin-btn-secondary" onclick="editEvent('${event.id}')">Edit</button>
                        <button class="admin-btn admin-btn-danger" onclick="deleteEvent('${event.id}')">Delete</button>
                    </div>
                </div>
            `;
            listContainer.append(eventHtml);
        });
    } catch (error) {
        console.error('Error loading events:', error);
        listContainer.html('<p style="font-size: 1.4rem; color: #dd4043;">Error loading events. Please refresh the page.</p>');
    }
}

// Edit Event
async function editEvent(id) {
    try {
        const events = await getAllEventsFromFirebase();
        const event = events.find(e => e.id === id);
        
        if (event) {
            $('#eventName').val(event.name);
            $('#eventDate').val(event.date);
            $('#eventDescription').val(event.description);
            
            // Display existing photos
            const photosPreview = $('#eventPhotosPreview');
            photosPreview.empty();
            if (event.photos && event.photos.length > 0) {
                event.photos.forEach(function(photo) {
                    photosPreview.append('<img src="' + photo + '" alt="Preview" style="max-width: 150px; max-height: 150px; border-radius: 4px; margin: 0.5rem;">');
                });
            }
            
            // Display existing videos
            if (event.videos && event.videos.length > 0) {
                $('#eventVideos').val(event.videos.join('\n'));
            }
            
            // Switch to events section
            $('.admin-sidebar-item[data-section="events"]').click();
            
            // Store editing ID
            $('#eventsForm').data('editingId', id);
            $('#eventsForm').data('existingPhotos', event.photos || []);
        }
    } catch (error) {
        console.error('Error loading event for editing:', error);
        showMessage('eventsMessage', 'Error loading event. Please try again.', 'error');
    }
}

// Update Event
async function updateEvent(id) {
    const name = $('#eventName').val();
    const date = $('#eventDate').val();
    const description = $('#eventDescription').val();
    const photoFiles = $('#eventPhotos')[0].files;
    const videosText = $('#eventVideos').val();

    if (!name || !date || !description) {
        showMessage('eventsMessage', 'Please fill in all required fields', 'error');
        return;
    }

    try {
        const events = await getAllEventsFromFirebase();
        const event = events.find(e => e.id === id);
        
        if (!event) {
            showMessage('eventsMessage', 'Event not found', 'error');
            return;
        }

        const updatedEvent = {
            name: name,
            date: date,
            description: description,
            photos: event.photos || [], // Keep existing photos by default
            videos: []
        };

        // Process videos
        if (videosText) {
            const videoUrls = videosText.split('\n').filter(function(url) {
                return url.trim().length > 0;
            });
            updatedEvent.videos = videoUrls;
        }

        // Process photos - upload new ones and merge with existing
        if (photoFiles && photoFiles.length > 0) {
            const existingPhotos = $('#eventsForm').data('existingPhotos') || [];
            const newPhotoPromises = Array.from(photoFiles).map(function(file) {
                const imagePath = `events/${Date.now()}_${file.name}`;
                return uploadImageToFirebaseStorage(file, imagePath);
            });

            const newPhotos = await Promise.all(newPhotoPromises);
            updatedEvent.photos = existingPhotos.concat(newPhotos);
        }

        await updateEventInFirebase(id, updatedEvent);
        loadEvents();
        clearEventsForm();
        showMessage('eventsMessage', 'Event updated successfully!', 'success');
    } catch (error) {
        console.error('Error updating event:', error);
        showMessage('eventsMessage', 'Error updating event. Please try again.', 'error');
    }
}

// Delete Event
async function deleteEvent(id) {
    if (confirm('Are you sure you want to delete this event?')) {
        try {
            // Get the event first to delete its photos from storage
            const events = await getAllEventsFromFirebase();
            const event = events.find(e => e.id === id);
            
            if (event && event.photos && event.photos.length > 0) {
                // Delete all photos from storage
                for (const photoUrl of event.photos) {
                    try {
                        await deleteImageFromFirebaseStorage(photoUrl);
                    } catch (error) {
                        console.warn('Could not delete photo from storage:', error);
                    }
                }
            }
            
            await deleteEventFromFirebase(id);
            loadEvents();
            showMessage('eventsMessage', 'Event deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting event:', error);
            showMessage('eventsMessage', 'Error deleting event. Please try again.', 'error');
        }
    }
}

// Clear Events Form
function clearEventsForm() {
    $('#eventsForm')[0].reset();
    $('#eventPhotosPreview').empty();
    $('#eventsForm').removeData('editingId');
    $('#eventsForm').removeData('existingPhotos');
}

// Update Events Page
function updateEventsPage() {
    localStorage.setItem('eventsPageUpdated', Date.now().toString());
}

// Father Profile Functions
async function saveFatherProfile() {
    const name = $('#fatherName').val();
    const imageFile = $('#fatherImage')[0].files[0];

    if (!name) {
        showMessage('fatherProfileMessage', 'Please enter the Father\'s name', 'error');
        return;
    }

    try {
        const fatherProfile = {
            name: name,
            image: null
        };

        if (imageFile) {
            // Upload image to Cloudinary
            const imagePath = `father/${Date.now()}_${imageFile.name}`;
            fatherProfile.image = await uploadImageToFirebaseStorage(imageFile, imagePath); // Actually uses Cloudinary
        } else {
            // Check if there's an existing image in Firebase
            const existing = await getFatherProfileFromFirebase();
            if (existing && existing.image) {
                fatherProfile.image = existing.image;
            } else {
                showMessage('fatherProfileMessage', 'Please upload an image', 'error');
                return;
            }
        }

        await saveFatherProfileToFirebase(fatherProfile);
        loadFatherProfile();
        clearFatherProfileForm();
        showMessage('fatherProfileMessage', 'Father profile saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving father profile:', error);
        showMessage('fatherProfileMessage', 'Error saving profile. Please try again.', 'error');
    }
}

async function loadFatherProfile() {
    const displayContainer = $('#fatherProfileDisplay');
    const actionsContainer = $('#fatherProfileActions');
    
    try {
        const fatherProfile = await getFatherProfileFromFirebase();
        
        if (!fatherProfile || (!fatherProfile.name && !fatherProfile.image)) {
            displayContainer.html('<p style="font-size: 1.4rem; color: #cccccc; text-align: center; padding: 2rem;">No Father profile set yet. Add the Father\'s information above.</p>');
            actionsContainer.empty();
            return;
        }
        
        const displayHtml = `
            <div style="display: flex; align-items: center; gap: 3rem; flex-wrap: wrap;">
                ${fatherProfile.image ? `
                <div>
                    <img src="${fatherProfile.image}" alt="${fatherProfile.name || 'Father'}" style="width: 200px; height: 200px; border-radius: 50%; object-fit: cover; border: 4px solid #ffffff;">
                </div>
                ` : '<div style="width: 200px; height: 200px; border-radius: 50%; background-color: #444444; border: 4px solid #ffffff;"></div>'}
                <div style="flex: 1;">
                    <h3 style="font-family: \'Montserrat\', sans-serif; font-size: 2.4rem; font-weight: 700; color: #ffffff; margin-bottom: 1rem;">
                        ${fatherProfile.name || 'Not Set'}
                    </h3>
                    <p style="font-size: 1.6rem; color: #cccccc;">Father</p>
                </div>
            </div>
        `;
        displayContainer.html(displayHtml);
        
        // Add Edit and Delete buttons
        const actionsHtml = `
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="admin-btn admin-btn-secondary" onclick="editFatherProfile()">Edit</button>
                <button class="admin-btn admin-btn-danger" onclick="deleteFatherProfile()">Delete</button>
            </div>
        `;
        actionsContainer.html(actionsHtml);
        
        // Load into form if exists
        if (fatherProfile.name) {
            $('#fatherName').val(fatherProfile.name);
        }
        if (fatherProfile.image) {
            $('#fatherImagePreview').html('<img src="' + fatherProfile.image + '" alt="Preview">');
        }
    } catch (error) {
        console.error('Error loading father profile:', error);
        displayContainer.html('<p style="font-size: 1.4rem; color: #dd4043; text-align: center; padding: 2rem;">Error loading Father profile. Please refresh the page.</p>');
        actionsContainer.empty();
    }
}

async function editFatherProfile() {
    try {
        const fatherProfile = await getFatherProfileFromFirebase();
        
        if (fatherProfile) {
            if (fatherProfile.name) {
                $('#fatherName').val(fatherProfile.name);
            }
            if (fatherProfile.image) {
                $('#fatherImagePreview').html('<img src="' + fatherProfile.image + '" alt="Preview">');
            }
        }
        
        // Scroll to form
        $('html, body').animate({
            scrollTop: $('#fatherProfileForm').offset().top - 100
        }, 500);
    } catch (error) {
        console.error('Error loading father profile for editing:', error);
        showMessage('fatherProfileMessage', 'Error loading profile. Please try again.', 'error');
    }
}

async function deleteFatherProfile() {
    if (confirm('Are you sure you want to delete the Father profile? This will remove it from the About page.')) {
        try {
            // Get the profile first to delete the image from Cloudinary
            const fatherProfile = await getFatherProfileFromFirebase();
            
            if (fatherProfile && fatherProfile.image) {
                try {
                    await deleteImageFromFirebaseStorage(fatherProfile.image);
                } catch (error) {
                    console.warn('Could not delete image from Cloudinary:', error);
                }
            }
            
            await deleteFatherProfileFromFirebase();
            loadFatherProfile();
            clearFatherProfileForm();
            showMessage('fatherProfileMessage', 'Father profile deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting father profile:', error);
            showMessage('fatherProfileMessage', 'Error deleting profile. Please try again.', 'error');
        }
    }
}

function clearFatherProfileForm() {
    // Don't clear the form completely, just reset file input
    $('#fatherImage').val('');
    // Note: Name and image preview will be loaded from Firebase when loadFatherProfile() is called
}

// Church Images Functions
async function saveChurchImage() {
    const title = $('#imageTitle').val();
    const imageFile = $('#churchImage')[0].files[0];

    if (!imageFile) {
        showMessage('churchImagesMessage', 'Please select an image to upload', 'error');
        return;
    }

    try {
        // Upload image to Cloudinary
        const imagePath = `church/${Date.now()}_${imageFile.name}`;
        const imageUrl = await uploadImageToFirebaseStorage(imageFile, imagePath); // Actually uses Cloudinary
        
        const newImage = {
            url: imageUrl,
            title: title || '',
            date: new Date().toISOString()
        };
        
        await saveChurchImageToFirebase(newImage);
        loadChurchImages();
        clearChurchImageForm();
        showMessage('churchImagesMessage', 'Image uploaded successfully!', 'success');
    } catch (error) {
        console.error('Error saving church image:', error);
        showMessage('churchImagesMessage', 'Error uploading image. Please try again.', 'error');
    }
}

async function loadChurchImages() {
    const listContainer = $('#churchImagesList');
    listContainer.empty();
    
    try {
        const churchImages = await getAllChurchImagesFromFirebase();
        
        if (churchImages.length === 0) {
            listContainer.html('<p style="font-size: 1.4rem; color: #cccccc;">No images uploaded yet. Upload your first image above.</p>');
            return;
        }
        
        churchImages.forEach(function(imageData) {
            const uploadDate = imageData.createdAt ? new Date(imageData.createdAt.toDate ? imageData.createdAt.toDate() : imageData.createdAt) : new Date(imageData.date || Date.now());
            const imageHtml = `
                <div class="admin-item-card">
                    <div class="admin-item-info" style="display: flex; align-items: center; gap: 2rem;">
                        <img src="${imageData.url}" alt="${imageData.title || 'Church Image'}" style="width: 150px; height: 150px; object-fit: cover; border-radius: 4px;">
                        <div style="flex: 1;">
                            <h3>${imageData.title || 'Untitled Image'}</h3>
                            <p>Uploaded: ${uploadDate.toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}</p>
                        </div>
                    </div>
                    <div class="admin-item-actions">
                        <button class="admin-btn admin-btn-danger" onclick="deleteChurchImage('${imageData.id}')">Delete</button>
                    </div>
                </div>
            `;
            listContainer.append(imageHtml);
        });
    } catch (error) {
        console.error('Error loading church images:', error);
        listContainer.html('<p style="font-size: 1.4rem; color: #dd4043;">Error loading images. Please refresh the page.</p>');
    }
}

async function deleteChurchImage(id) {
    if (confirm('Are you sure you want to delete this image?')) {
        try {
            // Get the image first to delete it from Cloudinary
            const churchImages = await getAllChurchImagesFromFirebase();
            const imageData = churchImages.find(img => img.id === id);
            
            if (imageData && imageData.url) {
                try {
                    await deleteImageFromFirebaseStorage(imageData.url);
                } catch (error) {
                    console.warn('Could not delete image from Cloudinary:', error);
                }
            }
            
            await deleteChurchImageFromFirebase(id);
            loadChurchImages();
            showMessage('churchImagesMessage', 'Image deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting church image:', error);
            showMessage('churchImagesMessage', 'Error deleting image. Please try again.', 'error');
        }
    }
}

function clearChurchImageForm() {
    $('#imageTitle').val('');
    $('#churchImage').val('');
    $('#churchImagePreview').empty();
}

// Logout
function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    window.location.href = 'admin-login.html';
}

// Update save functions to handle editing
$(document).ready(function() {
    $('#newsForm').on('submit', function(e) {
        e.preventDefault();
        const editingId = $(this).data('editingId');
        if (editingId) {
            updateNewsItem(editingId);
        } else {
            saveNewsItem();
        }
    });

    $('#activitiesForm').on('submit', function(e) {
        e.preventDefault();
        const editingId = $(this).data('editingId');
        if (editingId) {
            updateActivityItem(editingId);
        } else {
            saveActivityItem();
        }
    });
});

// Update News Item
async function updateNewsItem(id) {
    const title = $('#newsTitle').val();
    const text = $('#newsText').val();
    const imageFile = $('#newsImage')[0].files[0];

    if (!title || !text) {
        showMessage('newsMessage', 'Please fill in all fields', 'error');
        return;
    }

    try {
        const newsItems = await getAllNewsItemsFromFirebase();
        const item = newsItems.find(n => n.id === id);
        
        if (!item) {
            showMessage('newsMessage', 'News item not found', 'error');
            return;
        }

        const updatedItem = {
            title: title,
            text: text,
            date: item.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            image: item.image // Keep existing image by default
        };

        // Handle new image upload
        if (imageFile) {
            // Delete old image if it exists
            if (item.image) {
                try {
                    await deleteImageFromFirebaseStorage(item.image);
                } catch (error) {
                    console.warn('Could not delete old image:', error);
                }
            }
            
            // Upload new image
            const imagePath = `news/${Date.now()}_${imageFile.name}`;
            updatedItem.image = await uploadImageToFirebaseStorage(imageFile, imagePath);
        }

        await updateNewsItemInFirebase(id, updatedItem);
        loadNewsItems();
        clearNewsForm();
        showMessage('newsMessage', 'News item updated successfully!', 'success');
    } catch (error) {
        console.error('Error updating news item:', error);
        showMessage('newsMessage', 'Error updating news item. Please try again.', 'error');
    }
}

// Update Activity Item
async function updateActivityItem(id) {
    const title = $('#activityTitle').val();
    const text = $('#activityText').val();
    const imageFile = $('#activityImage')[0].files[0];

    if (!title || !text) {
        showMessage('activitiesMessage', 'Please fill in all fields', 'error');
        return;
    }

    try {
        const activitiesItems = await getAllActivityItemsFromFirebase();
        const item = activitiesItems.find(a => a.id === id);
        
        if (!item) {
            showMessage('activitiesMessage', 'Activity not found', 'error');
            return;
        }

        const updatedItem = {
            title: title,
            text: text,
            date: item.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            image: item.image // Keep existing image by default
        };

        // Handle new image upload
        if (imageFile) {
            // Delete old image if it exists
            if (item.image) {
                try {
                    await deleteImageFromFirebaseStorage(item.image);
                } catch (error) {
                    console.warn('Could not delete old image:', error);
                }
            }
            
            // Upload new image
            const imagePath = `activities/${Date.now()}_${imageFile.name}`;
            updatedItem.image = await uploadImageToFirebaseStorage(imageFile, imagePath);
        }

        await updateActivityItemInFirebase(id, updatedItem);
        loadActivitiesItems();
        clearActivityForm();
        showMessage('activitiesMessage', 'Activity updated successfully!', 'success');
    } catch (error) {
        console.error('Error updating activity:', error);
        showMessage('activitiesMessage', 'Error updating activity. Please try again.', 'error');
    }
}

