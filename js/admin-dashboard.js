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
function saveNewsItem() {
    const title = $('#newsTitle').val();
    const text = $('#newsText').val();
    const imageFile = $('#newsImage')[0].files[0];

    if (!title || !text) {
        showMessage('newsMessage', 'Please fill in all fields', 'error');
        return;
    }

    // Get existing news items
    let newsItems = JSON.parse(localStorage.getItem('newsItems') || '[]');
    
    // Create new item
    const newItem = {
        id: Date.now(),
        title: title,
        text: text,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        image: null
    };

    // Handle image upload
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newItem.image = e.target.result;
            newsItems.push(newItem);
            localStorage.setItem('newsItems', JSON.stringify(newsItems));
            updateIndexPageNews();
            loadNewsItems();
            clearNewsForm();
            showMessage('newsMessage', 'News item saved successfully!', 'success');
        };
        reader.readAsDataURL(imageFile);
    } else {
        newsItems.push(newItem);
        localStorage.setItem('newsItems', JSON.stringify(newsItems));
        updateIndexPageNews();
        loadNewsItems();
        clearNewsForm();
        showMessage('newsMessage', 'News item saved successfully!', 'success');
    }
}

// Save Activity Item
function saveActivityItem() {
    const title = $('#activityTitle').val();
    const text = $('#activityText').val();
    const imageFile = $('#activityImage')[0].files[0];

    if (!title || !text) {
        showMessage('activitiesMessage', 'Please fill in all fields', 'error');
        return;
    }

    // Get existing activities
    let activitiesItems = JSON.parse(localStorage.getItem('activitiesItems') || '[]');
    
    // Create new item
    const newItem = {
        id: Date.now(),
        title: title,
        text: text,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        image: null
    };

    // Handle image upload
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newItem.image = e.target.result;
            activitiesItems.push(newItem);
            localStorage.setItem('activitiesItems', JSON.stringify(activitiesItems));
            updateIndexPageActivities();
            loadActivitiesItems();
            clearActivityForm();
            showMessage('activitiesMessage', 'Activity saved successfully!', 'success');
        };
        reader.readAsDataURL(imageFile);
    } else {
        activitiesItems.push(newItem);
        localStorage.setItem('activitiesItems', JSON.stringify(activitiesItems));
        updateIndexPageActivities();
        loadActivitiesItems();
        clearActivityForm();
        showMessage('activitiesMessage', 'Activity saved successfully!', 'success');
    }
}

// Load News Items
function loadNewsItems() {
    const newsItems = JSON.parse(localStorage.getItem('newsItems') || '[]');
    const listContainer = $('#newsItemsList');
    
    listContainer.empty();
    
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
                    <button class="admin-btn admin-btn-secondary" onclick="editNewsItem(${item.id})">Edit</button>
                    <button class="admin-btn admin-btn-danger" onclick="deleteNewsItem(${item.id})">Delete</button>
                </div>
            </div>
        `;
        listContainer.append(itemHtml);
    });
}

// Load Activities Items
function loadActivitiesItems() {
    const activitiesItems = JSON.parse(localStorage.getItem('activitiesItems') || '[]');
    const listContainer = $('#activitiesItemsList');
    
    listContainer.empty();
    
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
                    <button class="admin-btn admin-btn-secondary" onclick="editActivityItem(${item.id})">Edit</button>
                    <button class="admin-btn admin-btn-danger" onclick="deleteActivityItem(${item.id})">Delete</button>
                </div>
            </div>
        `;
        listContainer.append(itemHtml);
    });
}

// Edit News Item
function editNewsItem(id) {
    const newsItems = JSON.parse(localStorage.getItem('newsItems') || '[]');
    const item = newsItems.find(n => n.id === id);
    
    if (item) {
        $('#newsTitle').val(item.title);
        $('#newsText').val(item.text);
        if (item.image) {
            $('#newsImagePreview').html('<img src="' + item.image + '" alt="Preview">');
        }
        
        // Switch to news section
        $('.admin-sidebar-item[data-section="news"]').click();
        
        // Store editing ID
        $('#newsForm').data('editingId', id);
    }
}

// Edit Activity Item
function editActivityItem(id) {
    const activitiesItems = JSON.parse(localStorage.getItem('activitiesItems') || '[]');
    const item = activitiesItems.find(a => a.id === id);
    
    if (item) {
        $('#activityTitle').val(item.title);
        $('#activityText').val(item.text);
        if (item.image) {
            $('#activityImagePreview').html('<img src="' + item.image + '" alt="Preview">');
        }
        
        // Switch to activities section
        $('.admin-sidebar-item[data-section="activities"]').click();
        
        // Store editing ID
        $('#activitiesForm').data('editingId', id);
    }
}

// Delete News Item
function deleteNewsItem(id) {
    if (confirm('Are you sure you want to delete this news item?')) {
        let newsItems = JSON.parse(localStorage.getItem('newsItems') || '[]');
        newsItems = newsItems.filter(n => n.id !== id);
        localStorage.setItem('newsItems', JSON.stringify(newsItems));
        updateIndexPageNews();
        loadNewsItems();
        showMessage('newsMessage', 'News item deleted successfully!', 'success');
    }
}

// Delete Activity Item
function deleteActivityItem(id) {
    if (confirm('Are you sure you want to delete this activity?')) {
        let activitiesItems = JSON.parse(localStorage.getItem('activitiesItems') || '[]');
        activitiesItems = activitiesItems.filter(a => a.id !== id);
        localStorage.setItem('activitiesItems', JSON.stringify(activitiesItems));
        updateIndexPageActivities();
        loadActivitiesItems();
        showMessage('activitiesMessage', 'Activity deleted successfully!', 'success');
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
function saveServiceTeamMember() {
    const name = $('#memberName').val();
    const position = $('#memberPosition').val();
    const imageFile = $('#memberImage')[0].files[0];

    if (!name || !position) {
        showMessage('serviceTeamMessage', 'Please fill in all fields', 'error');
        return;
    }

    // Get existing service team members
    let serviceTeam = JSON.parse(localStorage.getItem('serviceTeam') || '[]');
    
    // Create new member
    const newMember = {
        id: Date.now(),
        name: name,
        position: position,
        image: null
    };

    // Handle image upload
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newMember.image = e.target.result;
            serviceTeam.push(newMember);
            localStorage.setItem('serviceTeam', JSON.stringify(serviceTeam));
            updateAboutPageServiceTeam();
            loadServiceTeamMembers();
            clearServiceTeamForm();
            showMessage('serviceTeamMessage', 'Service team member saved successfully!', 'success');
        };
        reader.readAsDataURL(imageFile);
    } else {
        showMessage('serviceTeamMessage', 'Please upload a profile image', 'error');
    }
}

// Load Service Team Members
function loadServiceTeamMembers() {
    const serviceTeam = JSON.parse(localStorage.getItem('serviceTeam') || '[]');
    const listContainer = $('#serviceTeamList');
    
    listContainer.empty();
    
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
                    <button class="admin-btn admin-btn-secondary" onclick="editServiceTeamMember(${member.id})">Edit</button>
                    <button class="admin-btn admin-btn-danger" onclick="deleteServiceTeamMember(${member.id})">Delete</button>
                </div>
            </div>
        `;
        listContainer.append(memberHtml);
    });
}

// Edit Service Team Member
function editServiceTeamMember(id) {
    const serviceTeam = JSON.parse(localStorage.getItem('serviceTeam') || '[]');
    const member = serviceTeam.find(m => m.id === id);
    
    if (member) {
        $('#memberName').val(member.name);
        $('#memberPosition').val(member.position);
        if (member.image) {
            $('#memberImagePreview').html('<img src="' + member.image + '" alt="Preview">');
        }
        
        // Switch to service team section
        $('.admin-sidebar-item[data-section="service-team"]').click();
        
        // Store editing ID
        $('#serviceTeamForm').data('editingId', id);
    }
}

// Update Service Team Member
function updateServiceTeamMember(id) {
    const name = $('#memberName').val();
    const position = $('#memberPosition').val();
    const imageFile = $('#memberImage')[0].files[0];

    if (!name || !position) {
        showMessage('serviceTeamMessage', 'Please fill in all fields', 'error');
        return;
    }

    let serviceTeam = JSON.parse(localStorage.getItem('serviceTeam') || '[]');
    const memberIndex = serviceTeam.findIndex(m => m.id === id);
    
    if (memberIndex !== -1) {
        serviceTeam[memberIndex].name = name;
        serviceTeam[memberIndex].position = position;

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                serviceTeam[memberIndex].image = e.target.result;
                localStorage.setItem('serviceTeam', JSON.stringify(serviceTeam));
                updateAboutPageServiceTeam();
                loadServiceTeamMembers();
                clearServiceTeamForm();
                showMessage('serviceTeamMessage', 'Service team member updated successfully!', 'success');
            };
            reader.readAsDataURL(imageFile);
        } else {
            localStorage.setItem('serviceTeam', JSON.stringify(serviceTeam));
            updateAboutPageServiceTeam();
            loadServiceTeamMembers();
            clearServiceTeamForm();
            showMessage('serviceTeamMessage', 'Service team member updated successfully!', 'success');
        }
    }
}

// Delete Service Team Member
function deleteServiceTeamMember(id) {
    if (confirm('Are you sure you want to delete this service team member?')) {
        let serviceTeam = JSON.parse(localStorage.getItem('serviceTeam') || '[]');
        serviceTeam = serviceTeam.filter(m => m.id !== id);
        localStorage.setItem('serviceTeam', JSON.stringify(serviceTeam));
        updateAboutPageServiceTeam();
        loadServiceTeamMembers();
        showMessage('serviceTeamMessage', 'Service team member deleted successfully!', 'success');
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
function saveCLCTeamMember() {
    const name = $('#clcMemberName').val();
    const position = $('#clcMemberPosition').val();
    const imageFile = $('#clcMemberImage')[0].files[0];

    if (!name || !position) {
        showMessage('clcTeamMessage', 'Please fill in all fields', 'error');
        return;
    }

    let clcTeam = JSON.parse(localStorage.getItem('clcTeam') || '[]');
    const newMember = { id: Date.now(), name: name, position: position, image: null };

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newMember.image = e.target.result;
            clcTeam.push(newMember);
            localStorage.setItem('clcTeam', JSON.stringify(clcTeam));
            updateCLCPageTeam();
            loadCLCTeamMembers();
            clearCLCTeamForm();
            showMessage('clcTeamMessage', 'CLC team member saved successfully!', 'success');
        };
        reader.readAsDataURL(imageFile);
    } else {
        showMessage('clcTeamMessage', 'Please upload a profile image', 'error');
    }
}

function loadCLCTeamMembers() {
    const clcTeam = JSON.parse(localStorage.getItem('clcTeam') || '[]');
    const listContainer = $('#clcTeamList');
    listContainer.empty();
    
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
                    <button class="admin-btn admin-btn-secondary" onclick="editCLCTeamMember(${member.id})">Edit</button>
                    <button class="admin-btn admin-btn-danger" onclick="deleteCLCTeamMember(${member.id})">Delete</button>
                </div>
            </div>
        `;
        listContainer.append(memberHtml);
    });
}

function editCLCTeamMember(id) {
    const clcTeam = JSON.parse(localStorage.getItem('clcTeam') || '[]');
    const member = clcTeam.find(m => m.id === id);
    
    if (member) {
        $('#clcMemberName').val(member.name);
        $('#clcMemberPosition').val(member.position);
        if (member.image) {
            $('#clcMemberImagePreview').html('<img src="' + member.image + '" alt="Preview">');
        }
        $('.admin-sidebar-item[data-section="clc-team"]').click();
        $('#clcTeamForm').data('editingId', id);
    }
}

function updateCLCTeamMember(id) {
    const name = $('#clcMemberName').val();
    const position = $('#clcMemberPosition').val();
    const imageFile = $('#clcMemberImage')[0].files[0];

    if (!name || !position) {
        showMessage('clcTeamMessage', 'Please fill in all fields', 'error');
        return;
    }

    let clcTeam = JSON.parse(localStorage.getItem('clcTeam') || '[]');
    const memberIndex = clcTeam.findIndex(m => m.id === id);
    
    if (memberIndex !== -1) {
        clcTeam[memberIndex].name = name;
        clcTeam[memberIndex].position = position;

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                clcTeam[memberIndex].image = e.target.result;
                localStorage.setItem('clcTeam', JSON.stringify(clcTeam));
                updateCLCPageTeam();
                loadCLCTeamMembers();
                clearCLCTeamForm();
                showMessage('clcTeamMessage', 'CLC team member updated successfully!', 'success');
            };
            reader.readAsDataURL(imageFile);
        } else {
            localStorage.setItem('clcTeam', JSON.stringify(clcTeam));
            updateCLCPageTeam();
            loadCLCTeamMembers();
            clearCLCTeamForm();
            showMessage('clcTeamMessage', 'CLC team member updated successfully!', 'success');
        }
    }
}

function deleteCLCTeamMember(id) {
    if (confirm('Are you sure you want to delete this CLC team member?')) {
        let clcTeam = JSON.parse(localStorage.getItem('clcTeam') || '[]');
        clcTeam = clcTeam.filter(m => m.id !== id);
        localStorage.setItem('clcTeam', JSON.stringify(clcTeam));
        updateCLCPageTeam();
        loadCLCTeamMembers();
        showMessage('clcTeamMessage', 'CLC team member deleted successfully!', 'success');
    }
}

function clearCLCTeamForm() {
    $('#clcTeamForm')[0].reset();
    $('#clcMemberImagePreview').empty();
    $('#clcTeamForm').removeData('editingId');
}

function updateCLCPageTeam() {
    localStorage.setItem('clcPageTeamUpdated', Date.now().toString());
}

// KCYM Team Functions
function saveKCYMTeamMember() {
    const name = $('#kcymMemberName').val();
    const position = $('#kcymMemberPosition').val();
    const imageFile = $('#kcymMemberImage')[0].files[0];

    if (!name || !position) {
        showMessage('kcymTeamMessage', 'Please fill in all fields', 'error');
        return;
    }

    let kcymTeam = JSON.parse(localStorage.getItem('kcymTeam') || '[]');
    const newMember = { id: Date.now(), name: name, position: position, image: null };

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newMember.image = e.target.result;
            kcymTeam.push(newMember);
            localStorage.setItem('kcymTeam', JSON.stringify(kcymTeam));
            updateKCYMPageTeam();
            loadKCYMTeamMembers();
            clearKCYMTeamForm();
            showMessage('kcymTeamMessage', 'KCYM team member saved successfully!', 'success');
        };
        reader.readAsDataURL(imageFile);
    } else {
        showMessage('kcymTeamMessage', 'Please upload a profile image', 'error');
    }
}

function loadKCYMTeamMembers() {
    const kcymTeam = JSON.parse(localStorage.getItem('kcymTeam') || '[]');
    const listContainer = $('#kcymTeamList');
    listContainer.empty();
    
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
                    <button class="admin-btn admin-btn-secondary" onclick="editKCYMTeamMember(${member.id})">Edit</button>
                    <button class="admin-btn admin-btn-danger" onclick="deleteKCYMTeamMember(${member.id})">Delete</button>
                </div>
            </div>
        `;
        listContainer.append(memberHtml);
    });
}

function editKCYMTeamMember(id) {
    const kcymTeam = JSON.parse(localStorage.getItem('kcymTeam') || '[]');
    const member = kcymTeam.find(m => m.id === id);
    
    if (member) {
        $('#kcymMemberName').val(member.name);
        $('#kcymMemberPosition').val(member.position);
        if (member.image) {
            $('#kcymMemberImagePreview').html('<img src="' + member.image + '" alt="Preview">');
        }
        $('.admin-sidebar-item[data-section="kcym-team"]').click();
        $('#kcymTeamForm').data('editingId', id);
    }
}

function updateKCYMTeamMember(id) {
    const name = $('#kcymMemberName').val();
    const position = $('#kcymMemberPosition').val();
    const imageFile = $('#kcymMemberImage')[0].files[0];

    if (!name || !position) {
        showMessage('kcymTeamMessage', 'Please fill in all fields', 'error');
        return;
    }

    let kcymTeam = JSON.parse(localStorage.getItem('kcymTeam') || '[]');
    const memberIndex = kcymTeam.findIndex(m => m.id === id);
    
    if (memberIndex !== -1) {
        kcymTeam[memberIndex].name = name;
        kcymTeam[memberIndex].position = position;

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                kcymTeam[memberIndex].image = e.target.result;
                localStorage.setItem('kcymTeam', JSON.stringify(kcymTeam));
                updateKCYMPageTeam();
                loadKCYMTeamMembers();
                clearKCYMTeamForm();
                showMessage('kcymTeamMessage', 'KCYM team member updated successfully!', 'success');
            };
            reader.readAsDataURL(imageFile);
        } else {
            localStorage.setItem('kcymTeam', JSON.stringify(kcymTeam));
            updateKCYMPageTeam();
            loadKCYMTeamMembers();
            clearKCYMTeamForm();
            showMessage('kcymTeamMessage', 'KCYM team member updated successfully!', 'success');
        }
    }
}

function deleteKCYMTeamMember(id) {
    if (confirm('Are you sure you want to delete this KCYM team member?')) {
        let kcymTeam = JSON.parse(localStorage.getItem('kcymTeam') || '[]');
        kcymTeam = kcymTeam.filter(m => m.id !== id);
        localStorage.setItem('kcymTeam', JSON.stringify(kcymTeam));
        updateKCYMPageTeam();
        loadKCYMTeamMembers();
        showMessage('kcymTeamMessage', 'KCYM team member deleted successfully!', 'success');
    }
}

function clearKCYMTeamForm() {
    $('#kcymTeamForm')[0].reset();
    $('#kcymMemberImagePreview').empty();
    $('#kcymTeamForm').removeData('editingId');
}

function updateKCYMPageTeam() {
    localStorage.setItem('kcymPageTeamUpdated', Date.now().toString());
}

// Mathrusangam Team Functions
function saveMathrusangamTeamMember() {
    const name = $('#mathrusangamMemberName').val();
    const position = $('#mathrusangamMemberPosition').val();
    const imageFile = $('#mathrusangamMemberImage')[0].files[0];

    if (!name || !position) {
        showMessage('mathrusangamTeamMessage', 'Please fill in all fields', 'error');
        return;
    }

    let mathrusangamTeam = JSON.parse(localStorage.getItem('mathrusangamTeam') || '[]');
    const newMember = { id: Date.now(), name: name, position: position, image: null };

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newMember.image = e.target.result;
            mathrusangamTeam.push(newMember);
            localStorage.setItem('mathrusangamTeam', JSON.stringify(mathrusangamTeam));
            updateMathrusangamPageTeam();
            loadMathrusangamTeamMembers();
            clearMathrusangamTeamForm();
            showMessage('mathrusangamTeamMessage', 'Mathrusangam team member saved successfully!', 'success');
        };
        reader.readAsDataURL(imageFile);
    } else {
        showMessage('mathrusangamTeamMessage', 'Please upload a profile image', 'error');
    }
}

function loadMathrusangamTeamMembers() {
    const mathrusangamTeam = JSON.parse(localStorage.getItem('mathrusangamTeam') || '[]');
    const listContainer = $('#mathrusangamTeamList');
    listContainer.empty();
    
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
                    <button class="admin-btn admin-btn-secondary" onclick="editMathrusangamTeamMember(${member.id})">Edit</button>
                    <button class="admin-btn admin-btn-danger" onclick="deleteMathrusangamTeamMember(${member.id})">Delete</button>
                </div>
            </div>
        `;
        listContainer.append(memberHtml);
    });
}

function editMathrusangamTeamMember(id) {
    const mathrusangamTeam = JSON.parse(localStorage.getItem('mathrusangamTeam') || '[]');
    const member = mathrusangamTeam.find(m => m.id === id);
    
    if (member) {
        $('#mathrusangamMemberName').val(member.name);
        $('#mathrusangamMemberPosition').val(member.position);
        if (member.image) {
            $('#mathrusangamMemberImagePreview').html('<img src="' + member.image + '" alt="Preview">');
        }
        $('.admin-sidebar-item[data-section="mathrusangam-team"]').click();
        $('#mathrusangamTeamForm').data('editingId', id);
    }
}

function updateMathrusangamTeamMember(id) {
    const name = $('#mathrusangamMemberName').val();
    const position = $('#mathrusangamMemberPosition').val();
    const imageFile = $('#mathrusangamMemberImage')[0].files[0];

    if (!name || !position) {
        showMessage('mathrusangamTeamMessage', 'Please fill in all fields', 'error');
        return;
    }

    let mathrusangamTeam = JSON.parse(localStorage.getItem('mathrusangamTeam') || '[]');
    const memberIndex = mathrusangamTeam.findIndex(m => m.id === id);
    
    if (memberIndex !== -1) {
        mathrusangamTeam[memberIndex].name = name;
        mathrusangamTeam[memberIndex].position = position;

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                mathrusangamTeam[memberIndex].image = e.target.result;
                localStorage.setItem('mathrusangamTeam', JSON.stringify(mathrusangamTeam));
                updateMathrusangamPageTeam();
                loadMathrusangamTeamMembers();
                clearMathrusangamTeamForm();
                showMessage('mathrusangamTeamMessage', 'Mathrusangam team member updated successfully!', 'success');
            };
            reader.readAsDataURL(imageFile);
        } else {
            localStorage.setItem('mathrusangamTeam', JSON.stringify(mathrusangamTeam));
            updateMathrusangamPageTeam();
            loadMathrusangamTeamMembers();
            clearMathrusangamTeamForm();
            showMessage('mathrusangamTeamMessage', 'Mathrusangam team member updated successfully!', 'success');
        }
    }
}

function deleteMathrusangamTeamMember(id) {
    if (confirm('Are you sure you want to delete this Mathrusangam team member?')) {
        let mathrusangamTeam = JSON.parse(localStorage.getItem('mathrusangamTeam') || '[]');
        mathrusangamTeam = mathrusangamTeam.filter(m => m.id !== id);
        localStorage.setItem('mathrusangamTeam', JSON.stringify(mathrusangamTeam));
        updateMathrusangamPageTeam();
        loadMathrusangamTeamMembers();
        showMessage('mathrusangamTeamMessage', 'Mathrusangam team member deleted successfully!', 'success');
    }
}

function clearMathrusangamTeamForm() {
    $('#mathrusangamTeamForm')[0].reset();
    $('#mathrusangamMemberImagePreview').empty();
    $('#mathrusangamTeamForm').removeData('editingId');
}

function updateMathrusangamPageTeam() {
    localStorage.setItem('mathrusangamPageTeamUpdated', Date.now().toString());
}

// Choir Team Functions
function saveChoirTeamMember() {
    const name = $('#choirMemberName').val();
    const position = $('#choirMemberPosition').val();
    const imageFile = $('#choirMemberImage')[0].files[0];

    if (!name || !position) {
        showMessage('choirTeamMessage', 'Please fill in all fields', 'error');
        return;
    }

    let choirTeam = JSON.parse(localStorage.getItem('choirTeam') || '[]');
    const newMember = {
        id: Date.now(),
        name: name,
        position: position,
        image: null
    };

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newMember.image = e.target.result;
            choirTeam.push(newMember);
            localStorage.setItem('choirTeam', JSON.stringify(choirTeam));
            updateChoirPageTeam();
            loadChoirTeamMembers();
            clearChoirTeamForm();
            showMessage('choirTeamMessage', 'Choir team member saved successfully!', 'success');
        };
        reader.readAsDataURL(imageFile);
    } else {
        showMessage('choirTeamMessage', 'Please upload a profile image', 'error');
    }
}

function loadChoirTeamMembers() {
    const choirTeam = JSON.parse(localStorage.getItem('choirTeam') || '[]');
    const listContainer = $('#choirTeamList');
    
    if (choirTeam.length === 0) {
        listContainer.html('<p style="font-size: 1.4rem; color: #cccccc;">No choir team members yet. Add your first member above.</p>');
        return;
    }
    
    listContainer.empty();
    
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
                    <button class="admin-btn admin-btn-secondary" onclick="editChoirTeamMember(${member.id})">Edit</button>
                    <button class="admin-btn admin-btn-danger" onclick="deleteChoirTeamMember(${member.id})">Delete</button>
                </div>
            </div>
        `;
        listContainer.append(memberHtml);
    });
}

function editChoirTeamMember(id) {
    const choirTeam = JSON.parse(localStorage.getItem('choirTeam') || '[]');
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
}

function updateChoirTeamMember(id) {
    const name = $('#choirMemberName').val();
    const position = $('#choirMemberPosition').val();
    const imageFile = $('#choirMemberImage')[0].files[0];

    if (!name || !position) {
        showMessage('choirTeamMessage', 'Please fill in all fields', 'error');
        return;
    }

    let choirTeam = JSON.parse(localStorage.getItem('choirTeam') || '[]');
    const memberIndex = choirTeam.findIndex(m => m.id === id);
    
    if (memberIndex !== -1) {
        choirTeam[memberIndex].name = name;
        choirTeam[memberIndex].position = position;
        
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                choirTeam[memberIndex].image = e.target.result;
                localStorage.setItem('choirTeam', JSON.stringify(choirTeam));
                updateChoirPageTeam();
                loadChoirTeamMembers();
                clearChoirTeamForm();
                showMessage('choirTeamMessage', 'Choir team member updated successfully!', 'success');
            };
            reader.readAsDataURL(imageFile);
        } else {
            // Keep existing image
            const existingImage = $('#choirTeamForm').data('existingImage');
            if (existingImage) {
                choirTeam[memberIndex].image = existingImage;
            }
            localStorage.setItem('choirTeam', JSON.stringify(choirTeam));
            updateChoirPageTeam();
            loadChoirTeamMembers();
            clearChoirTeamForm();
            showMessage('choirTeamMessage', 'Choir team member updated successfully!', 'success');
        }
    }
}

function deleteChoirTeamMember(id) {
    if (confirm('Are you sure you want to delete this choir team member?')) {
        let choirTeam = JSON.parse(localStorage.getItem('choirTeam') || '[]');
        choirTeam = choirTeam.filter(m => m.id !== id);
        localStorage.setItem('choirTeam', JSON.stringify(choirTeam));
        updateChoirPageTeam();
        loadChoirTeamMembers();
        showMessage('choirTeamMessage', 'Choir team member deleted successfully!', 'success');
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

function updateChoirPageTeam() {
    localStorage.setItem('choirPageTeamUpdated', Date.now().toString());
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
function saveEvent() {
    const name = $('#eventName').val();
    const date = $('#eventDate').val();
    const description = $('#eventDescription').val();
    const photoFiles = $('#eventPhotos')[0].files;
    const videosText = $('#eventVideos').val();

    if (!name || !date || !description) {
        showMessage('eventsMessage', 'Please fill in all required fields', 'error');
        return;
    }

    let events = JSON.parse(localStorage.getItem('events') || '[]');
    const newEvent = {
        id: Date.now(),
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

    // Process photos
    if (photoFiles && photoFiles.length > 0) {
        const photoPromises = Array.from(photoFiles).map(function(file) {
            return new Promise(function(resolve) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    resolve(e.target.result);
                };
                reader.readAsDataURL(file);
            });
        });

        Promise.all(photoPromises).then(function(photos) {
            newEvent.photos = photos;
            events.push(newEvent);
            localStorage.setItem('events', JSON.stringify(events));
            updateEventsPage();
            loadEvents();
            clearEventsForm();
            showMessage('eventsMessage', 'Event saved successfully!', 'success');
        });
    } else {
        events.push(newEvent);
        localStorage.setItem('events', JSON.stringify(events));
        updateEventsPage();
        loadEvents();
        clearEventsForm();
        showMessage('eventsMessage', 'Event saved successfully!', 'success');
    }
}

// Load Events
function loadEvents() {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const listContainer = $('#eventsList');
    listContainer.empty();
    
    if (events.length === 0) {
        listContainer.html('<p style="font-size: 1.4rem; color: #cccccc;">No events yet. Create your first event above.</p>');
        return;
    }

    // Sort by date (newest first)
    const sortedEvents = events.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
    });

    sortedEvents.forEach(function(event) {
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
                    <button class="admin-btn admin-btn-secondary" onclick="editEvent(${event.id})">Edit</button>
                    <button class="admin-btn admin-btn-danger" onclick="deleteEvent(${event.id})">Delete</button>
                </div>
            </div>
        `;
        listContainer.append(eventHtml);
    });
}

// Edit Event
function editEvent(id) {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
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
}

// Update Event
function updateEvent(id) {
    const name = $('#eventName').val();
    const date = $('#eventDate').val();
    const description = $('#eventDescription').val();
    const photoFiles = $('#eventPhotos')[0].files;
    const videosText = $('#eventVideos').val();

    if (!name || !date || !description) {
        showMessage('eventsMessage', 'Please fill in all required fields', 'error');
        return;
    }

    let events = JSON.parse(localStorage.getItem('events') || '[]');
    const eventIndex = events.findIndex(e => e.id === id);
    
    if (eventIndex !== -1) {
        events[eventIndex].name = name;
        events[eventIndex].date = date;
        events[eventIndex].description = description;

        // Process videos
        if (videosText) {
            const videoUrls = videosText.split('\n').filter(function(url) {
                return url.trim().length > 0;
            });
            events[eventIndex].videos = videoUrls;
        } else {
            events[eventIndex].videos = [];
        }

        // Process photos - keep existing if no new photos uploaded
        if (photoFiles && photoFiles.length > 0) {
            const photoPromises = Array.from(photoFiles).map(function(file) {
                return new Promise(function(resolve) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        resolve(e.target.result);
                    };
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(photoPromises).then(function(newPhotos) {
                // Merge with existing photos
                const existingPhotos = $('#eventsForm').data('existingPhotos') || [];
                events[eventIndex].photos = existingPhotos.concat(newPhotos);
                localStorage.setItem('events', JSON.stringify(events));
                updateEventsPage();
                loadEvents();
                clearEventsForm();
                showMessage('eventsMessage', 'Event updated successfully!', 'success');
            });
        } else {
            // Keep existing photos
            const existingPhotos = $('#eventsForm').data('existingPhotos') || [];
            events[eventIndex].photos = existingPhotos;
            localStorage.setItem('events', JSON.stringify(events));
            updateEventsPage();
            loadEvents();
            clearEventsForm();
            showMessage('eventsMessage', 'Event updated successfully!', 'success');
        }
    }
}

// Delete Event
function deleteEvent(id) {
    if (confirm('Are you sure you want to delete this event?')) {
        let events = JSON.parse(localStorage.getItem('events') || '[]');
        events = events.filter(e => e.id !== id);
        localStorage.setItem('events', JSON.stringify(events));
        updateEventsPage();
        loadEvents();
        showMessage('eventsMessage', 'Event deleted successfully!', 'success');
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
function saveFatherProfile() {
    const name = $('#fatherName').val();
    const imageFile = $('#fatherImage')[0].files[0];

    if (!name) {
        showMessage('fatherProfileMessage', 'Please enter the Father\'s name', 'error');
        return;
    }

    const fatherProfile = {
        name: name,
        image: null
    };

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            fatherProfile.image = e.target.result;
            localStorage.setItem('fatherProfile', JSON.stringify(fatherProfile));
            updateAboutPageFatherProfile();
            loadFatherProfile();
            clearFatherProfileForm();
            showMessage('fatherProfileMessage', 'Father profile saved successfully!', 'success');
        };
        reader.readAsDataURL(imageFile);
    } else {
        // Check if there's an existing image
        const existing = JSON.parse(localStorage.getItem('fatherProfile') || '{}');
        if (existing.image) {
            fatherProfile.image = existing.image;
        } else {
            showMessage('fatherProfileMessage', 'Please upload an image', 'error');
            return;
        }
        localStorage.setItem('fatherProfile', JSON.stringify(fatherProfile));
        updateAboutPageFatherProfile();
        loadFatherProfile();
        clearFatherProfileForm();
        showMessage('fatherProfileMessage', 'Father profile saved successfully!', 'success');
    }
}

function loadFatherProfile() {
    const fatherProfile = JSON.parse(localStorage.getItem('fatherProfile') || '{}');
    const displayContainer = $('#fatherProfileDisplay');
    const actionsContainer = $('#fatherProfileActions');
    
    if (!fatherProfile.name && !fatherProfile.image) {
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
}

function editFatherProfile() {
    const fatherProfile = JSON.parse(localStorage.getItem('fatherProfile') || '{}');
    
    if (fatherProfile.name) {
        $('#fatherName').val(fatherProfile.name);
    }
    if (fatherProfile.image) {
        $('#fatherImagePreview').html('<img src="' + fatherProfile.image + '" alt="Preview">');
    }
    
    // Scroll to form
    $('html, body').animate({
        scrollTop: $('#fatherProfileForm').offset().top - 100
    }, 500);
}

function deleteFatherProfile() {
    if (confirm('Are you sure you want to delete the Father profile? This will remove it from the About page.')) {
        localStorage.removeItem('fatherProfile');
        updateAboutPageFatherProfile();
        loadFatherProfile();
        clearFatherProfileForm();
        showMessage('fatherProfileMessage', 'Father profile deleted successfully!', 'success');
    }
}

function clearFatherProfileForm() {
    // Don't clear the form completely, just reset file input
    $('#fatherImage').val('');
    // Keep name and image preview if they exist
    const fatherProfile = JSON.parse(localStorage.getItem('fatherProfile') || '{}');
    if (!fatherProfile.name) {
        $('#fatherName').val('');
    }
    if (!fatherProfile.image) {
        $('#fatherImagePreview').empty();
    }
}

function updateAboutPageFatherProfile() {
    localStorage.setItem('aboutPageFatherProfileUpdated', Date.now().toString());
}

// Church Images Functions
function saveChurchImage() {
    const title = $('#imageTitle').val();
    const imageFile = $('#churchImage')[0].files[0];

    if (!imageFile) {
        showMessage('churchImagesMessage', 'Please select an image to upload', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const churchImages = JSON.parse(localStorage.getItem('churchImages') || '[]');
        const newImage = {
            id: Date.now(),
            url: e.target.result,
            title: title || '',
            date: new Date().toISOString()
        };
        
        churchImages.push(newImage);
        localStorage.setItem('churchImages', JSON.stringify(churchImages));
        updateAboutPageImages();
        updateImagesPage();
        loadChurchImages();
        clearChurchImageForm();
        showMessage('churchImagesMessage', 'Image uploaded successfully!', 'success');
    };
    reader.readAsDataURL(imageFile);
}

function loadChurchImages() {
    const churchImages = JSON.parse(localStorage.getItem('churchImages') || '[]');
    const listContainer = $('#churchImagesList');
    
    if (churchImages.length === 0) {
        listContainer.html('<p style="font-size: 1.4rem; color: #cccccc;">No images uploaded yet. Upload your first image above.</p>');
        return;
    }
    
    listContainer.empty();
    
    // Sort by date (newest first)
    const sortedImages = churchImages.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
    });
    
    sortedImages.forEach(function(imageData) {
        const imageHtml = `
            <div class="admin-item-card">
                <div class="admin-item-info" style="display: flex; align-items: center; gap: 2rem;">
                    <img src="${imageData.url}" alt="${imageData.title || 'Church Image'}" style="width: 150px; height: 150px; object-fit: cover; border-radius: 4px;">
                    <div style="flex: 1;">
                        <h3>${imageData.title || 'Untitled Image'}</h3>
                        <p>Uploaded: ${new Date(imageData.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}</p>
                    </div>
                </div>
                <div class="admin-item-actions">
                    <button class="admin-btn admin-btn-danger" onclick="deleteChurchImage(${imageData.id})">Delete</button>
                </div>
            </div>
        `;
        listContainer.append(imageHtml);
    });
}

function deleteChurchImage(id) {
    if (confirm('Are you sure you want to delete this image?')) {
        let churchImages = JSON.parse(localStorage.getItem('churchImages') || '[]');
        churchImages = churchImages.filter(img => img.id !== id);
        localStorage.setItem('churchImages', JSON.stringify(churchImages));
        updateAboutPageImages();
        updateImagesPage();
        loadChurchImages();
        showMessage('churchImagesMessage', 'Image deleted successfully!', 'success');
    }
}

function clearChurchImageForm() {
    $('#imageTitle').val('');
    $('#churchImage').val('');
    $('#churchImagePreview').empty();
}

function updateAboutPageImages() {
    localStorage.setItem('aboutPageImagesUpdated', Date.now().toString());
}

function updateImagesPage() {
    localStorage.setItem('imagesPageUpdated', Date.now().toString());
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
function updateNewsItem(id) {
    const title = $('#newsTitle').val();
    const text = $('#newsText').val();
    const imageFile = $('#newsImage')[0].files[0];

    if (!title || !text) {
        showMessage('newsMessage', 'Please fill in all fields', 'error');
        return;
    }

    let newsItems = JSON.parse(localStorage.getItem('newsItems') || '[]');
    const itemIndex = newsItems.findIndex(n => n.id === id);
    
    if (itemIndex !== -1) {
        newsItems[itemIndex].title = title;
        newsItems[itemIndex].text = text;

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                newsItems[itemIndex].image = e.target.result;
                localStorage.setItem('newsItems', JSON.stringify(newsItems));
                updateIndexPageNews();
                loadNewsItems();
                clearNewsForm();
                showMessage('newsMessage', 'News item updated successfully!', 'success');
            };
            reader.readAsDataURL(imageFile);
        } else {
            localStorage.setItem('newsItems', JSON.stringify(newsItems));
            updateIndexPageNews();
            loadNewsItems();
            clearNewsForm();
            showMessage('newsMessage', 'News item updated successfully!', 'success');
        }
    }
}

// Update Activity Item
function updateActivityItem(id) {
    const title = $('#activityTitle').val();
    const text = $('#activityText').val();
    const imageFile = $('#activityImage')[0].files[0];

    if (!title || !text) {
        showMessage('activitiesMessage', 'Please fill in all fields', 'error');
        return;
    }

    let activitiesItems = JSON.parse(localStorage.getItem('activitiesItems') || '[]');
    const itemIndex = activitiesItems.findIndex(a => a.id === id);
    
    if (itemIndex !== -1) {
        activitiesItems[itemIndex].title = title;
        activitiesItems[itemIndex].text = text;

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                activitiesItems[itemIndex].image = e.target.result;
                localStorage.setItem('activitiesItems', JSON.stringify(activitiesItems));
                updateIndexPageActivities();
                loadActivitiesItems();
                clearActivityForm();
                showMessage('activitiesMessage', 'Activity updated successfully!', 'success');
            };
            reader.readAsDataURL(imageFile);
        } else {
            localStorage.setItem('activitiesItems', JSON.stringify(activitiesItems));
            updateIndexPageActivities();
            loadActivitiesItems();
            clearActivityForm();
            showMessage('activitiesMessage', 'Activity updated successfully!', 'success');
        }
    }
}

