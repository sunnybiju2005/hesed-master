// Load Mathrusangam team members from Firebase Realtime Database and update the Mathrusangam page

$(document).ready(function() {
    loadMathrusangamTeamToPage();
    
    // Listen for Realtime Database changes to update Mathrusangam team dynamically
    if (window.location.pathname.includes('mathrusangam.html')) {
        if (typeof db !== 'undefined') {
            db.ref('mathrusangamTeam').on('value', function(snapshot) {
                loadMathrusangamTeamToPage();
            });
        }
    }
});

async function loadMathrusangamTeamToPage() {
    const teamContainer = $('.mathrusangam-team-members');
    
    if (teamContainer.length === 0) {
        return; // Mathrusangam team section doesn't exist on this page
    }
    
    // Clear existing items
    teamContainer.empty();
    
    try {
        const mathrusangamTeam = await getAllMathrusangamTeamMembersFromFirebase();
        
        if (mathrusangamTeam.length > 0) {
            // Add Mathrusangam team members from Firebase
            mathrusangamTeam.forEach(function(member) {
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
            teamContainer.html('<div class="column"><p style="text-align: center; font-size: 1.6rem; color: #666666; padding: 3rem;">No Mathrusangam team members yet.</p></div>');
        }
    } catch (error) {
        console.error('Error loading Mathrusangam team:', error);
        teamContainer.html('<div class="column"><p style="text-align: center; font-size: 1.6rem; color: #dd4043; padding: 3rem;">Error loading Mathrusangam team. Please refresh the page.</p></div>');
    }
}
