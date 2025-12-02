// Load Choir team members from Firebase Realtime Database and update the choir page

$(document).ready(function() {
    loadChoirTeamMembersToPage();
    
    // Listen for Realtime Database changes to update Choir team dynamically
    if (window.location.pathname.includes('choir.html')) {
        if (typeof db !== 'undefined') {
            db.ref('choirTeam').on('value', function(snapshot) {
                loadChoirTeamMembersToPage();
            });
        }
    }
});

async function loadChoirTeamMembersToPage() {
    const container = $('.choir-team-members');
    
    if (container.length === 0) {
        return; // Choir team section doesn't exist on this page
    }
    
    // Clear existing content
    container.empty();
    
    try {
        const choirTeam = await getAllChoirTeamMembersFromFirebase();
        
        if (choirTeam.length > 0) {
            // Add Choir team members from Firebase
            choirTeam.forEach(function(member) {
                const memberHtml = `
                    <div class="column church-staff__item">
                        <div class="church-staff__picture">
                            ${member.image ? `<img src="${member.image}" alt="${member.name}">` : '<div style="width: 15rem; height: 15rem; border-radius: 50%; background-color: #e0e0e0; margin: 0 auto;"></div>'}
                        </div>
                        <div class="church-staff__name">
                            ${member.name}
                        </div>
                        <div class="church-staff__position">
                            ${member.position}
                        </div>
                    </div>
                `;
                container.append(memberHtml);
            });
        } else {
            // No members - show empty state (no default/template data)
            container.html('<div class="column"><p style="text-align: center; font-size: 1.6rem; color: #666666; padding: 3rem;">No choir team members yet.</p></div>');
        }
    } catch (error) {
        console.error('Error loading choir team:', error);
        container.html('<div class="column"><p style="text-align: center; font-size: 1.6rem; color: #dd4043; padding: 3rem;">Error loading Choir team. Please refresh the page.</p></div>');
    }
}
