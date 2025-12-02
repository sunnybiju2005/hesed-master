// Load CLC team members from Firebase Realtime Database and update the CLC page

$(document).ready(function() {
    loadCLCTeamToPage();
    
    // Listen for Realtime Database changes to update CLC team dynamically
    if (window.location.pathname.includes('clc.html')) {
        if (typeof db !== 'undefined') {
            db.ref('clcTeam').on('value', function(snapshot) {
                loadCLCTeamToPage();
            });
        }
    }
});

async function loadCLCTeamToPage() {
    const teamContainer = $('.clc-team-members');
    
    if (teamContainer.length === 0) {
        return; // CLC team section doesn't exist on this page
    }
    
    // Clear existing items
    teamContainer.empty();
    
    try {
        const clcTeam = await getAllCLCTeamMembersFromFirebase();
        
        if (clcTeam.length > 0) {
            // Add CLC team members from Firebase
            clcTeam.forEach(function(member) {
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
            teamContainer.html('<div class="column"><p style="text-align: center; font-size: 1.6rem; color: #666666; padding: 3rem;">No CLC team members yet.</p></div>');
        }
    } catch (error) {
        console.error('Error loading CLC team:', error);
        teamContainer.html('<div class="column"><p style="text-align: center; font-size: 1.6rem; color: #dd4043; padding: 3rem;">Error loading CLC team. Please refresh the page.</p></div>');
    }
}
