// Load KCYM team members from Firebase Realtime Database and update the KCYM page

$(document).ready(function() {
    loadKCYMTeamToPage();
    
    // Listen for Realtime Database changes to update KCYM team dynamically
    if (window.location.pathname.includes('kcym.html')) {
        if (typeof db !== 'undefined') {
            db.ref('kcymTeam').on('value', function(snapshot) {
                loadKCYMTeamToPage();
            });
        }
    }
});

async function loadKCYMTeamToPage() {
    const teamContainer = $('.kcym-team-members');
    
    if (teamContainer.length === 0) {
        return; // KCYM team section doesn't exist on this page
    }
    
    // Clear existing items
    teamContainer.empty();
    
    try {
        const kcymTeam = await getAllKCYMTeamMembersFromFirebase();
        
        if (kcymTeam.length > 0) {
            // Add KCYM team members from Firebase
            kcymTeam.forEach(function(member) {
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
                teamContainer.append(memberHtml);
            });
        } else {
            // No members - show empty state (no default/template data)
            teamContainer.html('<div class="column"><p style="text-align: center; font-size: 1.6rem; color: #666666; padding: 3rem;">No KCYM team members yet.</p></div>');
        }
    } catch (error) {
        console.error('Error loading KCYM team:', error);
        teamContainer.html('<div class="column"><p style="text-align: center; font-size: 1.6rem; color: #dd4043; padding: 3rem;">Error loading KCYM team. Please refresh the page.</p></div>');
    }
}
