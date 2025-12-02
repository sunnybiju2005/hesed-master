// Load service team members from Firebase Realtime Database and update the about page

$(document).ready(function() {
    loadServiceTeamToAboutPage();
    
    // Listen for Realtime Database changes to update service team dynamically
    if (window.location.pathname.includes('about.html')) {
        if (typeof db !== 'undefined') {
            db.ref('serviceTeam').on('value', function(snapshot) {
                loadServiceTeamToAboutPage();
            });
        }
    }
});

async function loadServiceTeamToAboutPage() {
    const staffContainer = $('.church-staff');
    
    if (staffContainer.length === 0) {
        return; // Service team section doesn't exist on this page
    }
    
    // Clear existing items
    staffContainer.empty();
    
    try {
        const serviceTeam = await getAllServiceTeamMembersFromFirebase();
        
        if (serviceTeam.length > 0) {
            // Add service team members from Firebase
            serviceTeam.forEach(function(member) {
                const imageSrc = member.image || 'images/avatars/user-01.jpg';
                const memberHtml = `
                    <div class="column church-staff__item">
                        <div class="church-staff__picture">
                            <img src="${imageSrc}" alt="${member.name}">
                        </div>
                        <h4 class="church-staff__name">
                            ${member.name}
                            <span class="church-staff__position">
                                ${member.position}
                            </span>
                        </h4>
                    </div>
                `;
                staffContainer.append(memberHtml);
            });
        } else {
            // No members - show empty state (no default/template data)
            staffContainer.html('<div class="column"><p style="text-align: center; font-size: 1.6rem; color: #666666; padding: 3rem;">No service team members yet.</p></div>');
        }
    } catch (error) {
        console.error('Error loading service team:', error);
        staffContainer.html('<div class="column"><p style="text-align: center; font-size: 1.6rem; color: #dd4043; padding: 3rem;">Error loading service team. Please refresh the page.</p></div>');
    }
}
